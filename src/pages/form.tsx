import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
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
    <div>
      <div>
        <NavBar />
      </div>
      <form action="" id="form" onSubmit={handleSubmit}>
        <div>
          <p>Titulo*</p>
          <input
            type="text"
            value={form.title}
            name="title"
            onChange={(e) => handleChange(e)}
            placeholder="Title..."
          />
        </div>
        <div>{errors.title && <p>{errors.title}</p>}</div>
        <div>
          <p>Descripción*</p>
          <textarea
            value={form.description}
            name="description"
            onChange={(e) => handleChange(e)}
            placeholder="Description..."
          />
        </div>
        <div>{errors.description && <p>{errors.description}</p>}</div>
        <div>
          <p>Precio*</p>
          <input
            type="number"
            value={form.price}
            name="price"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>{errors.price && <p>{errors.price}</p>}</div>
        <div>
          <p>Imagen</p>
          <input
            type="img"
            value={form.image}
            name="image"
            onChange={(e) => handleChange(e)}
            placeholder="URL image..."
          />
        </div>
        <div>
          <select onChange={handleSelect} defaultValue="consolas">
            <option disabled value="consolas">
              consolas
            </option>
            {consoles?.map((e: any) => (
              <option value={e.id} key={`console-${e.id}`}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div>
            <h4>Consolas</h4>
          </div>
          <div>
            {form.consoles.map((consoleId: any) => {
              const consoleObj = consoles.find(
                (console: any) => console.id === consoleId
              );
              if (consoleObj) {
                return (
                  <div
                    key={`console-${consoleObj.id}`}
                    onClick={() => handleDelete(consoleObj.id)}
                  >
                    <p>{consoleObj.name}</p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        <div>
          <select onChange={handleSelectGenre} defaultValue="generos">
            <option disabled value="generos">
              generos
            </option>
            {categories?.map((e: any) => (
              <option value={e.id} key={`category-${e.id}`}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div>
            <h4>Generos</h4>
          </div>
          <div>
            {form.categories.map((categoryId: any) => {
              const categoryObj = categories.find(
                (category: any) => category.id === categoryId
              );
              if (categoryObj) {
                return (
                  <div
                    key={`category-${categoryObj.id}`}
                    onClick={() => handleDelete(categoryObj.id)}
                  >
                    <p>{categoryObj.name}</p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        <div>
          <select onChange={handleSelectLanguage} defaultValue="idiomas">
            <option disabled value="idiomas">
              idiomas
            </option>
            {languages.map((e: any) => (
              <option value={e.id} key={`language-${e.id}`}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div>
            <h4>Idiomas</h4>
          </div>
          <div>
            {form.languages.map((languageId: any) => {
              const languageObj = languages.find(
                (language: any) => language.id === languageId
              );
              if (languageObj) {
                return (
                  <div
                    key={`language-${languageObj.id}`}
                    onClick={() => handleDelete(languageObj.id)}
                  >
                    <p>{languageObj.name}</p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        <div>
          <button onClick={handleSubmit} disabled={button}>
            Crear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
