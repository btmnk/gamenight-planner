import "dotenv/config";

import cors from "@fastify/cors";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { appRouter } from "./api/trpc/appRouter.js";
import { createContext } from "./api/trpc/tRPCContext.js";
import { Fastify } from "./Fastify.js";
import { Config } from "./Config.js";

Fastify.register(cors, { origin: Config.FRONTEND_BASE_URL, credentials: true });

Fastify.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router: appRouter, createContext },
});

await Fastify.listen({ port: Config.PORT, host: "0.0.0.0" });
console.info(`Server listening on port ${Config.PORT}`);
