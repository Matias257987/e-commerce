import axios from "axios";
import { useCallback, useState } from "react";
import { NextPageContext } from "next";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Input from "@/src/pages/components/Input";
import Footer from "@/src/pages/components/Footer";

//Pagina donde el usuario se puede registrar o logear
//Si se logea satisfactoriamente es enviado a la pagina de inicio
export async function getServerSideProps(context: NextPageContext) {
  const sesion = await getSession(context);

  if (sesion) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Auth = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [variant, setVariant] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      router.push("/");
    } catch (error) {
      console.log("Error");
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/users", {
        name,
        email,
        password,
        isAdmin: variant === "register" && isAdmin,
      });

      login();
    } catch (error) {
      console.log("Error");
    }
  }, [name, email, password, isAdmin, login]);

  return (
    <div
      className="
        relative 
        h-full 
        w-full 
        bg-[url('/images/videojuegos.jpg')] 
        bg-no-repeat 
        bg-center 
        bg-fixed 
        bg-cover"
    >
      <div
        className="
          bg-black 
          w-full 
          h-full 
          bg-opacity-50"
      >
        <nav
          className="
            px-10 
            py-5 
            flex 
            sm:justify-start 
            justify-center"
        >
          <img src="/images/logo.jpg" alt="Logo" className="h-10 sm:h-12" />{" "}
          {/*BUSCAR UNA IMAGEN PARA EL LOGO DE LA WEB*/}
        </nav>
        <div
          className="
            flex 
            justify-center"
        >
          <div
            className="
              bg-black 
              bg-opacity-70 
              px-6 
              py-8 
              self-center 
              mt-6 
              max-w-md 
              rounded-md 
              w-full"
          >
            <h2
              className="
                text-white 
                text-4xl 
                md-8 
                font-semibold"
            >
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <br />
            <div
              className="
                flex 
                flex-col 
                gap-4"
            >
              {variant === "register" && (
                <Input
                  label="Username"
                  onChange={(e: any) => setName(e.target.value)}
                  id="name"
                  value={name}
                />
              )}
              <Input
                label="Email"
                onChange={(e: any) => setEmail(e.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <div className="flex">
                <Input
                  label="Password"
                  onChange={(e: any) => setPassword(e.target.value)}
                  id="password"
                  type={showPassword ? "text" : "password"} // Cambiar el tipo de acuerdo al estado
                  value={password}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    shadow 
                    bg-neutral-700 
                    hover:bg-neutral-500 
                    focus:shadow-outline 
                    focus:outline-none 
                    text-gray-400 
                    font-bold
                    ml-1 
                    py-1 
                    px-1 
                    rounded-md"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="
                shadow 
                bg-purple-600 
                hover:bg-purple-500 
                focus:shadow-outline 
                focus:outline-none 
                text-gray-300 
                font-bold
                mt-10
                w-full 
                py-2 
                px-4 
                rounded-md"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <div
              className="
                flex 
                flex-row 
                gap-4 
                mt-8 
                justify-center"
            >
              <p className="text-neutral-500 mt-12">
                {variant === "login"
                  ? "First time using?"
                  : "Already have an account?"}
                <span
                  onClick={toggleVariant}
                  className="
                    text-white 
                    ml-1 
                    hover:underline 
                    cursor-pointer"
                >
                  {variant === "login" ? "Create an account" : "Login"}
                </span>
                .
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Auth;
