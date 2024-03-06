import { LoadingOverlay } from "@mantine/core";
import React, { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { trpc } from "../../trpc/trpc";

const LogoutPage: React.FC = () => {
  const logoutQuery = trpc.auth.logout.useMutation();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      if (logoutQuery.isPending) return;

      await logoutQuery.mutateAsync();
      queryClient.clear();
      navigate("/");
    };

    logout();
  }, [logoutQuery, navigate, queryClient]);

  return <LoadingOverlay visible />;
};

export { LogoutPage };
