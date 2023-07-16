import "dotenv/config";

import cors from "@fastify/cors";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";

import { appRouter } from "./trpc/appRouter.js";
import { createContext } from "./trpc/tRPCContext.js";
import { Fastify } from "./Fastify.js";
import { Config } from "./Config.js";

Fastify.register(cors, { origin: Config.FRONTEND_BASE_URL, credentials: true });

Fastify.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router: appRouter, createContext },
});

(async () => {
  try {
    await Fastify.listen({ port: Config.PORT, host: "0.0.0.0" });
    console.log(`Server listening on port ${Config.PORT}`);
  } catch (err) {
    Fastify.log.error(err);
    console.error(err);
    process.exit(1);
  }
})();
