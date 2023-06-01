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
          const allGames = await prismadb.videojuego.findMany({
            include: {
              consoles: true,
              categories: true,
              languages: true,
            },
          });
          return res.status(200).json(allGames);
        } catch (error) {
          res.status(400).json(error);
        }
      case "POST":
        const {
          title,
          description,
          image,
          price,
          consoles,
          categories,
          languages,
        } = req.body;

        try {
          const game = await prismadb.videojuego.create({
            data: {
              title,
              description,
              image,
              price,
              categories: {
                connect: categories?.map((categoryId: string) => ({
                  id: categoryId,
                })),
              },
              consoles: {
                connect: consoles?.map((consoleId: string) => ({
                  id: consoleId,
                })),
              },
              languages: {
                connect: languages?.map((languageId: string) => ({
                  id: languageId,
                })),
              },
            },
            include: {
              consoles: true,
              categories: true,
              languages: true,
            },
          });

          return res.status(200).json(game);
        } catch (error) {
          console.log(error);

          return res.status(400).json(error);
        }

      default:
        return res.status(404).json("Error: Método HTTP no válido");
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json("Error interno del servidor");
  }
}
