import React from "react";

interface NavBarItemsProps {
  label: string;
}

const NavBarItems: React.FC<NavBarItemsProps> = ({ label }) => {
  return <div>{label}</div>;
};

export default NavBarItems;
