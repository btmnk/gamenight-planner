import axios from "axios";
import { Config } from "../../Config.js";
import { User } from "../../domain/discord/User.js";
import { authProcedure } from "../../trpc/tRPC.js";
import { handleRequest } from "../../util/handleRequest.js";

export const getUserInfo = authProcedure.query(async ({ ctx }) => {
  const userInfo = await handleRequest(() =>
    axios.get<User>(Config.DISCORD_USERS_ME, {
      headers: { authorization: `Bearer ${ctx.token.accessToken}` },
    })
  );

  return userInfo;
});
