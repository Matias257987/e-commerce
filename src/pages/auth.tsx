import axios from "axios";
import { useCallback, useState } from "react";
import Input from "@/src/pages/components/Input";
import { NextPageContext } from "next";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

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
    <div>
      <nav>
        <img src="" alt="Logo" /> {/*BUSCAR UNA IMAGEN PARA EL LOGO DE LA WEB*/}
      </nav>
      <div>
        <div>
          <h2>{variant === "login" ? "Sign in" : "Register"}</h2>
          <br />
          <div>
            {variant === "register" && (
              <div>
                <Input
                  label="Username"
                  onChange={(e: any) => setName(e.target.value)}
                  id="name"
                  value={name}
                />
              </div>
            )}
            <Input
              label="Email"
              onChange={(e: any) => setEmail(e.target.value)}
              id="email"
              type="email"
              value={email}
            />
            <Input
              label="Password"
              onChange={(e: any) => setPassword(e.target.value)}
              id="password"
              type={showPassword ? "text" : "password"} // Cambiar el tipo de acuerdo al estado
              value={password}
            />
            <button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"} Password
            </button>
          </div>
          <button onClick={variant === "login" ? login : register}>
            {variant === "login" ? "Login" : "Sign up"}
          </button>
        </div>
        <p>
          {variant === "login"
            ? "First time using?"
            : "Already have an account?"}
          <span onClick={toggleVariant}>
            {variant === "login" ? "Create an account" : "Login"}
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default Auth;
