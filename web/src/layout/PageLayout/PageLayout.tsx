import { ReactNode } from "react";
import { Header } from "../Header/Header";
import { Box } from "@mantine/core";
import styles from "./PageLayout.module.css";

export interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = (props: PageLayoutProps) => {
  return (
    <Box className={styles.layoutContainer}>
      <Header />
      <Box>{props.children}</Box>
    </Box>
  );
};
