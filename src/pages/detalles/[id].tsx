import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import useCardList from "../hooks/useCardList";
import useCategoriesList from "../hooks/useCategoriesList";
import useLanguageList from "../hooks/useLanguageList";
import useConsoleList from "../hooks/useConsoleList";
import Card from "../components/Card";
import NavBar from "../components/NavBar";

const Detalles = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: vj = [] } = useCardList();
  const { data: consoles = [] } = useConsoleList();
  const { data: categories = [] } = useCategoriesList();
  const { data: languages = [] } = useLanguageList();

  const [editedGame, setEditedGame] = useState({
    id: "",
    title: "",
    description: "",
    image: "",
    price: "",
    consoles: [],
    categories: [],
    languages: [],
  });

  useEffect(() => {
    const selectedGame = vj.find((e: any) => e.id === id);

    if (selectedGame) {
      const formattedGame = {
        ...selectedGame,
        consoles: selectedGame.consoles.map(
          (consoleObj: any) => consoleObj.console.id
        ),
        categories: selectedGame.categories.map(
          (categoryObj: any) => categoryObj.category.id
        ),
        languages: selectedGame.languages.map(
          (languageObj: any) => languageObj.language.id
        ),
      };

      setEditedGame(formattedGame);
    }
  }, [id, vj]);

  const updateGame = async () => {
    try {
      const response = await axios.put(
        `/api/games?id=${editedGame.id}`,
        editedGame
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateGame();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditedGame((prevGame) => ({
      ...prevGame,
      [name]: value,
    }));
  };

  const handleChangeSelect = (fieldName: any, value: any) => {
    setEditedGame((prevGame: any) => {
      const prevValue = prevGame[fieldName];
      if (value !== "default") {
        // Agregar la opción seleccionada si no está presente en el array
        if (!prevValue.includes(value)) {
          return {
            ...prevGame,
            [fieldName]: [...prevValue, value],
          };
        }
      } else {
        // Eliminar la opción seleccionada si ya está presente en el array
        const filteredValue = prevValue.filter((item: any) => item !== value);
        return {
          ...prevGame,
          [fieldName]: filteredValue,
        };
      }
      return prevGame; // Si no hay cambios, devuelve el estado actual sin modificaciones
    });
  };

  const handleDeleteOption = (e: any) => {
    setEditedGame({
      ...editedGame,
      consoles: editedGame.consoles.filter((con) => con !== e),
      categories: editedGame.categories.filter((cate) => cate !== e),
      languages: editedGame.languages.filter((lang) => lang !== e),
    });
  };

  return (
    <div className="bg-gray-300">
      <NavBar />
      <div
        className="
          pt-20
          flex
          justify-center"
      >
        <Card data={editedGame} onDelete={() => {}} />
      </div>
      <form
        className="
          py-8
          px-2
          pb-20  
          text-center
          bg-gray-300"
        onSubmit={handleSubmit}
      >
        <div
          className="
            grid 
            sm:grid-cols-3
            gap-16 
            sm:gap-3
            px-8
            py-2"
        >
          <label
            className="
              text-gray-600 
              text-sm 
              md:text-xl 
              lg:text-2xl 
              font-bold 
              px-5
              mb-4"
          >
            Title:
            <input
              className="
                uppercase
                bg-gray-200 
                appearance-none 
                border-2 
                border-purple-300
                hover:border-purple-400
                hover:text-gray-500 
                rounded-md 
                m-2
                py-1 
                px-2 
                text-sm
                text-gray-700 
                leading-tight 
                focus:outline-none 
                focus:bg-white 
                focus:border-purple-500"
              type="text"
              name="title"
              value={editedGame.title}
              onChange={handleChange}
            />
          </label>
          <label
            className="
              text-gray-600 
              text-sm 
              px-5
              md:text-xl 
              lg:text-2xl 
              font-bold 
              mb-4"
          >
            Price:
            <input
              className="
                uppercase
                bg-gray-200 
                appearance-none 
                border-2 
                border-purple-300
                hover:border-purple-400
                hover:text-gray-500 
                rounded-md
                m-2 
                py-1 
                px-2 
                text-sm
                text-gray-700 
                leading-tight 
                focus:outline-none 
                focus:bg-white 
                focus:border-purple-500"
              type="number"
              name="price"
              value={editedGame.price}
              onChange={handleChange}
            />
          </label>
          <label
            className="
              text-gray-600 
              text-sm 
              px-5
              md:text-xl 
              lg:text-2xl 
              font-bold 
              mb-4"
          >
            Image:
            <input
              className="
                bg-gray-200 
                appearance-none 
                border-2 
                border-purple-300
                hover:border-purple-400
                hover:text-gray-500 
                rounded-md 
                m-2
                py-1 
                px-2 
                text-sm
                text-gray-700 
                leading-tight 
                focus:outline-none 
                focus:bg-white 
                focus:border-purple-500"
              type="img"
              name="image"
              value={editedGame.image}
              onChange={handleChange}
            />
          </label>
        </div>
        <label
          className="
            flex
            justify-start
            text-gray-600 
            text-sm 
            px-5
            md:text-xl 
            lg:text-2xl 
            font-bold 
            ml-10"
        >
          Description:
          <textarea
            className="
              bg-gray-200 
              appearance-none 
              border-2 
              border-gray-200 
              rounded
              m-2  
              py-2 
              px-4
              text-sm 
              text-gray-700 
              leading-tight 
              focus:outline-none 
              focus:bg-white 
              focus:border-purple-500"
            value={editedGame.description}
            name="description"
            onChange={(e: any) => handleChange(e)}
            placeholder="Description..."
          />
        </label>
        <div
          className="
            pt-4
            pb-4"
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
            onChange={(e) => handleChangeSelect("consoles", e.target.value)}
            defaultValue="default"
          >
            <option
              className="
                text-xs
                text-left"
              disabled
              value="default"
            >
              Consolas
            </option>
            {consoles?.map((console: any) => (
              <option
                className=" 
                  text-gray-600
                  bg-gray-100
                  font-semibold
                  text-left"
                value={console.id}
                key={`console-${console.id}`}
              >
                {console.name}
              </option>
            ))}
          </select>
          <ul>
            {editedGame.consoles.map((consoleId: string) => {
              const consoleItem = consoles.find(
                (console: any) => console.id === consoleId
              );
              if (consoleItem) {
                return (
                  <li
                    className="pt-2"
                    key={`consoleUl-${consoleItem.id}`}
                    onClick={() => handleDeleteOption(consoleItem.id)}
                  >
                    <label
                      className="
                        cursor-pointer
                        hover:text-purple-500 
                        focus:shadow-outline 
                        focus:outline-none 
                        text-gray-500 
                        font-bold 
                        py-1 
                        px-2"
                    >
                      {consoleItem?.name}
                    </label>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
        <div
          className="
            pt-4
            pb-4"
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
            onChange={(e) => handleChangeSelect("categories", e.target.value)}
            defaultValue="default"
          >
            <option
              className="
                text-xs
                text-left"
              disabled
              value="default"
            >
              Generos
            </option>
            {categories?.map((category: any) => (
              <option
                className=" 
                  text-gray-600
                  bg-gray-100
                  font-semibold
                  text-left"
                value={category.id}
                key={`category-${category.id}`}
              >
                {category.name}
              </option>
            ))}
          </select>
          <ul>
            {editedGame.categories.map((categoryId: string) => {
              const categoryItem = categories.find(
                (category: any) => category.id === categoryId
              );
              if (categoryItem) {
                return (
                  <li
                    className="pt-2"
                    key={`categoryUl-${categoryItem.id}-${categoryItem.name}`}
                    onClick={() => handleDeleteOption(categoryItem.id)}
                  >
                    <label
                      className="
                        cursor-pointer
                        hover:text-purple-500 
                        focus:shadow-outline 
                        focus:outline-none 
                        text-gray-500 
                        font-bold 
                        py-1 
                        px-2"
                    >
                      {categoryItem?.name}
                    </label>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
        <div
          className="
            pt-4
            pb-4"
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
            onChange={(e) => handleChangeSelect("languages", e.target.value)}
            defaultValue="default"
          >
            <option
              className="
                text-xs
                text-left"
              disabled
              value="default"
            >
              Idiomas
            </option>
            {languages?.map((language: any) => (
              <option
                className=" 
                  text-gray-600
                  bg-gray-100
                  font-semibold
                  text-left"
                value={language.id}
                key={`language-${language.id}`}
              >
                {language.name}
              </option>
            ))}
          </select>
          <ul>
            {editedGame.languages.map((languageId: string) => {
              const languageItem = languages.find(
                (language: any) => language.id === languageId
              );
              if (languageItem) {
                return (
                  <li
                    className="pt-2"
                    key={`languageUl-${languageItem.id}`}
                    onClick={() => handleDeleteOption(languageItem.id)}
                  >
                    <label
                      className="
                        cursor-pointer
                        hover:text-purple-500 
                        focus:shadow-outline 
                        focus:outline-none 
                        text-gray-500 
                        font-bold 
                        py-1 
                        px-2"
                    >
                      {languageItem?.name}
                    </label>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
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
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default Detalles;
