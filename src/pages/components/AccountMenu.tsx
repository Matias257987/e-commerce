import React from "react";
import { signOut } from "next-auth/react";
import useCurrentUser from "../hooks/useCurrentUser";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: currentUser } = useCurrentUser();

  if (!visible) return null;

  return (
    <div>
      <div>
        <div>
          <img src="" alt="Icono Usuario" />
          <p>{currentUser?.name}</p>
        </div>
        <hr />
      </div>
      <div onClick={() => signOut()}>SignOut</div>
    </div>
  );
};

export default AccountMenu;
