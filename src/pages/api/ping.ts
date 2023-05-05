import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from "@/src/utils/database";

type Data = {
  message: string;
  time: string;
};

// funcion para probar si se conecto la base de datos.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await conn.query("SELECT NOW()");

  res.status(200).json({ message: "Pong", time: response.rows[0].now });
}
