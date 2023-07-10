import { atom, useAtom } from "jotai";
import { z } from "zod";

export const AppConfigSchema = z.object({
  api: z.object({
    baseUrl: z.string().nonempty(),
  }),

  discord: z.object({
    clientId: z.string().nonempty(),
    tokenUrl: z.string().nonempty(),
    authorizeUrl: z.string().nonempty(),
    authorizeRedirectUrl: z.string().nonempty(),
  }),
});

export type AppConfig = z.infer<typeof AppConfigSchema>;

const appConfigAtom = atom(async (_, { signal }) => {
  try {
    const response = await fetch("/config.json", { signal });
    const responseJson: unknown = await response.json();
    const configJson: AppConfig = AppConfigSchema.parse(responseJson);
    return configJson;
  } catch (error) {
    let errorMessage = `Could not load config file from ${window.location.origin}/config.json`;

    if (error instanceof Error) {
      errorMessage += `\n${error.message}`;
    }

    throw Error(errorMessage);
  }
});

export const useAppConfig = () => {
  const [appConfig] = useAtom(appConfigAtom);
  return appConfig;
};
