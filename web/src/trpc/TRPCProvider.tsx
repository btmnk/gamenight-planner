import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loggerLink, httpLink } from "@trpc/client";
import React, { ReactNode, useMemo } from "react";

import { trpc } from "./trpc";
import { useAppConfig } from "../config/AppConfig";

export interface TRPCProviderProps {
  children: ReactNode;
}

const retryableStatusCodes = [
  500, // Internal Server Error
  502, // Bad Gateway
  503, // Service Unavailable
  504, // Gateway Timeout
  408, // Request Timeout
  429, // Too Many Requests
  444, // Connection closed without response
];

const TRPCProvider: React.FC<TRPCProviderProps> = (props) => {
  const {
    api: { baseUrl },
  } = useAppConfig();

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry(failureCount, error) {
              console.log(error);
              const status = 418;
              // const status = composeResponseError(error)?.status;

              // If status is not in provided retryable list we don't retry queries
              if (status && !retryableStatusCodes.includes(status)) return false;

              // We only retry 3 times
              return failureCount < 3;
            },
            staleTime: 5 * 60 * 1000,
          },
        },
      }),
    [],
  );

  const trpcClient = useMemo(
    () =>
      trpc.createClient({
        links: [
          loggerLink({
            enabled: (opts) =>
              process.env.NODE_ENV === "development" || (opts.direction === "down" && opts.result instanceof Error),
          }),
          httpLink({
            url: baseUrl + "/trpc",
            fetch(url, options) {
              return fetch(url, {
                ...options,
                credentials: "include",
              });
            },
          }),
        ],
      }),
    [baseUrl],
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
    </trpc.Provider>
  );
};

export { TRPCProvider };
