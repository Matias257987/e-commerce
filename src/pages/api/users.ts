import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/src/utils/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await prismadb.usuario.findMany();
        res.status(200).json(users);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "An error occurred." });
      }
      break;

    case "POST":
      try {
        const { email, name, password, isAdmin } = req.body;

        const existingUser = await prismadb.usuario.findUnique({
          where: {
            email,
          },
        });

        if (existingUser) {
          return res.status(422).json({ error: "Email taken" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const usuario = await prismadb.usuario.create({
          data: {
            email,
            name,
            hashedPassword,
            image: "",
            emailVerified: new Date(),
            isAdmin: isAdmin || false,
          },
        });

        return res.status(200).json(usuario);
      } catch (error) {
        return res
          .status(400)
          .json({ error: `Something went wrong: ${error}` });
      }
      break;

    case "PUT":
      try {
        const userId = req.query.id as string;
        const { isAdmin } = req.body;

        const updatedUser = await prismadb.usuario.update({
          where: {
            id: userId,
          },
          data: {
            isAdmin,
          },
        });

        return res.status(200).json(updatedUser);
      } catch (error) {
        return res
          .status(400)
          .json({ error: `Something went wrong: ${error}` });
      }
      break;

    default:
      return res.status(405).end();
  }
}
