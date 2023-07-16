import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

import { trpc } from "../../trpc/trpc";
import { useAppConfig } from "../../config/AppConfig";

export interface UseAuthResult {
  signinRedirect: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const useAuth = (): UseAuthResult => {
  const appConfig = useAppConfig();

  const { authorizeRedirectUrl, authorizeUrl, clientId } = appConfig.discord;
  const fullAuthorizeUrl = `${authorizeUrl}?response_type=code&client_id=${clientId}&scope=identify%20guilds&redirect_uri=${authorizeRedirectUrl}`;

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const tokenQuery = trpc.auth.getToken.useQuery({ code: code ?? "" }, { enabled: Boolean(code) });

  const authQuery = trpc.auth.getUserInfo.useQuery(undefined, { staleTime: 300000 });
  const isAuthenticated = authQuery.isSuccess;

  const signinRedirect = () => {
    window.location.href = fullAuthorizeUrl;
  };

  const isLoading = useMemo(() => {
    return tokenQuery.isLoading || authQuery.isLoading;
  }, [tokenQuery.isLoading, authQuery.isLoading]);

  return {
    signinRedirect,
    isLoading,
    isAuthenticated,
  };
};
