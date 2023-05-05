import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET": //hacer una peticion
      return res.status(200).json("getting task");
    case "POST": //hacer una creacion
      return res.status(200).json("creating task");
    default: //retorna un error controlado
      return res.status(400).json("invalid method");
  }
}
