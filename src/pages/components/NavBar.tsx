import NavBarItems from "./NavBarItems";
import AccountMenu from "./AccountMenu";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  const hiddenRoutesHome = ["/form"];
  const isRouteHiddenH = hiddenRoutesHome.includes(router.pathname);
  const hiddenRoutesForm = ["/"];
  const isRouteHiddenF = hiddenRoutesForm.includes(router.pathname);

  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <div>
      <div>
        <img src="" alt="Titulo" />
        <div>
          {!isRouteHiddenF && <NavBarItems label="Home" path={"/"} />}
          {!isRouteHiddenH && <NavBarItems label="Formulario" path={"/form"} />}
        </div>
      </div>
      <div onClick={toggleAccountMenu}>
        <div>
          <img src="" alt="Icono Usuario" />
        </div>
        <AccountMenu />
      </div>
    </div>
  );
}
