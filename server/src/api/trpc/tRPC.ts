import { TRPCError, initTRPC } from "@trpc/server";
import cookie from "cookie";
import jwt from "jsonwebtoken";

import { tRPCContext } from "./tRPCContext.js";
import { createRequestStamp } from "./util/createRequestStamp.js";
import { Config } from "../../Config.js";
import { SessionJwtToken } from "../../domain/auth/SessionJwtToken.js";
import { UserRepository } from "../../persistence/repository/UserRepository.js";

const t = initTRPC.context<tRPCContext>().create();

const logger = t.middleware(async ({ ctx, next }) => {
  const start = Date.now();
  const result = await next();
  const durationMs = Date.now() - start;

  const [path] = ctx.req.url.split("?");

  if (!result.ok && result.error) {
    console.error(
      createRequestStamp({
        method: ctx.req.method,
        path,
        delta: durationMs,
        trpcError: {
          code: result.error.code,
          message: result.error.message,
          cause: result.error.cause,
        },
      }),
    );
  } else {
    console.info(createRequestStamp({ method: ctx.req.method, path, delta: durationMs }));
  }

  return result;
});

export const router = t.router;
export const publicProcedure = t.procedure.use(logger);

export const authProcedure = t.procedure.use(logger).use(async ({ ctx, next }) => {
  if (!ctx.req.headers.cookie) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const authTokenCookie = cookie.parse(ctx.req.headers.cookie)["gnp-auth-token"];
  if (!authTokenCookie) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const token = jwt.verify(authTokenCookie, Config.CLIENT_SECRET) as SessionJwtToken;
  let user = await UserRepository.getUserByDiscordId(token.discordUserId);
  if (!user) user = await UserRepository.createUser(token.discordUserId);

  return next({ ctx: { token, user } });
});
