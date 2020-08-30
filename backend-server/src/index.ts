import express, { Application } from "express";
import dotenv from "dotenv";
import { MikroORM, RequestContext } from "mikro-orm";
import { MongoDriver } from "mikro-orm/dist/drivers/MongoDriver";
import Router from "./router";
import microConfig, { DI } from "./mikro-orm-config";
import { GameType } from "./entities";
import Feed from "./feeds";

dotenv.config();

const port = process.env.PORT || 5000;

const app: Application = express();

const main = async () => {
  DI.orm = await MikroORM.init<MongoDriver>(microConfig);
  DI.em = DI.orm.em;

  const gameTypes = await DI.orm.em.find(GameType, {});
  /**
   * Create database and start feeding data into collection if doesn't feed yet
   */
  if (gameTypes.length === 0) {
    await Feed.createCollection();
    await Feed.startFeeding();
  }

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
  // All routers store router file
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(Router);

  app.use((req, res) => res.status(404).json({ message: "No route found" }));

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
};

main().catch((error) => {
  console.log(error);
});
