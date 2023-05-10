import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "@/src/utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case "GET": //hace una peticion de toda la info de la tabla "juegos" de la base de datos
      try {
        const query = "SELECT * FROM juegos";
        const response = await conn.query(query);

        return res.status(200).json(response.rows);
      } catch (error: any) {
        return res.status(405).json({ error: error.message });
      }
    case "POST": //hace una creacion en la tabla "juegos" de la base de datos
      try {
        const { title, description } = body;

        const query =
          "INSERT INTO juegos(title, description) VALUES ($1, $2) RETURNING *";
        const values = [title, description];
        const response = await conn.query(query, values);

        return res.status(200).json(response.rows[0]);
      } catch (error: any) {
        return res.status(405).json({ error: error.message });
      }

    default: //retorna un error controlado
      return res.status(400).json("invalid method");
  }
}
