import NavBar from "./components/NavBar";
import CardList from "./components/CardList";
import useCardList from "./hooks/useCardList";

export default function Home() {
  const { data: vj = [] } = useCardList();
  return (
    <>
      <NavBar /> {/* renderiza la navbar */}
      <h1>TITULO</h1>
      <div>
        <h3>Agregar Nuevo Juego</h3>
        <input type="text" placeholder="ingrese un titulo..." />
        <input type="text" placeholder="ingrese una descripción..." />
        <button>Agregar</button>
      </div>
      <div>
        {/* renderiza las tarjetas */}
        <CardList title="Videojuegos" data={vj} />
      </div>
    </>
  );
}
