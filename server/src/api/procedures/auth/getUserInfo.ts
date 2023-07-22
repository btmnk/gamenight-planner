import { authProcedure } from "../../trpc/tRPC.js";
import { DiscordService } from "../../../integration/discord/DiscordService.js";

export const getUserInfo = authProcedure.query(async ({ ctx }) => {
  return DiscordService.getUserInfo(ctx.token.accessToken);
});
