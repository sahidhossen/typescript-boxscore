import dotenv from "dotenv";
import { MikroORM, EntityManager } from "mikro-orm";
import { GameType, Game, Team, TeamMember, Cache, GameScore, BaseEntity } from "./entities";

dotenv.config();

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
};

const config = {
  entities: [GameType, Team, TeamMember, Game, GameScore, Cache, BaseEntity],
  entitiesDirsTs: ["src/entities"],
  type: "mongo",
  dbName: process.env.MONGODB,
  clientUrl: process.env.MONGO_CLIENT_URL,
  logger: console.log.bind(console),
  debug: false,
};

export default config;
