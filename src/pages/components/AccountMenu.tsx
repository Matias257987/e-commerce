import React from "react";
import { signOut } from "next-auth/react";
import useCurrentUser from "../hooks/useCurrentUser";

//Componente para poder mostrar la cuenta del "usuario actual" (muestra un icono "img", su nombre, y un boton para deslogearse)
const AccountMenu = () => {
  const { data: currentUser } = useCurrentUser();

  return (
    <div>
      <div>
        <div>
          {/* <img src="" alt="Icono Usuario" /> */}
          <p>{currentUser?.name}</p>
        </div>
        <hr />
      </div>
      <div onClick={() => signOut()}>SignOut</div>
    </div>
  );
};

export default AccountMenu;
