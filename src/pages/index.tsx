import React, { useState } from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
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
    <div
      className="
        bg-gray-500
        bg-opacity-50"
    >
      <div>
        <NavBar /> {/* renderiza la navbar */}
      </div>
      <div className="pt-40">
        <h1
          className="
            text-gray-600 
            text-md 
            md:text-xl 
            lg:text-2xl 
            font-bold 
            mb-4"
        >
          TITULO
        </h1>
        <div
          className="
            flex
            justify-start"
        >
          <select
            className=" 
              mr-0.5
              cursor-pointer
              items-center 
              py-2 
              px-2.5 
              text-sm 
              font-medium 
              text-center 
              text-gray-600 
              bg-gray-100 
              border 
              border-gray-300 
              rounded-lg 
              hover:bg-gray-200 
              focus:ring-4 
              focus:outline-none 
              focus:ring-gray-100"
            value={selectedConsole}
            onChange={(e) => setSelectedConsole(e.target.value)}
          >
            <option
              className="
                text-xs
                text-left"
              value=""
            >
              Consolas
            </option>
            {consoles?.map((e: any) => (
              <option
                className=" 
                  text-gray-600
                  bg-gray-100
                  font-semibold
                  text-left"
                value={e.id}
                key={e.id}
              >
                {e.name}
              </option>
            ))}
          </select>
          <select
            className=" 
              mr-0.5
              cursor-pointer
              items-center 
              py-2 
              px-2.5 
              text-sm 
              font-medium 
              text-center 
              text-gray-600 
              bg-gray-100 
              border 
              border-gray-300 
              rounded-lg 
              hover:bg-gray-200 
              focus:ring-4 
              focus:outline-none 
              focus:ring-gray-100"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option
              className="
                text-xs
                text-left"
              value=""
            >
              Lenguajes
            </option>
            {languages?.map((e: any) => (
              <option
                className=" 
                  text-gray-600
                  bg-gray-100
                  font-semibold
                  text-left"
                value={e.id}
                key={e.id}
              >
                {e.name}
              </option>
            ))}
          </select>
          <select
            className=" 
              cursor-pointer
              items-center 
              py-2 
              px-2.5 
              text-sm 
              font-medium 
              text-center 
              text-gray-600 
              bg-gray-100 
              border 
              border-gray-300 
              rounded-lg 
              hover:bg-gray-200 
              focus:ring-4 
              focus:outline-none 
              focus:ring-gray-100"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option
              className="
                text-xs
                text-left"
              value=""
            >
              Generos
            </option>
            {genres?.map((e: any) => (
              <option
                className=" 
                  text-gray-600
                  bg-gray-100
                  font-semibold
                  text-left"
                value={e.id}
                key={e.id}
              >
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
      <div
        className="
          bg-neutral-800
          m-10
          rounded-md"
      >
        <Footer />
      </div>
    </div>
  );
}
