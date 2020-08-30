import { Request, Response } from "express";
import Router from "express-promise-router";
import { QueryOrder } from "mikro-orm";

import { DI } from "../mikro-orm-config";
import { GameType } from "../entities";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const gameTypes = await DI.orm.em.find(
      GameType,
      {},
      {
        populate: ["teams", "games.homeTeam", "games.awayTeam"],
        limit: 20,
        orderBy: { name: QueryOrder.ASC },
      }
    );
    res.json({ success: true, data: gameTypes });
  } catch (e) {
    return res.status(400).json({ message: e.message, success: false });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const gameType = await DI.orm.em.findOneOrFail(GameType, req.params.id);

    if (!gameType) {
      return res.status(404).json({ message: "game type not found" });
    }

    res.json({ success: true, data: gameType });
  } catch (e) {
    return res.status(400).json({ message: e.message, success: false });
  }
});

router.post("/", async (req: Request, res: Response) => {
  if (!req.body.name) {
    res.status(400);
    return res.json({ message: "Name field is missing" });
  }

  try {
    const gameType = new GameType(req.body.name, req.body.details || "");

    DI.orm.em.persistLater(gameType);
    await DI.orm.em.flush();

    res.json({ success: true, data: gameType });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

router.post("/delete/:id", async (req: Request, res: Response) => {
  try {
    const gameType = await DI.orm.em.findOne(GameType, req.params.id);

    if (!gameType) {
      return res.status(404).json({ message: "game type not found" });
    }
    await DI.orm.em.remove(GameType, req.params.id);
    await DI.orm.em.flush();
    return res.json({ success: true, data: gameType });
  } catch (e) {
    return res.status(400).json({ message: e.message, success: false });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const gameType = await DI.orm.em.findOne(GameType, req.params.id);

    if (!gameType) {
      return res.status(404).json({ message: "game type not found" });
    }
    gameType.name = req.body.name || gameType.name;
    gameType.details = req.body.details || gameType.details;

    await DI.orm.em.flush();
    res.json({ success: true, data: gameType });
  } catch (e) {
    return res.status(400).json({ message: e.message, success: false });
  }
});

export const GameTypeController = router;
