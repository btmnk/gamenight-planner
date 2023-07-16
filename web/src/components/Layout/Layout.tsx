import { Box, Group, Header, Stack, Text } from "@mantine/core";
import React, { ReactNode } from "react";

import { UserMenu } from "../UserMenu/UserMenu";

export interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <Stack>
      <Header height={60} bg={"dark"}>
        <Group h={"100%"} px={"xl"} position="apart">
          <Text>GameNight</Text>

          <UserMenu />
        </Group>
      </Header>
      <Box>{children}</Box>
    </Stack>
  );
};

export { Layout };
