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
          const { id } = req.query;

          const allGames = await prismadb.videojuego.findMany({
            include: {
              consoles: {
                include: {
                  console: true,
                },
              },
              categories: {
                include: {
                  category: true,
                },
              },
              languages: {
                include: {
                  language: true,
                },
              },
            },
          });

          if (name) {
            const searchResults = allGames.filter((game: any) =>
              game.title.toLowerCase().includes((name as string).toLowerCase())
            );

            if (searchResults.length > 0) {
              res.status(200).json(searchResults);
            } else {
              res.status(404).json("No se encontraron juegos");
            }
          }

          if (id) {
            const searchResultsId = allGames.filter(
              (game: any) => game.id === id
            );
            console.log(searchResultsId);

            if (searchResultsId) {
              return res.status(200).json(searchResultsId);
            } else {
              return res.status(404).json("No se encontraron juegos");
            }
          }

          res.status(200).json(allGames);
        } catch (error) {
          console.log(error);
          res.status(500).json("Ha ocurrido un error");
        }
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
                create: categories?.map((categoryId: string) => ({
                  category: {
                    connect: { id: categoryId },
                  },
                })),
              },
              consoles: {
                create: consoles?.map((consoleId: string) => ({
                  console: {
                    connect: { id: consoleId },
                  },
                })),
              },
              languages: {
                create: languages?.map((languageId: string) => ({
                  language: {
                    connect: { id: languageId },
                  },
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
          console.log(error);
          res.status(400).json(error);
        }
        break;

      case "DELETE":
        try {
          const { id } = req.query;

          if (!id || typeof id !== "string") {
            return res.status(400).json("ID invalido");
          }

          await prismadb.videojuegoCategories?.deleteMany({
            where: { videojuegoId: id },
          });
          await prismadb.videojuegoConsoles?.deleteMany({
            where: { videojuegoId: id },
          });
          await prismadb.videojuegoLanguages?.deleteMany({
            where: { videojuegoId: id },
          });

          await prismadb.videojuego.delete({
            where: { id },
          });

          res.status(200).json("Juego eliminado exitosamente");
        } catch (error) {
          console.log(error);
          res.status(400).json(error);
        }
        break;

      case "PUT":
        try {
          const { id } = req.query;
          const {
            title,
            description,
            image,
            price,
            consoles,
            categories,
            languages,
          } = req.body;

          if (!id || typeof id !== "string") {
            return res.status(400).json("ID invalido");
          }

          await prismadb.videojuego.update({
            where: { id },
            data: {
              categories: {
                deleteMany: {},
              },
              consoles: {
                deleteMany: {},
              },
              languages: {
                deleteMany: {},
              },
            },
          });

          const updateGame = await prismadb.videojuego.update({
            where: { id },
            data: {
              title,
              description,
              image,
              price,
              categories: {
                create: categories?.map((categoryId: string) => ({
                  category: {
                    connect: { id: categoryId },
                  },
                })),
              },
              consoles: {
                create: consoles?.map((consoleId: string) => ({
                  console: {
                    connect: { id: consoleId },
                  },
                })),
              },
              languages: {
                create: languages?.map((languageId: string) => ({
                  language: {
                    connect: { id: languageId },
                  },
                })),
              },
            },
            include: {
              consoles: true,
              categories: true,
              languages: true,
            },
          });

          console.log(updateGame);
          return res.status(200).json("Exito!!!");
        } catch (error) {
          console.log(error);
          return res.status(404).json(error);
        }

      default:
        res.status(404).json("Error: Método HTTP no válido");
        break;
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Error interno del servidor");
  }
}
