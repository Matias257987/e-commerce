import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Input from "@/src/pages/components/Input";
import useConsoleList from "@/src/pages/hooks/useConsoleList";
import useCategoriesList from "@/src/pages/hooks/useCategoriesList";
import useLanguageList from "@/src/pages/hooks/useLanguageList";
import NavBar from "@/src/pages/components/NavBar";

const Form = () => {
  interface Console {
    id: string;
  }

  interface Category {
    id: string;
  }

  interface Language {
    id: string;
  }

  interface FormState {
    consoles: Console[];
    categories: Category[];
    languages: Language[];
    title: string;
    description: string;
    price: string;
    image: string;
  }

  const { data: consoles = [] } = useConsoleList();
  const { data: categories = [] } = useCategoriesList();
  const { data: languages = [] } = useLanguageList();

  const titleExpre: RegExp = /[\w.,:'()%@"]{3,20}/;

  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    price: "",
    image: "",
    consoles: [],
    categories: [],
    languages: [],
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [button, setButton] = useState(true);

  const validate = (form: any) => {
    let errors: any = {};

    if (!form.title || !titleExpre.test(form.title))
      errors.title = "El titulo es necesario";
    if (!form.description) errors.description = "Ingrese una descripción";
    if (!form.price) errors.price = "Ingrese un valor";
    return errors;
  };

  useEffect(() => {
    if (
      form.title.length &&
      titleExpre.test(form.title) &&
      form.description.length &&
      form.price.length
    )
      setButton(false);
    else setButton(true);
  }, [form, setButton]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await axios.post("/api/games", form);
        setForm({
          title: "",
          description: "",
          price: "",
          image: "",
          consoles: [],
          categories: [],
          languages: [],
        });
        alert("Juego agregado con exito!");
      } catch (error) {
        console.log(error);

        alert("Algo salio mal...");
      }
    },
    [form]
  );

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelect = (e: any) => {
    const selectedConsole = consoles.find(
      (console: any) => console.id === e.target.value
    );

    if (selectedConsole) {
      const consoleExists = form.consoles.some(
        (console: any) => console === selectedConsole.id
      );
      if (!consoleExists) {
        setForm((prevForm) => ({
          ...prevForm,
          consoles: [...prevForm.consoles, selectedConsole.id],
        }));
      } else {
        alert("Esta opción ya ha sido seleccionada.");
      }
    }
    e.target.value = "consolas";
  };

  const handleSelectGenre = (e: any) => {
    const selectedCategory = categories.find(
      (category: any) => category.id === e.target.value
    );

    if (selectedCategory) {
      const categoryExists = form.categories.some(
        (category: any) => category === selectedCategory.id
      );
      if (!categoryExists) {
        setForm((prevForm) => ({
          ...prevForm,
          categories: [...prevForm.categories, selectedCategory.id],
        }));
      } else {
        alert("Esta opción ya ha sido seleccionada.");
      }
    }
    e.target.value = "generos";
  };

  const handleSelectLanguage = (e: any) => {
    const selectedLanguage = languages.find(
      (language: any) => language.id === e.target.value
    );

    if (selectedLanguage) {
      const languageExists = form.languages.some(
        (language: any) => language === selectedLanguage.id
      );
      if (!languageExists) {
        setForm((prevForm) => ({
          ...prevForm,
          languages: [...prevForm.languages, selectedLanguage.id],
        }));
      } else {
        alert("Esta opción ya ha sido seleccionada.");
      }
    }

    e.target.value = "idiomas";
  };

  const handleDelete = (e: any) => {
    setForm({
      ...form,
      consoles: form.consoles.filter((con) => con !== e),
      categories: form.categories.filter((cate) => cate !== e),
      languages: form.languages.filter((lang) => lang !== e),
    });
  };

  return (
    <div
      className="
        bg-gray-300
        bg-right-bottom
        bg-no-repeat
        bg-cover"
      style={{
        backgroundImage: 'url("/images/videojuegos.jpg")',
        backgroundAttachment: "fixed",
        backgroundSize: "70vw 84.5vh",
      }}
    >
      <NavBar />

      <form
        className="
          pt-40
          pb-20  
          text-center
          bg-gray-300
          w-[55%]"
        action=""
        id="form"
        onSubmit={handleSubmit}
      >
        <div>
          <p
            className="
              text-gray-600 
              text-sm 
              md:text-xl 
              lg:text-2xl 
              font-bold 
              mb-4"
          >
            Titulo *
          </p>
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
            value={form.title}
            name="title"
            onChange={(e) => handleChange(e)}
            placeholder="Title..."
          />
        </div>
        <div
          className="
            text-xs
            text-red-500
            pb-5"
        >
          {errors.title && <p>{errors.title}</p>}
        </div>
        <div>
          <p
            className="
              text-gray-600 
              text-sm 
              md:text-xl 
              lg:text-2xl 
              font-bold 
              mb-4"
          >
            Descripción *
          </p>
          <textarea
            className="
              bg-gray-200 
              appearance-none 
              border-2 
              border-gray-200 
              rounded  
              py-4 
              px-6 
              text-gray-700 
              leading-tight 
              focus:outline-none 
              focus:bg-white 
              focus:border-purple-500"
            value={form.description}
            name="description"
            onChange={(e) => handleChange(e)}
            placeholder="Description..."
          />
        </div>
        <div
          className="
            text-xs
            text-red-500
            pb-5"
        >
          {errors.description && <p>{errors.description}</p>}
        </div>
        <div>
          <p
            className="
              text-gray-600 
              text-sm 
              md:text-xl 
              lg:text-2xl 
              font-bold 
              mb-4"
          >
            Precio *
          </p>
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
            type="number"
            value={form.price}
            name="price"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div
          className="
            text-xs
            text-red-500
            pb-5"
        >
          {errors.price && <p>{errors.price}</p>}
        </div>
        <div>
          <p
            className="
              text-gray-600 
              text-sm 
              md:text-xl 
              lg:text-2xl 
              font-bold 
              mb-4"
          >
            Imagen
          </p>
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
            type="img"
            value={form.image}
            name="image"
            onChange={(e) => handleChange(e)}
            placeholder="URL image..."
          />
        </div>
        <div
          className="
            flex
            justify-center
            pt-10"
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
            onChange={handleSelect}
            defaultValue="consolas"
          >
            <option
              className="
                text-xs
                text-left"
              disabled
              value="consolas"
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
                key={`console-${e.id}`}
              >
                {e.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="pt-5">
            <h4
              className="
                text-sm 
                font-semibold 
                text-gray-600"
            >
              Consolas:
            </h4>
          </div>
          <div className="pb-5">
            {form.consoles.map((consoleId: any) => {
              const consoleObj = consoles.find(
                (console: any) => console.id === consoleId
              );
              if (consoleObj) {
                return (
                  <div
                    className="pt-2"
                    key={`console-${consoleObj.id}`}
                    onClick={() => handleDelete(consoleObj.id)}
                  >
                    <label
                      className="
                        cursor-pointer
                        shadow 
                        border
                        border-purple-300
                        hover:border-purple-400
                        hover:text-purple-500 
                        focus:shadow-outline 
                        focus:outline-none 
                        text-gray-500 
                        font-bold 
                        py-1 
                        px-2 
                        rounded"
                    >
                      {consoleObj.name}
                    </label>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        <div
          className="
            flex
            justify-center"
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
            onChange={handleSelectGenre}
            defaultValue="generos"
          >
            <option
              className="
                text-xs
                text-left"
              disabled
              value="generos"
            >
              Generos
            </option>
            {categories?.map((e: any) => (
              <option
                className=" 
                  text-gray-600
                  bg-gray-100
                  font-semibold
                  text-left"
                value={e.id}
                key={`category-${e.id}`}
              >
                {e.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="pt-5">
            <h4
              className="
                text-sm 
                font-semibold 
                text-gray-600"
            >
              Generos:
            </h4>
          </div>
          <div className="pb-5">
            {form.categories.map((categoryId: any) => {
              const categoryObj = categories.find(
                (category: any) => category.id === categoryId
              );
              if (categoryObj) {
                return (
                  <div
                    className="pt-2"
                    key={`category-${categoryObj.id}`}
                    onClick={() => handleDelete(categoryObj.id)}
                  >
                    <label
                      className="
                        cursor-pointer
                        shadow 
                        border
                        border-purple-300
                        hover:border-purple-400
                        hover:text-purple-500 
                        focus:shadow-outline 
                        focus:outline-none 
                        text-gray-500 
                        font-bold 
                        py-1 
                        px-2 
                        rounded"
                    >
                      {categoryObj.name}
                    </label>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        <div
          className="
            flex
            justify-center"
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
            onChange={handleSelectLanguage}
            defaultValue="idiomas"
          >
            <option
              className="
                text-xs
                text-left"
              disabled
              value="idiomas"
            >
              Idiomas
            </option>
            {languages.map((e: any) => (
              <option
                className=" 
                  text-gray-600
                  bg-gray-100
                  font-semibold
                  text-left"
                value={e.id}
                key={`language-${e.id}`}
              >
                {e.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="pt-5">
            <h4
              className="
                text-sm 
                font-semibold 
                text-gray-600"
            >
              Idiomas:
            </h4>
          </div>
          <div className="pb-5">
            {form.languages.map((languageId: any) => {
              const languageObj = languages.find(
                (language: any) => language.id === languageId
              );
              if (languageObj) {
                return (
                  <div
                    className="pt-2"
                    key={`language-${languageObj.id}`}
                    onClick={() => handleDelete(languageObj.id)}
                  >
                    <label
                      className="
                        cursor-pointer
                        shadow 
                        border
                        border-purple-300
                        hover:border-purple-400
                        hover:text-purple-500 
                        focus:shadow-outline 
                        focus:outline-none 
                        text-gray-500 
                        font-bold 
                        py-1 
                        px-2 
                        rounded"
                    >
                      {languageObj.name}
                    </label>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        <div className="pt-10">
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
            onClick={handleSubmit}
            disabled={button}
          >
            Crear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
