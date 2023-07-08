import { useAtom } from "jotai";
import { AppConfigAtom } from "./AppConfig";

export const useAppConfig = () => {
  const [appConfig] = useAtom(AppConfigAtom);
  return appConfig;
};
