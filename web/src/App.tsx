import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { Router } from "./router/Router";
import { TRPCProvider } from "./trpc/TRPCProvider";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { LoadingScreen } from "./components/LoadingScreen/LoadingScreen";
import { MantineProvider } from "@mantine/core";
import { Theme } from "./theme/Theme";
import { CustomFonts } from "./theme/CustomFonts";

const App: React.FC = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <MantineProvider theme={Theme} withCSSVariables withGlobalStyles withNormalizeCSS>
        <CustomFonts />
        <ErrorBoundary>
          <TRPCProvider>
            <RouterProvider router={Router} />
          </TRPCProvider>
        </ErrorBoundary>
      </MantineProvider>
    </Suspense>
  );
};

export { App };
