import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { publicProcedure } from "../../trpc/tRPC.js";
import { DiscordService } from "../../../services/discord/DiscordService.js";
import { JWTSessionPayload } from "../../../domain/auth/SessionJwtToken.js";
import { UserRepository } from "../../../persistence/repository/UserRepository.js";
import { AuthService } from "../../../services/auth/AuthService.js";

export const getToken = publicProcedure
  .input(z.object({ code: z.string() }).required())
  .query(async ({ input, ctx }) => {
    const code = input.code;

    const accessTokenData = await DiscordService.exchangeToken(code);
    if (!accessTokenData) throw new TRPCError({ code: "UNAUTHORIZED" });

    const accessToken = accessTokenData.access_token;
    const userInfo = await DiscordService.getUserInfo(accessToken);
    if (!userInfo) throw new TRPCError({ code: "UNAUTHORIZED" });

    let user = await UserRepository.getUserByDiscordId(userInfo.id);
    if (!user) {
      user = await UserRepository.createUser({
        discordUserId: userInfo.id,
        username: userInfo.global_name,
        avatar: userInfo.avatar,
      });
    }

    const tokenPayload: JWTSessionPayload = {
      userId: user.id,
      discordUserId: userInfo.id,
      username: userInfo.username,
      accessToken: accessTokenData.access_token,
      isAdmin: userInfo.id === "376760136217264128",
    };

    const tokenCookie = await AuthService.createCookie(tokenPayload);

    ctx.res.headers({ "Set-Cookie": [tokenCookie] });
    return userInfo;
  });
