import { Box, Stack } from "@mantine/core";
import React, { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <Stack>
      <Box>{children}</Box>
    </Stack>
  );
};

export { Layout };
