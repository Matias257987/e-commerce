import NavBarItems from "./NavBarItems";
import AccountMenu from "./AccountMenu";
import { BsChevronDown } from "react-icons/bs";
import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/router";

const TOP_OFFSET = 66;

export default function NavBar() {
  const router = useRouter();

  const hiddenRoutesHome = ["/form"];
  const isRouteHiddenH = hiddenRoutesHome.includes(router.pathname);
  const hiddenRoutesForm = ["/"];
  const isRouteHiddenF = hiddenRoutesForm.includes(router.pathname);

  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackGround, setShowBackGround] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackGround(true);
      } else {
        setShowBackGround(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4
          md:px-16
          py-6
          flex
          items-center
          justify-between
          transition
          duration-500
          ${showBackGround ? "bg-zinc-900 bg-opacity-90" : ""}
          `}
      >
        <div className="flex items-center">
          <img
            src="/images/logo.jpg"
            className="h-8 lg:h-12 mr-6"
            alt="Titulo"
          />
          <span
            className={`
              transition 
              self-center 
              text-xl 
              underline 
              font-semibold 
              whitespace-nowrap 
              ${showBackGround ? "text-gray-300" : "text-gray-500"}`}
          >
            Videogame
          </span>
        </div>
        <div
          className="
            flex-row
            ml-8
            gap-7
            hidden
            lg:flex"
        >
          {!isRouteHiddenF && <NavBarItems label="Home" path={"/"} />}
          {!isRouteHiddenH && <NavBarItems label="Formulario" path={"/form"} />}
        </div>
        <div
          onClick={toggleAccountMenu}
          className="
            flex 
            flex-row 
            items-center 
            gap-3 
            ml-8 
            cursor-pointer 
            right-0"
        >
          <div>
            <img src="" alt="Icono Usuario" />
          </div>
          <BsChevronDown
            className={`
              transition 
              ${showAccountMenu ? "rotate-180" : "rotate-0"} ${
              showBackGround ? "text-gray-300" : "text-gray-500"
            }`}
          />
          <AccountMenu visible={showAccountMenu} />
        </div>
      </div>
    </nav>
  );
}
