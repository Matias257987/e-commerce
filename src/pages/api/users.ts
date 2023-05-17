import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const users = await prisma.usuario.findMany();
    res.status(200).json(users);
  } else if (req.method === "POST") {
    const { name, email, password } = req.body;
    const newUser = await prisma.usuario.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.status(201).json(newUser);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
