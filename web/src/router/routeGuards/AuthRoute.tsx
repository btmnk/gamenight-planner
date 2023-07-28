import { LoadingOverlay } from "@mantine/core";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../../hooks/auth/useAuth";

const AuthRoute: React.FC = () => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.isLoading) {
    return <LoadingOverlay visible />;
  }

  if (auth.isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to={"/"} state={{ from: location }} replace />;
};

export { AuthRoute };
