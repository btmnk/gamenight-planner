import { z } from "zod";

import { authProcedure } from "../../trpc/tRPC.js";
import { DiscordService } from "../../../services/discord/DiscordService.js";

export const getUserInfo = authProcedure
  .output(
    z.object({
      userId: z.string(),
      username: z.string(),
      discordId: z.string(),
      roles: z.array(z.enum(["ADMIN"])),
      avatar: z.string().nullable(),
    }),
  )
  .query(async ({ ctx }) => {
    const userInfo = await DiscordService.getUserInfo(ctx.token.accessToken);

    return {
      userId: ctx.token.userId,
      username: userInfo.global_name,
      discordId: userInfo.id,
      roles: ctx.token.isAdmin ? ["ADMIN"] : [],
      avatar: userInfo.avatar,
    };
  });
