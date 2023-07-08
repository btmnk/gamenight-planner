import { LoadingOverlay } from "@mantine/core";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { trpc } from "../../trpc/trpc";

const AuthRoute: React.FC = () => {
  const location = useLocation();

  const meQuery = trpc.auth.getUserInfo.useQuery();

  if (meQuery.isLoading) {
    return <LoadingOverlay visible />;
  }

  if (meQuery.isSuccess) {
    return <Outlet />;
  }

  return <Navigate to={"/"} state={{ from: location }} replace />;
};

export { AuthRoute };
