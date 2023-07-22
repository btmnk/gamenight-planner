import React from "react";
import { Button, Group, Menu, Text } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSignOut } from "@fortawesome/free-solid-svg-icons";

import { trpc } from "../../trpc/trpc";
import { DiscordAvatar } from "../DiscordAvatar/DiscordAvatar";

const UserMenu: React.FC = () => {
  const { data: userInfo } = trpc.auth.getUserInfo.useQuery();

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
        <Menu.Item icon={<FontAwesomeIcon icon={faSignOut} />}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export { UserMenu };
