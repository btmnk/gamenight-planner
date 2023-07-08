import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loggerLink, httpLink } from "@trpc/client";
import { useAtom } from "jotai";
import React, { ReactNode, useMemo } from "react";
import { AppConfigAtom } from "../config/AppConfig";
import { trpc } from "./trpc";

export interface TRPCProviderProps {
  children: ReactNode;
}

const TRPCProvider: React.FC<TRPCProviderProps> = (props) => {
  const [appConfig] = useAtom(AppConfigAtom);

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: { queries: { retry: 3, staleTime: 5 * 60 * 1000 } },
      }),
    []
  );

  const trpcClient = useMemo(
    () =>
      trpc.createClient({
        links: [
          loggerLink({
            enabled: (opts) =>
              process.env.NODE_ENV === "development" ||
              (opts.direction === "down" && opts.result instanceof Error),
          }),
          httpLink({
            url: appConfig.api.baseUrl + "/trpc",
            fetch(url, options) {
              return fetch(url, {
                ...options,
                credentials: "include",
              });
            },
          }),
        ],
      }),
    [appConfig]
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export { TRPCProvider };
