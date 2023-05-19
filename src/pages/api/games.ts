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
          const allGames = await prismadb.videojuego.findMany();
          return res.status(200).json(allGames);
        } catch (error) {
          res.status(400).end();
        }
      case "POST":
        try {
          const { title, description, price, image } = req.body;

          const game = await prismadb.videojuego.create({
            data: {
              title,
              description,
              price,
              image,
            },
          });
          return res.status(200).json(game);
        } catch (error) {
          return res.status(400).json(error);
        }
      case "PUT":
        return res.status(200).json("PUT");
      case "DELETE":
        return res.status(200).json("DELETE");
      default:
        return res.status(404).json("Error: Método HTTP no válido");
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json("Error interno del servidor");
  }
}
