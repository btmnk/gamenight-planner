import { useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "@mantine/hooks";

import { trpc } from "../../trpc/trpc";
import { useAppConfig } from "../../config/AppConfig";
import { useNavigate, useSearch } from "@tanstack/react-router";

export interface UseAuthResult {
  signinRedirect: (redirectPath?: string) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const useAuth = (): UseAuthResult => {
  const appConfig = useAppConfig();

  const { authorizeUrl, authorizeRedirectUrl, clientId } = appConfig.discord;

  const [redirectAfterLogin, setRedirectAfterLogin] = useLocalStorage({
    key: "redirect_after_login",
  });

  const { code } = useSearch({ from: "/_public/login" });

  const navigate = useNavigate({ from: "/" });
  const queryClient = useQueryClient();
  const tokenQuery = trpc.auth.getToken.useQuery({ code: code ?? "" }, { enabled: Boolean(code) });

  useEffect(() => {
    if (tokenQuery.isFetched && code) {
      queryClient.clear();
      navigate({ to: redirectAfterLogin });
    }
  }, [tokenQuery.isFetched, code, queryClient, redirectAfterLogin, navigate]);

  const authQuery = trpc.auth.getUserInfo.useQuery();
  const isAuthenticated = authQuery.isSuccess;

  const signinRedirect = (redirectTo?: string) => {
    const fullAuthorizeUrl = `${authorizeUrl}?response_type=code&client_id=${clientId}&scope=identify%20guilds&redirect_uri=${authorizeRedirectUrl}`;
    setRedirectAfterLogin(redirectTo ?? window.location.pathname);
    window.location.href = fullAuthorizeUrl;
  };

  const isLoading = useMemo(() => {
    return tokenQuery.isFetching || authQuery.isLoading;
  }, [tokenQuery.isFetching, authQuery.isLoading]);

  return {
    signinRedirect,
    isLoading,
    isAuthenticated,
  };
};
