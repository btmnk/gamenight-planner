import { TRPCError, initTRPC } from "@trpc/server";
import chalk from "chalk";

import { JWTSessionPayload } from "../../domain/auth/SessionJwtToken.js";
import { AuthService } from "../../services/auth/AuthService.js";
import { UserRepository } from "../../persistence/repository/UserRepository.js";
import { createContext } from "./tRPCContext.js";

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;

const logger = t.middleware(async ({ ctx, next, path }) => {
  const start = Date.now();
  const result = await next();
  const durationMs = Date.now() - start;

  const status = !result.ok ? result.error.code : "OK";
  const logColor = status === "OK" ? chalk.green : chalk.red;

  console.info(logColor(`${status} ${ctx.req.method} ${path} [${durationMs}ms]`));

  if (!result.ok && result.error.cause) {
    console.info(result.error.cause.name, result.error.cause.message);
    console.error(result.error.cause);
  }

  return result;
});

export const publicProcedure = t.procedure.use(logger).use(async ({ ctx, next }) => {
  let token: JWTSessionPayload | null = null;

  try {
    token = await AuthService.verifyCookieToken(ctx.req.headers.cookie);
  } catch (_) {
    // ignore, the token is optional
  }

  return next({ ctx: { token } });
});

export const authProcedure = t.procedure.use(logger).use(async ({ ctx, next }) => {
  try {
    const token = await AuthService.verifyCookieToken(ctx.req.headers.cookie);
    const user = await UserRepository.getUser(token.userId);

    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return next({ ctx: { token } });
  } catch (_) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
});
