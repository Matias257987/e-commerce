import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface CardProps {
  data: {
    id: string;
    title: string;
    description: string;
    price: string;
    image: string;
    consoles: Array<{ console: { name: string } }>;
    categories: Array<{ category: { name: string } }>;
    languages: Array<{ language: { name: string } }>;
  };
  onDelete: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ data, onDelete }) => {
  const handleDelete = () => {
    onDelete(data.id);
  };

  const router = useRouter();
  const [isRouteDetalles, setIsRouteDetalles] = useState(false);

  useEffect(() => {
    setIsRouteDetalles(
      router.pathname.startsWith("/detalles/") && router.query.id === data.id
    );
  }, [router.pathname, data.id, router.query.id]);

  return (
    <div>
      <img src={data.image} alt="Caratula" />
      <div>
        <span>{data.title}</span>
        <span>{data.description}</span>
        <span>${data.price}</span>
        {!isRouteDetalles ? (
          <>
            <h3>Categorias:</h3>
            <ul>
              {data.categories?.map((e: any) => (
                <li key={`${e.category?.id}+${e.category?.name}`}>
                  {e.category?.name}
                </li>
              ))}
            </ul>
            <h3>Consolas:</h3>
            <ul>
              {data.consoles?.map((e: any) => (
                <li key={`${e.console?.id}+${e.console?.name}`}>
                  {e.console?.name}
                </li>
              ))}
            </ul>
            <h3>Idiomas:</h3>
            <ul>
              {data.languages?.map((e: any) => (
                <li key={`${e.language?.id}+${e.language?.name}`}>
                  {e.language?.name}
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
      <button onClick={handleDelete}>X</button>
    </div>
  );
};

export default Card;
