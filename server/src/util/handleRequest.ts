import { TRPCError } from "@trpc/server";
import { AxiosResponse, AxiosError } from "axios";

export const handleRequest = async <D = unknown>(request: () => Promise<AxiosResponse<D>>): Promise<D> => {
  try {
    const response = await request();
    return response.data;
  } catch (e) {
    const axiosError: AxiosError = e as AxiosError;

    let statusCode = 418;
    let message = "unknown";

    if (axiosError.response) {
      const responseError = axiosError.response;
      statusCode = responseError.status;
      message = axiosError.message;
      if (axiosError.response.data) message += "\n" + JSON.stringify(axiosError.response.data);
    } else if (axiosError.request) {
      const requestError = axiosError.request;
      statusCode = requestError.status;
      message = requestError.statusText ?? "unknown";
    }

    switch (statusCode) {
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
