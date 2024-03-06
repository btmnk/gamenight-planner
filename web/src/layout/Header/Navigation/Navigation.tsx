import { Group } from "@mantine/core";
import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@tanstack/react-router";

type NavItem = { to: string; icon: ReactNode };

const navItems: NavItem[] = [{ to: "/events", icon: <FontAwesomeIcon icon={faCalendarDays} /> }];

export const Navigation = () => {
  return (
    <Group h={"100%"}>
      {navItems.map((item) => (
        <Link to={item.to}>{item.icon}</Link>
      ))}
    </Group>
  );
};
