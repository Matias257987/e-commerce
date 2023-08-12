// pages/detalles/index.tsx
import React from "react";
import useCardList from "../hooks/useCardList";
import CardList from "../components/CardList";
import NavBar from "../components/NavBar";

const DetallesIndex = () => {
  const { data: vj = [] } = useCardList();

  return (
    <div>
      <NavBar />
      <div>
        <CardList
          title="Editar Videojuegos"
          data={vj}
          selectedConsole={""} // Aquí puedes pasar los valores adecuados para filtrar los videojuegos si es necesario
          selectedLanguage={""} // Aquí puedes pasar los valores adecuados para filtrar los videojuegos si es necesario
          selectedGenre={""} // Aquí puedes pasar los valores adecuados para filtrar los videojuegos si es necesario
        />
      </div>
    </div>
  );
};

export default DetallesIndex;
