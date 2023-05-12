const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;
import { PrismaClient } from "@prisma/client";

declare global {
  namespace globalThis {
    var prismadb: PrismaClient;
  }
}
