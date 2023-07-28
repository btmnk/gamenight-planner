import cookie from "cookie";

import { publicProcedure } from "../../trpc/tRPC.js";
import { Config } from "../../../Config.js";

export const logout = publicProcedure.mutation(async ({ ctx }) => {
  const tokenCookie = cookie.serialize("gnp-auth-token", "", {
    path: "/",
    httpOnly: !Config.DEVELOPMENT,
    secure: !Config.DEVELOPMENT,
    expires: new Date(),
  });

  ctx.res.headers({ "Set-Cookie": [tokenCookie] });

  return null;
});
