import React from "react";
import { NavLink } from "react-router-dom";

export interface NavItemProps {
  path: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = (props) => {
  const { path, label } = props;
  return <NavLink to={path}>{label}</NavLink>;
};

export { NavItem };
