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
    <div
      className="
        w-full 
        max-w-sm 
        group
        bg-zinc-900 
        border 
        border-gray-200 
        rounded-lg 
        col-span
        h-[400px]
        overflow-hidden 
        relative"
    >
      <button
        className="
          cursor-pointer 
          ml-auto 
          group/item 
          hover:border 
          hover:border-white 
          rounded-full
          w-6 
          h-6 
          lg:w-10 
          lg:h-10 
          flex 
          justify-center 
          items-center
          transition 
          hover:border-neutral-300 
          px-2 
          py-1"
        onClick={handleDelete}
      >
        X
      </button>
      <img
        className="
          rounded-tl-lg 
          rounded-tr-lg
          p-5 
          object-cover 
          transition 
          duration-300 
          opacity-100 
          group-hover:opacity-0 
          absolute 
          inset-0 
          w-full 
          h-full"
        src={data.image}
        alt="Caratula"
      />
      <div
        className="
          p-10 
          transition 
          duration-300 
          opacity-0 
          group-hover:opacity-100 
          absolute
          inset-0 
          flex 
          flex-col 
          justify-center 
          h-full"
      >
        <span
          className="
          flex
          justify-center
          text-base 
          font-bold 
          tracking-tight 
          text-gray-200"
        >
          {data.title}
        </span>
        <br />
        <span
          className="
            uppercase
            text-xs 
            font-semibold 
            tracking-tight 
            text-gray-300"
        >
          {data.description}
        </span>
        <br />
        {!isRouteDetalles ? (
          <>
            <h3
              className="
                text-sm 
                font-semibold 
                text-gray-300"
            >
              Categorias:
            </h3>
            <ul>
              {data.categories?.map((e: any) => (
                <li
                  className="
                    text-xs
                    text-gray-500
                    font-bold"
                  key={`${e.category?.id}+${e.category?.name}`}
                >
                  {e.category?.name}
                </li>
              ))}
            </ul>
            <h3
              className="
                text-sm 
                font-semibold 
                text-gray-300"
            >
              Consolas:
            </h3>
            <ul>
              {data.consoles?.map((e: any) => (
                <li
                  className="
                    text-xs
                    text-gray-500
                    font-bold"
                  key={`${e.console?.id}+${e.console?.name}`}
                >
                  {e.console?.name}
                </li>
              ))}
            </ul>
            <h3
              className="
                text-sm 
                font-semibold 
                text-gray-300"
            >
              Idiomas:
            </h3>
            <ul>
              {data.languages?.map((e: any) => (
                <li
                  className="
                    text-xs
                    text-gray-500
                    font-bold"
                  key={`${e.language?.id}+${e.language?.name}`}
                >
                  {e.language?.name}
                </li>
              ))}
            </ul>
          </>
        ) : null}
        <div
          className="
            flex 
            justify-between"
        >
          <span
            className="
              text-base 
              font-bold 
              text-green-400 
              dark:text-white 
              ml-auto 
              px-5 
              py-2.5"
          >
            ${data.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
