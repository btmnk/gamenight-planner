import { useSearchParams } from "react-router-dom";
import { trpc } from "../../trpc/trpc";
import { atom } from "jotai";

// export const AuthAtom = atom();

export const useAuth = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const loginQuery = trpc.auth.getToken.useQuery({ code: code ?? "" }, { enabled: Boolean(code) });
};
