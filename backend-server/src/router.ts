import { Request, Response } from "express";
import Router from "express-promise-router";
import { GameTypeController, GameScoreController } from "./controllers";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.json({ message: "Welcome to UNOVA boxscore board" });
});

router.use("/game-type", GameTypeController);
router.use("/game-score", GameScoreController);

export default router;
