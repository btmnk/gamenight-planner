import React from "react";
import { RouterProvider } from "react-router-dom";
import { Router } from "./router/Router";
import { ConfigLoader } from "./config/ConfigLoader";
import { TRPCProvider } from "./trpc/TRPCProvider";

const App: React.FC = () => {
  return (
    <ConfigLoader>
      <TRPCProvider>
        <RouterProvider router={Router} />
      </TRPCProvider>
    </ConfigLoader>
  );
};

export { App };
