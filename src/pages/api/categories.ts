import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/src/utils/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        try {
          const allGenre = await prismadb.categories.findMany();
          return res.status(200).json(allGenre);
        } catch (error) {
          res.status(400).end();
        }
      case "POST":
        try {
          const { name } = req.body;

          const genre = await prismadb.categories.create({
            data: {
              name,
            },
          });
          return res.status(200).json(genre);
        } catch (error) {
          return res.status(400).json(error);
        }
      // case "PUT":
      //   return res.status(200).json("PUT");
      // case "DELETE":
      //   return res.status(200).json("DELETE");
      default:
        return res.status(404).json("Error: Método HTTP no válido");
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json("Error interno del servidor");
  }
}
