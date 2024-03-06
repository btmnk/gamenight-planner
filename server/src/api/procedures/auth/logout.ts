import { publicProcedure } from "../../trpc/tRPC.js";
import { AuthService } from "../../../services/auth/AuthService.js";

export const logout = publicProcedure.mutation(async ({ ctx }) => {
  ctx.res.headers({ "Set-Cookie": [AuthService.createLogoutCookie()] });
  return null;
});
