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
    <div>
      <div>
        <p>{title}</p>
      </div>
      <div>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchGame}
            onChange={(e) => setSearchGame(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </div>
      {!searchGame ? (
        <div>
          {filteredData.map((vj: any) => (
            // Utilizar el enrutador para navegar a la página de detalles con el ID del videojuego
            <div key={vj.id} onClick={() => router.push(`/detalles/${vj.id}`)}>
              <Card data={vj} onDelete={() => {}} />
            </div>
          ))}
        </div>
      ) : (
        <div>
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
