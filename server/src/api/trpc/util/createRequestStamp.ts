import { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";
import chalk from "chalk";

export interface CreateRequestStampParams {
  method: string;
  path: string;
  delta: number;
  trpcError?: {
    code: TRPC_ERROR_CODE_KEY;
    message: string;
    cause?: object;
  };
}

/**
 * Returns a request status string for the logger
 * @param request - Fastify Request
 * @param reply - Fastify Reply
 * @param delta - The passed time in ms since request start until request end
 */
export const createRequestStamp = (params: CreateRequestStampParams) => {
  const { method, path, delta, trpcError } = params;

  let stamp = "";

  const statusString = getTrpcStatusString(trpcError?.code);

  stamp += statusString;
  stamp += " " + chalk.yellow(chalk.bold(method));
  stamp += " " + chalk.cyan(path);
  stamp += " " + chalk.white("+" + delta.toString() + "ms");

  if (trpcError) {
    stamp += chalk.red(`\n${trpcError.message}`);
  }

  return stamp;
};

function getTrpcStatusString(trpcCode: TRPC_ERROR_CODE_KEY | undefined) {
  const colorFunction = trpcCode ? chalk.red : chalk.green;
  return colorFunction(trpcCode ?? "OK");
}
