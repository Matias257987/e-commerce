import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Card from "./Card";
import axios from "axios";

interface CardListProps {
  title: string;
  data: { id: string; [key: string]: any }[];
  selectedConsole: string;
  selectedLanguage: string;
  selectedGenre: string;
}

const CardList: React.FC<CardListProps> = ({
  title,
  data = [],
  selectedConsole,
  selectedLanguage,
  selectedGenre,
}) => {
  const router = useRouter();

  const [searchGame, setSearchGame] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (searchGame) {
      try {
        const response = await axios.get("/api/games", {
          params: { name: searchGame },
        });

        const searchResults = response.data.filter((vj: any) =>
          vj.title.toLowerCase().includes(searchGame.toLowerCase())
        );

        setSearchResults(searchResults);
      } catch (error) {
        alert("No se encontró el juego");
      }
    }
  };

  useEffect(() => {
    let filteredData = data;

    if (selectedConsole) {
      filteredData = filteredData.filter((vj: any) =>
        vj.consoles.some(
          (console: any) => console.consoleId === selectedConsole
        )
      );
    }

    if (selectedLanguage) {
      filteredData = filteredData.filter((vj: any) =>
        vj.languages.some(
          (language: any) => language.languageId === selectedLanguage
        )
      );
    }

    if (selectedGenre) {
      filteredData = filteredData.filter((vj: any) =>
        vj.categories.some((genre: any) => genre.categoryId === selectedGenre)
      );
    }

    setFilteredData(filteredData);
  }, [data, selectedConsole, selectedGenre, selectedLanguage]);

  return (
    <div
      className="
        px-8 
        md:px-12 
        mt-4 
        space-y-8"
    >
      <div
        className="
          flex
          justify-center"
      >
        <p
          className="
            text-gray-600 
            text-md 
            md:text-xl 
            lg:text-2xl 
            font-bold 
            mb-4"
        >
          {title}
        </p>
      </div>
      <div
        className="
          flex 
          justify-end"
      >
        <form
          className="
            w-full 
            max-w-sm"
          onSubmit={handleSearch}
        >
          <input
            className="
              bg-gray-200 
              appearance-none 
              border-2 
              border-gray-200 
              rounded  
              py-2 
              px-4 
              text-gray-700 
              leading-tight 
              focus:outline-none 
              focus:bg-white 
              focus:border-purple-500"
            type="text"
            placeholder="Buscar..."
            value={searchGame}
            onChange={(e) => setSearchGame(e.target.value)}
          />
          <button
            className="
              shadow 
              bg-purple-500 
              hover:bg-purple-400 
              focus:shadow-outline 
              focus:outline-none 
              text-white 
              font-bold 
              py-2 
              px-4 
              rounded"
            type="submit"
          >
            Buscar
          </button>
        </form>
      </div>
      {!searchGame ? (
        <div
          className="
            grid 
            sm:grid-cols-4 
            gap-16 
            sm:gap-4"
        >
          {filteredData.map((vj: any) => (
            // Utilizar el enrutador para navegar a la página de detalles con el ID del videojuego
            <div key={vj.id} onClick={() => router.push(`/detalles/${vj.id}`)}>
              <Card data={vj} onDelete={() => {}} />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="
            grid 
            sm:grid-cols-4 
            gap-16 
            sm:gap-4"
        >
          {searchResults.map((vj: any) => (
            // Utilizar el enrutador para navegar a la página de detalles con el ID del videojuego
            <div key={vj.id} onClick={() => router.push(`/detalles/${vj.id}`)}>
              <Card data={vj} onDelete={() => {}} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardList;
