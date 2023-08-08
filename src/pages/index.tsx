import React, { useState } from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import NavBar from "./components/NavBar";
import CardList from "./components/CardList";
import useCardList from "./hooks/useCardList";
import useConsoleList from "./hooks/useConsoleList";
import useLanguageList from "./hooks/useLanguageList";
import useCategoriesList from "./hooks/useCategoriesList";

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
  const { data: vj = [] } = useCardList();
  const { data: consoles = [] } = useConsoleList();
  const { data: languages = [] } = useLanguageList();
  const { data: genres = [] } = useCategoriesList();

  const [selectedConsole, setSelectedConsole] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  return (
    <div>
      <div>
        <NavBar /> {/* renderiza la navbar */}
      </div>
      <div>
        <h1>TITULO</h1>
        <div>
          <select
            value={selectedConsole}
            onChange={(e) => setSelectedConsole(e.target.value)}
          >
            <option value="">consolas</option>
            {consoles?.map((e: any) => (
              <option value={e.id} key={e.id}>
                {e.name}
              </option>
            ))}
          </select>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="">lenguajes</option>
            {languages?.map((e: any) => (
              <option value={e.id} key={e.id}>
                {e.name}
              </option>
            ))}
          </select>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">generos</option>
            {genres?.map((e: any) => (
              <option value={e.id} key={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <CardList
          title="Videojuegos"
          data={vj}
          selectedConsole={selectedConsole}
          selectedLanguage={selectedLanguage}
          selectedGenre={selectedGenre}
        />
      </div>
    </div>
  );
}
