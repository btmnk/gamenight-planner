import { Box, Group, GroupProps, Text } from "@mantine/core";
import styles from "./Header.module.css";
import { Navigation } from "./Navigation/Navigation";

export interface HeaderProps extends GroupProps {}

export const Header = (props: HeaderProps) => {
  const { ...groupProps } = props;

  return (
    <Group
      px={"md"}
      align="center"
      justify="space-between"
      className={styles.header}
      {...groupProps}
    >
      <Box className={styles.bgLeft} />
      <Box className={styles.bgRight} />

      <Group flex={1}>
        <Text fw={"bolder"}>devtop</Text>
      </Group>

      <Group h={"100%"} justify="center" flex={3}>
        <Navigation />
      </Group>

      <Group flex={1}>
        <Box />
      </Group>
    </Group>
  );
};
