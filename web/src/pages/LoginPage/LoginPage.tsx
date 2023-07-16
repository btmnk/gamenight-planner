import { LoadingOverlay } from "@mantine/core";
import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../../hooks/auth/useAuth";

const LoginPage: React.FC = () => {
  const { isAuthenticated, isLoading, signinRedirect } = useAuth();

  if (isLoading && !isAuthenticated) {
    return <LoadingOverlay visible />;
  }

  if (isAuthenticated) {
    return <Navigate to={"/app"} />;
  }

  signinRedirect();
  return null;
};

export { LoginPage };
