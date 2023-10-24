import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from './MUser';

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "Juyee0415!",
    database: "studyuser",
    entities: [User],
    synchronize: true,
    logging: true,
    migrations: [],
  subscribers: [],
  });