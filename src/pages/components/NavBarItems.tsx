import React from "react";
import Link from "next/link";

interface NavBarItemsProps {
  label: string;
  path: any;
}

const NavBarItems: React.FC<NavBarItemsProps> = ({ label, path }) => {
  return (
    <Link href={path}>
      <div
        className="
          block 
          py-2 
          pl-3 
          pr-4 
          text-white 
          bg-blue-700 
          rounded 
          md:bg-transparent 
          md:text-blue-700 
          md:p-0 
          dark:text-white 
          md:dark:text-blue-500"
      >
        {label}
      </div>
    </Link>
  );
};

export default NavBarItems;
