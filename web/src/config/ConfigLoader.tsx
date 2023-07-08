import React, { ReactNode, useEffect, useState } from "react";
import { LoadingOverlay } from "@mantine/core";
import { useSetAtom } from "jotai";

import { AppConfig, AppConfigAtom } from "./AppConfig";

export interface ConfigLoaderProps {
  children: ReactNode;
}

const ConfigLoader: React.FC<ConfigLoaderProps> = (props) => {
  const { children } = props;

  const setConfig = useSetAtom(AppConfigAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/config.json");
        const configJson = (await response.json()) as AppConfig;

        if (!configJson) throw Error("Could not load config file.");

        setConfig(configJson);
      } catch (error) {
        throw Error("Could not load config file.");
      }

      setIsLoading(false);
    };

    void fetchConfig();
  }, [setConfig]);

  if (isLoading) {
    return <LoadingOverlay visible={true} />;
  }

  return <>{children}</>;
};

export { ConfigLoader };
