import { Box, LoadingOverlay } from "@mantine/core";
import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <Box w={"100vw"} h={"100vh"}>
      <LoadingOverlay visible />
    </Box>
  );
};

export { LoadingScreen };
