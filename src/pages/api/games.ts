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
          const { name } = req.query;

          const allGames = await prismadb.videojuego.findMany({
            include: {
              consoles: true,
              categories: true,
              languages: true,
            },
          });

          if (name) {
            const searchResults = allGames.filter((game: any) =>
              game.title.toLowerCase().includes((name as string).toLowerCase())
            );

            if (searchResults.length > 0) {
              return res.status(200).json(searchResults);
            } else {
              return res.status(404).json("No se encontraron juegos");
            }
          }

          return res.status(200).json(allGames);
        } catch (error) {
          console.error(error);
          return res.status(500).json("Ha ocurrido un error");
        }
        return res.status(405).json("Método no permitido");
        break;
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
          const newGame = await prismadb.videojuego.create({
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

          res.status(200).json(newGame);
        } catch (error) {
          res.status(400).json(error);
        }
        break;
      default:
        return res.status(404).json("Error: Método HTTP no válido");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Error interno del servidor");
  }
}
