import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "../../../server/src/trpc/AppRouterType";

export const trpc = createTRPCReact<AppRouter>();

export type TRPCInput = inferRouterInputs<AppRouter>;
export type TRPCOutput = inferRouterOutputs<AppRouter>;
