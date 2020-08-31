"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameScoreController = void 0;
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const mikro_orm_1 = require("mikro-orm");
const mikro_orm_config_1 = require("../mikro-orm-config");
const entities_1 = require("../entities");
const utils_1 = require("../utils");
const router = express_promise_router_1.default();
router.get("/:game_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cacheData = yield mikro_orm_config_1.DI.orm.em.findOne(entities_1.Cache, { name: req.params.game_id });
        if (cacheData) {
            const timeDifferent = utils_1.getTime(cacheData.updatedAt);
            if (cacheData.lifeTime > timeDifferent) {
                return res.json({
                    success: true,
                    data: JSON.parse(cacheData.data),
                    source: "cache",
                    time: timeDifferent,
                });
            }
        }
        const game = yield mikro_orm_config_1.DI.orm.em.findOne(entities_1.Game, req.params.game_id, {
            populate: ["gameType", "homeTeam", "awayTeam"],
        });
        if (!game) {
            return res.status(404).json({ message: "game not found" });
        }
        const gameScore = yield mikro_orm_config_1.DI.orm.em.find(entities_1.GameScore, { game }, {
            populate: ["game"],
            limit: 20,
            orderBy: { createdAt: mikro_orm_1.QueryOrder.ASC },
        });
        const result = { gameScore, game };
        if (cacheData) {
            cacheData.data = JSON.stringify(result);
            cacheData.updatedAt = new Date();
            yield mikro_orm_config_1.DI.orm.em.flush();
        }
        else {
            const newCacheScore = new entities_1.Cache(req.params.game_id, JSON.stringify(result), 15);
            yield mikro_orm_config_1.DI.orm.em.persistAndFlush(newCacheScore);
        }
        return res.json({ success: true, data: result });
    }
    catch (e) {
        return res.status(400).json({ message: e.message, success: false });
    }
}));
router.get("/score/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameScore = yield mikro_orm_config_1.DI.orm.em.findOneOrFail(entities_1.GameScore, req.params.id);
        if (!gameScore) {
            return res.status(404).json({ message: "game score not found" });
        }
        return res.json({ success: true, data: gameScore });
    }
    catch (e) {
        return res.status(400).json({ message: e.message, success: false });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { game_id, home_team_score, away_team_score } = req.body;
    if (!game_id || !home_team_score || !away_team_score) {
        return res.status(400).json({ message: "GameId field is missing" });
    }
    try {
        const gameScore = new entities_1.GameScore(game_id, home_team_score, away_team_score);
        mikro_orm_config_1.DI.orm.em.persistLater(gameScore);
        yield mikro_orm_config_1.DI.orm.em.flush();
        return res.json({ success: true, data: gameScore });
    }
    catch (e) {
        return res.status(400).json({ message: e.message });
    }
}));
router.post("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameScore = yield mikro_orm_config_1.DI.orm.em.findOne(entities_1.GameScore, req.params.id);
        if (!gameScore) {
            return res.status(404).json({ message: "game type not found" });
        }
        yield mikro_orm_config_1.DI.orm.em.remove(entities_1.GameScore, req.params.id);
        yield mikro_orm_config_1.DI.orm.em.flush();
        return res.json({ success: true, data: gameScore });
    }
    catch (e) {
        return res.status(400).json({ message: e.message, success: false });
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameScore = yield mikro_orm_config_1.DI.orm.em.findOne(entities_1.GameScore, req.params.id);
        if (!gameScore) {
            return res.status(404).json({ message: "game type not found" });
        }
        gameScore.homeTeamScore = req.body.home_team_score || gameScore.homeTeamScore;
        gameScore.awayTeamScore = req.body.away_team_score || gameScore.awayTeamScore;
        yield mikro_orm_config_1.DI.orm.em.flush();
        return res.json({ success: true, data: gameScore });
    }
    catch (e) {
        return res.status(400).json({ message: e.message, success: false });
    }
}));
exports.GameScoreController = router;
//# sourceMappingURL=gameScore.controller.js.map