import React, { useState } from "react";
import Card from "./Card";
import axios from "axios";

interface CardListProps {
  title: string;
  data: { id: string; [key: string]: any }[];
}

const CardList: React.FC<CardListProps> = ({ title, data = [] }) => {
  const [searchGame, setSearchGame] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  console.log(data);

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

        setSearchResults(response.data);
      } catch (error) {
        alert("No se encontró el juego");
      }
    }
  };

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
          {data.map((vj: any) => (
            <Card key={vj.id} data={vj} />
          ))}
        </div>
      ) : (
        <div>
          {searchResults.map((vj: any) => (
            <Card key={vj.id} data={vj} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardList;
