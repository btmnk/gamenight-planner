import { Group } from "@mantine/core";
import React from "react";

import { NavItem } from "./NavItem";

const Nav: React.FC = () => {
  return (
    <Group>
      <NavItem path="/events" label="Events" />
    </Group>
  );
};

export { Nav };
