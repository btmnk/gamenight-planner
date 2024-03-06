import React from "react";
import { Avatar, MantineSize } from "@mantine/core";

import { useAppConfig } from "../../config/AppConfig";

export interface DiscordAvatarProps {
  userId: string | null;
  userAvatar: string | null;
  size?: MantineSize;
}

const DiscordAvatar: React.FC<DiscordAvatarProps> = (props) => {
  const { userAvatar, userId, size = 30 } = props;

  const appConfig = useAppConfig();

  const avatarExtension = userAvatar?.startsWith("a_") ? "gif" : "png";
  const avatarUrl =
    userId && userAvatar
      ? `${appConfig.discord.cdnBaseUrl}/avatars/${userId}/${userAvatar}.${avatarExtension}`
      : "";

  return <Avatar src={avatarUrl} radius={"50%"} size={size} />;
};

export { DiscordAvatar };
