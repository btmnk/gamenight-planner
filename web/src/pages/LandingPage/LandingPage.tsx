import { Anchor, Button } from "@mantine/core";
import React from "react";
import { useAppConfig } from "../../config/useAppConfig";

const LandingPage: React.FC = () => {
  const appConfig = useAppConfig();
  const fullAuthorizeUrl = `${appConfig.discord.authorizeUrl}?response_type=code&client_id=${appConfig.discord.clientId}&scope=identify%20guilds&redirect_uri=${appConfig.discord.authorizeRedirectUrl}`;
  return (
    <div>
      <Anchor href={fullAuthorizeUrl}>
        <Button>Login with Discord</Button>
      </Anchor>
    </div>
  );
};

export { LandingPage };
