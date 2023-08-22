import React from "react";
import { signOut } from "next-auth/react";
import useCurrentUser from "../hooks/useCurrentUser";

interface AccountMenuProps {
  visible?: boolean;
}

//Componente para poder mostrar la cuenta del "usuario actual" (muestra un icono "img", su nombre, y un boton para deslogearse)
const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: currentUser } = useCurrentUser();

  if (!visible) return null;

  return (
    <div
      className="
        bg-black 
        w-56 
        absolute 
        top-14 
        right-0 
        py-5 
        flex-col 
        border-2 
        border-gray-800 
        flex"
    >
      <div
        className="
          flex 
          flex-col 
          gap-3"
      >
        <div
          className="
            px-3 
            group/item 
            flex 
            flex-row 
            gap-3 
            items-center 
            w-full"
        >
          {/* <img src="" alt="Icono Usuario" /> */}
          <p
            className="
              text-white 
              text-sm 
              group-hover/item:underline"
          >
            {currentUser?.name}
          </p>
        </div>
        <hr
          className="
            bg-gray-600 
            border-0 
            h-px 
            my-4"
        />
      </div>
      <div
        onClick={() => signOut()}
        className="
          px-3 
          text-center 
          text-white 
          text-sm 
          hover:underline"
      >
        SignOut
      </div>
    </div>
  );
};

export default AccountMenu;
