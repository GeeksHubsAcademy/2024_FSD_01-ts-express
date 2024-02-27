import "reflect-metadata"
import 'dotenv/config';

import { DataSource } from "typeorm"
import { Roles1708945317185 } from "./migrations/1708945317185-roles"
import { Users1708948583994 } from "./migrations/1708948583994-users";
import { Authors1709015800741 } from "./migrations/1709015800741-authors";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "test",
  entities: [],
  migrations: [Roles1708945317185, Users1708948583994, Authors1709015800741],
  synchronize: false,
  logging: false,
})