import { Card, Center, Text, Image, Button, Stack, createStyles, Alert } from "@mantine/core";
import React from "react";

import ThisIsFine from "./assets/this_is_fine.png";

export interface ErrorPageProps {
  error: unknown;
}

const useStyles = createStyles(() => ({
  container: {
    width: "40%",
  },
}));

const ErrorPage: React.FC<ErrorPageProps> = (props) => {
  const { error } = props;

  let errorTitle = "Oops!";
  let errorMessage = "And error occurred...";
  let errorStack: string | undefined = undefined;

  if (error instanceof Error) {
    errorTitle = error.name;
    errorMessage = error.message;
    errorStack = error.stack;
  }

  const reloadPage = () => {
    window.location.href = window.location.protocol + "//" + window.location.host + "/";
  };

  const { classes } = useStyles();

  return (
    <Center pt={60}>
      <Stack className={classes.container}>
        <Card shadow={"xl"} radius="md">
          <Card.Section>
            <Image height={290} src={ThisIsFine} />
          </Card.Section>

          <Alert color={"red"} title={errorTitle} mt={"md"}>
            <Text size={22} weight="bold">
              {errorMessage}
            </Text>

            <Text mt={"xl"} opacity={0.5}>
              {errorStack}
            </Text>
          </Alert>

          <Button onClick={reloadPage} variant="subtle" fullWidth mt="md">
            Reload
          </Button>
        </Card>
      </Stack>
    </Center>
  );
};

export { ErrorPage };
