import { Box, Group, Header, Stack, Text } from "@mantine/core";
import React, { ReactNode } from "react";

import { UserMenu } from "../UserMenu/UserMenu";
import { Nav } from "../Nav/Nav";

export interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <Stack>
      <Header height={60} bg={"dark"}>
        <Group h={"100%"} px={"xl"} position="apart">
          <Group spacing={50}>
            <Text>GameNight</Text>

            <Box sx={{ flex: 1 }}>
              <Nav />
            </Box>
          </Group>
          <UserMenu />
        </Group>
      </Header>

      <Box>{children}</Box>
    </Stack>
  );
};

export { Layout };
