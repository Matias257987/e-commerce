import axios from "axios";
import { useCallback, useState } from "react";
import Input from "@/src/pages/components/Input";
import { NextPageContext } from "next";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
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

  const [variant, setVariant] = useState("login");

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
      console.log("Login");

      router.push("/");
      {
        /* <-- ESCRIBIR ACA UNA RUTA A LA QUE SE VA A REDIRIGIR UNA VEZ REGISTRADO */
      }
    } catch (error) {
      console.log("Error");
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        name,
        email,
        password,
      });
      console.log("Register");

      login();
    } catch (error) {
      console.log("Error");
    }
  }, [name, email, password, login]);

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
              value={email}
            />
            <Input
              label="Password"
              onChange={(e: any) => setPassword(e.target.value)}
              id="password"
              value={password}
            />
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
