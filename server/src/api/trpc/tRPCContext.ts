import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

export const createContext = async (opts: CreateFastifyContextOptions) => {
  return { req: opts.req, res: opts.res };
};
