import React from "react";
import Link from "next/link";

interface NavBarItemsProps {
  label: string;
  path: any;
}

const NavBarItems: React.FC<NavBarItemsProps> = ({ label, path }) => {
  return (
    <Link href={path}>
      <div>{label}</div>
    </Link>
  );
};

export default NavBarItems;
