import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "@/src/utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req;

  switch (method) {
    case "GET": //hace una peticion de la info. de un "id" en especifico de la tabla "juegos" de la base de datos
      try {
        const text = "SELECT * FROM juegos WHERE id = $1";
        const value = [query.id];
        const response = await conn.query(text, value);

        if (response.rows.length === 0) {
          return res.status(404).json({ message: "Juego no encontrado" });
        }

        return res.json(response.rows[0]);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    case "PUT": //hace una actualizacion en la tabla "juegos" de la base de datos
      try {
        const { title, description } = body;
        const text =
          "UPDATE juegos SET title = $1, description = $2 WHERE id= $3 RETURNING *";
        const values = [title, description, query.id];
        const response = await conn.query(text, values);

        if (response.rows.length === 0) {
          return res.status(404).json({ message: "Juego no encontrado" });
        }

        return res.json(response.rows[0]);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    case "DELETE":
      try {
        const text = "DELETE FROM juegos WHERE id = $1 RETURNING *";
        const value = [query.id];
        const response = await conn.query(text, value);

        if (response.rowCount === 0) {
          return res.status(404).json({ message: "Juego no encontrado" });
        }

        return res.json(response.rows[0]);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    default: //retorna un error controlado
      return res.status(400).json("invalid method");
  }
}
