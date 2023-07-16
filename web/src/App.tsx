import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

import { Router } from "./router/Router";
import { TRPCProvider } from "./trpc/TRPCProvider";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { LoadingScreen } from "./components/LoadingScreen/LoadingScreen";
import { Theme } from "./theme/Theme";
import { CustomFonts } from "./theme/CustomFonts";

const App: React.FC = () => {
  return (
    <MantineProvider theme={Theme} withCSSVariables withGlobalStyles withNormalizeCSS>
      <CustomFonts />
      <Suspense fallback={<LoadingScreen />}>
        <ErrorBoundary>
          <TRPCProvider>
            <RouterProvider router={Router} />
          </TRPCProvider>
        </ErrorBoundary>
      </Suspense>
    </MantineProvider>
  );
};

export { App };
