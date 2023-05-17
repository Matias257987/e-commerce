import Searchbar from "./Searchbar";
import NavBarItems from "./NavBarItems";
import AccountMenu from "./AccountMenu";
import { useCallback, useState } from "react";

export default function NavBar() {
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <div>
      <div>
        <img src="" alt="Titulo" />
        <div>
          <NavBarItems label="Home" />
          <NavBarItems label="Login" />
          <NavBarItems label="Register" />
          <NavBarItems label="Admin/Usuario" />
        </div>
      </div>
      <div>
        <Searchbar />
      </div>
      <div onClick={toggleAccountMenu}>
        <div>
          <img src="" alt="Icono Usuario" />
        </div>
        <AccountMenu visible={showAccountMenu} />
      </div>
    </div>
  );
}
