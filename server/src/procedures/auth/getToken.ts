import { z } from "zod";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { addDays } from "date-fns";
import { publicProcedure } from "../../trpc/tRPC.js";
import { Config } from "../../Config.js";
import { TRPCError } from "@trpc/server";
import { SessionJwtToken } from "../../domain/auth/SessionJwtToken.js";
import { handleRequest } from "../../util/handleRequest.js";
import { TokenResponse } from "../../domain/discord/TokenResponse.js";
import axios from "axios";
import { User } from "../../domain/discord/User.js";

export const getToken = publicProcedure
  .input(z.object({ code: z.string() }).required())
  .query(async ({ input, ctx }) => {
    const code = input.code;

    const accessTokenExchangeData = new URLSearchParams();
    accessTokenExchangeData.set("client_id", Config.DISCORD_CLIENT_ID);
    accessTokenExchangeData.set("client_secret", Config.DISCORD_CLIENT_SECRET);
    accessTokenExchangeData.set("grant_type", "authorization_code");
    accessTokenExchangeData.set("code", code);
    accessTokenExchangeData.set("redirect_uri", encodeURI(Config.DISCORD_AUTH_REDIRECT_URI));
    accessTokenExchangeData.set("scope", "identify");

    const accessTokenData = await handleRequest(() =>
      axios.post<TokenResponse>(Config.DISCORD_TOKEN_URL, accessTokenExchangeData.toString(), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
    );

    if (!accessTokenData) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }

    const { access_token } = accessTokenData;

    const userInfo = await handleRequest(() =>
      axios.get<User>(Config.DISCORD_USERS_ME, {
        headers: { authorization: `Bearer ${access_token}` },
      })
    );

    if (!userInfo) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }

    const tokenPayload: SessionJwtToken = {
      userId: userInfo.id,
      username: userInfo.username,
      accessToken: access_token,
    };

    const token = jwt.sign(tokenPayload, Config.CLIENT_SECRET);

    const expirationDate = addDays(new Date(), 7);

    const tokenCookie = cookie.serialize("gnp-auth-token", token, {
      path: "/",
      httpOnly: !Config.DEVELOPMENT,
      secure: !Config.DEVELOPMENT,
      expires: expirationDate,
    });

    ctx.res.headers({ "Set-Cookie": [tokenCookie] });
    return userInfo;
  });
