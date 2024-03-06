import React, { Suspense } from "react";
import { MantineProvider } from "@mantine/core";

import { TRPCProvider } from "./trpc/TRPCProvider";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { LoadingScreen } from "./components/LoadingScreen/LoadingScreen";
import { Theme } from "./theme/Theme";
import { Router } from "./router/Router";

const App: React.FC = () => {
  return (
    <MantineProvider theme={Theme} defaultColorScheme="dark" withCssVariables>
      <Suspense fallback={<LoadingScreen />}>
        <ErrorBoundary>
          <TRPCProvider>
            <Router />
          </TRPCProvider>
        </ErrorBoundary>
      </Suspense>
    </MantineProvider>
  );
};

export { App };
