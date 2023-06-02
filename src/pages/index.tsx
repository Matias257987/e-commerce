import NavBar from "./components/NavBar";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
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

  return (
    <div>
      <div>
        <NavBar /> {/* renderiza la navbar */}
      </div>
      <div>
        <h1>TITULO</h1>
        <div>
          <select>
            <option>consolas</option>
            {consoles?.map((e: any) => (
              <option value={e.name} key={e.id}>
                {e.name}
              </option>
            ))}
          </select>
          <select>
            <option>lenguajes</option>
            {languages?.map((e: any) => (
              <option value={e.name} key={e.id}>
                {e.name}
              </option>
            ))}
          </select>
          <select>
            <option>generos</option>
            {genres?.map((e: any) => (
              <option value={e.name} key={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <CardList title="Videojuegos" data={vj} />
      </div>
    </div>
  );
}
