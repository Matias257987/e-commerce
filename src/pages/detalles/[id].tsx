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

  // useEffect(() => {
  //   const selectedGame = vj.find((e: any) => e.id === id);

  //   if (selectedGame) {
  //     setEditedGame(selectedGame);
  //   }
  // }, [id, vj]);

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
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <Card data={editedGame} onDelete={() => {}} />
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={editedGame.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={editedGame.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={editedGame.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Image:
          <input
            type="img"
            name="image"
            value={editedGame.image}
            onChange={handleChange}
          />
        </label>
        <div>
          <select
            onChange={(e) => handleChangeSelect("consoles", e.target.value)}
            defaultValue="default"
          >
            <option disabled value="default">
              consolas
            </option>
            {consoles?.map((console: any) => (
              <option value={console.id} key={`console-${console.id}`}>
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
                    key={`consoleUl-${consoleItem.id}`}
                    onClick={() => handleDeleteOption(consoleItem.id)}
                  >
                    {consoleItem?.name}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
        <div>
          <select
            onChange={(e) => handleChangeSelect("categories", e.target.value)}
            defaultValue="default"
          >
            <option disabled value="default">
              generos
            </option>
            {categories?.map((category: any) => (
              <option value={category.id} key={`category-${category.id}`}>
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
                    key={`categoryUl-${categoryItem.id}-${categoryItem.name}`}
                    onClick={() => handleDeleteOption(categoryItem.id)}
                  >
                    {categoryItem?.name}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
        <div>
          <select
            onChange={(e) => handleChangeSelect("languages", e.target.value)}
            defaultValue="default"
          >
            <option disabled value="default">
              idiomas
            </option>
            {languages?.map((language: any) => (
              <option value={language.id} key={`language-${language.id}`}>
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
                    key={`languageUl-${languageItem.id}`}
                    onClick={() => handleDeleteOption(languageItem.id)}
                  >
                    {languageItem?.name}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default Detalles;
