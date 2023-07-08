import { atom } from "jotai";

export interface AppConfig {
  api: {
    baseUrl: string;
  };
  discord: {
    clientId: string;
    tokenUrl: string;
    authorizeUrl: string;
    authorizeRedirectUrl: string;
  };
}

export const AppConfigAtom = atom({
  api: {
    baseUrl: "",
  },
  discord: {
    clientId: "",
    tokenUrl: "",
    authorizeUrl: "",
    authorizeRedirectUrl: "",
  },
} as AppConfig);
