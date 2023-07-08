import { Center, Loader } from "@mantine/core";
import React from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { trpc } from "../../trpc/trpc";

const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const loginQuery = trpc.auth.getToken.useQuery(
    { code: code ?? "" },
    { enabled: Boolean(code) }
  );

  if (loginQuery.error) {
    return <Navigate to={"/"} replace />;
  }

  if (!code || code === "") {
    return <Navigate to={"/"} replace />;
  }

  return (
    <Center mih={"100vh"}>
      <Loader />
    </Center>
  );
};

export { LoginPage };
