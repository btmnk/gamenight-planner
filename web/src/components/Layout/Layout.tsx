import { Box, Group, Header, Stack, Text } from "@mantine/core";
import React, { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <Stack>
      <Header height={60} bg={"dark"}>
        <Group h={"100%"} px={"xl"}>
          <Text>GameNight</Text>
        </Group>
      </Header>
      <Box>{children}</Box>
    </Stack>
  );
};

export { Layout };
