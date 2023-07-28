import React from "react";
import { Button, Group, Menu, Text } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { trpc } from "../../trpc/trpc";
import { DiscordAvatar } from "../DiscordAvatar/DiscordAvatar";
import { useAuth } from "../../hooks/auth/useAuth";

const UserMenu: React.FC = () => {
  const { data: userInfo } = trpc.auth.getUserInfo.useQuery();

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/logout");
  };

  const { signinRedirect } = useAuth();
  const handleLogin = () => {
    signinRedirect();
  };

  if (!userInfo) {
    return (
      <Button variant="gradient" onClick={handleLogin}>
        Login with Discord
      </Button>
    );
  }

  return (
    <Menu shadow="xl">
      <Menu.Target>
        <Button variant="subtle" color="gray" rightIcon={<FontAwesomeIcon size="sm" icon={faChevronDown} />}>
          <Group>
            <DiscordAvatar userId={userInfo?.id ?? null} userAvatar={userInfo?.avatar ?? null} />
            <Text>{userInfo?.global_name}</Text>
          </Group>
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<FontAwesomeIcon icon={faSignOut} />} onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export { UserMenu };
