import { Request, Response } from "express";
import Router from "express-promise-router";
import { QueryOrder } from "mikro-orm";

import { DI } from "../mikro-orm-config";
import { GameScore, Game, Cache } from "../entities";
import { getTime } from "../utils";

const router = Router();

router.get("/:game_id", async (req: Request, res: Response) => {
  try {
    // Load cache data from cache table
    const cacheData = await DI.orm.em.findOne(Cache, { name: req.params.game_id });

    if (cacheData) {
      const timeDifferent = getTime(cacheData.updatedAt);
      // Check if has life then return cache data
      if (cacheData.lifeTime > timeDifferent) {
        return res.json({
          success: true,
          data: JSON.parse(cacheData.data),
          source: "cache",
          time: timeDifferent,
        });
      }
    }
    /**
     * If doesn't have cache life then query from main database and cache retrieve data
     */
    const game = await DI.orm.em.findOne(Game, req.params.game_id, {
      populate: ["gameType", "homeTeam", "awayTeam"],
    });
    if (!game) {
      return res.status(404).json({ message: "game not found" });
    }
    const gameScore = await DI.orm.em.find(
      GameScore,
      { game },
      {
        populate: ["game"],
        limit: 20,
        orderBy: { createdAt: QueryOrder.ASC },
      }
    );

    const result = { gameScore, game };

    if (cacheData) {
      cacheData.data = JSON.stringify(result);
      cacheData.updatedAt = new Date();
      await DI.orm.em.flush();
    } else {
      const newCacheScore = new Cache(req.params.game_id, JSON.stringify(result), 15);
      await DI.orm.em.persistAndFlush(newCacheScore);
    }

    return res.json({ success: true, data: result });
  } catch (e) {
    return res.status(400).json({ message: e.message, success: false });
  }
});

router.get("/score/:id", async (req: Request, res: Response) => {
  try {
    const gameScore = await DI.orm.em.findOneOrFail(GameScore, req.params.id);

    if (!gameScore) {
      return res.status(404).json({ message: "game score not found" });
    }

    return res.json({ success: true, data: gameScore });
  } catch (e) {
    return res.status(400).json({ message: e.message, success: false });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { game_id, home_team_score, away_team_score } = req.body;
  if (!game_id || !home_team_score || !away_team_score) {
    return res.status(400).json({ message: "GameId field is missing" });
  }

  try {
    const gameScore = new GameScore(game_id, home_team_score, away_team_score);

    DI.orm.em.persistLater(gameScore);
    await DI.orm.em.flush();

    return res.json({ success: true, data: gameScore });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

router.post("/delete/:id", async (req: Request, res: Response) => {
  try {
    const gameScore = await DI.orm.em.findOne(GameScore, req.params.id);

    if (!gameScore) {
      return res.status(404).json({ message: "game type not found" });
    }
    await DI.orm.em.remove(GameScore, req.params.id);
    await DI.orm.em.flush();
    return res.json({ success: true, data: gameScore });
  } catch (e) {
    return res.status(400).json({ message: e.message, success: false });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const gameScore = await DI.orm.em.findOne(GameScore, req.params.id);

    if (!gameScore) {
      return res.status(404).json({ message: "game type not found" });
    }
    gameScore.homeTeamScore = req.body.home_team_score || gameScore.homeTeamScore;
    gameScore.awayTeamScore = req.body.away_team_score || gameScore.awayTeamScore;

    await DI.orm.em.flush();
    return res.json({ success: true, data: gameScore });
  } catch (e) {
    return res.status(400).json({ message: e.message, success: false });
  }
});

export const GameScoreController = router;
