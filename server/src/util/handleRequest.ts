import { TRPCError } from "@trpc/server";

export const handleRequest = async <D = unknown>(request: () => Promise<Response>): Promise<D> => {
  const response = await request();

  try {
    return response.json() as Promise<D>;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown";

    switch (response.status) {
      case 403: {
        throw new TRPCError({ code: "FORBIDDEN", message });
      }

      case 401: {
        throw new TRPCError({ code: "UNAUTHORIZED", message });
      }

      case 400: {
        throw new TRPCError({ code: "BAD_REQUEST", message });
      }

      default:
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message });
    }
  }
};
