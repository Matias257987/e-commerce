import NavBar from "./components/NavBar";
import CardList from "./components/CardList";
import useCardList from "./hooks/useCardList";
//import { useState } from "react";

export default function Home() {
  const { data: vj = [] } = useCardList();

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
      <div>
        {/* renderiza las tarjetas */}
        <CardList title="Videojuegos" data={vj} />
      </div>

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
