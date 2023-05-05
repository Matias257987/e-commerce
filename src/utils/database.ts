import { Pool } from "pg"; // con esto puedo conectarme a mi postgresql

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env; // llamo las variables desde el .env
let conn: any; // creo una variable conexion.

// si no existe una conexion, se crea una nueva y se guarda en la variable antes creada, pasandole los valores de la base de datos
if (!conn) {
  conn = new Pool({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: 5432,
    database: DB_DATABASE,
  });
}

export { conn };
