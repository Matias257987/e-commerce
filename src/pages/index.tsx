import NavBar from "./components/NavBar";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
//import CardList from "./components/CardList";
//import useCardList from "./hooks/useCardList";
//import useCurrentUser from "./hooks/useCurrentUser";
//import UsuarioList from "./components/UsuarioList";
//import { useState } from "react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  //const { data: vj = [] } = useCardList();
  //const { data: user = [] } = useCurrentUser();

  // ## FUNCION CON LA CUAL MUESTRO UN ALERT AL PRESIONAR UN BOTON ##
  // const [apreto, setApreto] = useState(false);

  // const handlerApreto = () => {
  //   if (!apreto) {
  //     window.alert("mesagge");
  //     setApreto(true);
  //     window.confirm("message de cerrado") && setApreto(false);
  //   }
  // };

  return (
    <div>
      <div>
        <NavBar /> {/* renderiza la navbar */}
      </div>
      <div>
        <h1>TITULO</h1>
        <div>
          <select>
            {" "}
            {/* HAY QUE MEJORAR EL FILTRO */}
            <option value="all">todos los juegos</option>
            <option value="terror">Terror</option>
            <option value="rpg">Rpg</option>
          </select>
        </div>
      </div>
      {/* <div>
         renderiza las tarjetas 
        <CardList title="Videojuegos" data={vj} />
      </div>
      <div>
        <UsuarioList title="Usuarios" data={user} />
        <button>
          <a href="/auth">IR</a>
        </button>
      </div> */}
      {/* ## ESTO VA A VERSE MEJOR EN EL DASHBOARD DEL ADMIN ## 
      <div>  
        <h3>Agregar Nuevo Juego</h3>
        <input type="text" placeholder="ingrese un titulo..." />
        <input type="text" placeholder="ingrese una descripción..." />
        <button onClick={handlerApreto}>Agregar</button>
      </div> */}
    </div>
  );
}
