import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/src/utils/prismadb";

//Procedemos a crear un nuevo usuario
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //Si el metodo es diferente a "POST" devuelve "metodo invalido" y termina la ejecucion.
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  //Se toman los campos ingresados por "body" y se comprueba si existe el "email" en la BD
  try {
    const { email, name, password } = req.body;

    const existingUser = await prismadb.usuario.findUnique({
      where: {
        email,
      },
    });

    //Si ya existe un "usuario" con ese "email" procede a responder con un msj "Email existente"
    if (existingUser) {
      return res.status(422).json({ error: "Email taken" });
    }

    //Sino se encripta el "Password" con bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    //Procede a crear al usuario en la BD
    const usuario = await prismadb.usuario.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    //Finalmente se devuelve el "usuario" creado
    return res.status(200).json(usuario);

    //Si ocurre algun error durante el proceso se lo devuelve a traves de CATCH
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
