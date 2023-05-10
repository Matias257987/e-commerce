import Searchbar from "./Searchbar";
import NavBarItems from "./NavBarItems";

export default function NavBar() {
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
    </div>
  );
}
