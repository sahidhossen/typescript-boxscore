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
exports.GameTypeController = void 0;
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const mikro_orm_1 = require("mikro-orm");
const mikro_orm_config_1 = require("../mikro-orm-config");
const entities_1 = require("../entities");
const router = express_promise_router_1.default();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameTypes = yield mikro_orm_config_1.DI.orm.em.find(entities_1.GameType, {}, {
            populate: ["teams", "games.homeTeam", "games.awayTeam"],
            limit: 20,
            orderBy: { name: mikro_orm_1.QueryOrder.ASC },
        });
        return res.json({ success: true, data: gameTypes });
    }
    catch (e) {
        return res.status(400).json({ message: e.message, success: false });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameType = yield mikro_orm_config_1.DI.orm.em.findOneOrFail(entities_1.GameType, req.params.id);
        if (!gameType) {
            return res.status(404).json({ message: "game type not found" });
        }
        return res.json({ success: true, data: gameType });
    }
    catch (e) {
        return res.status(400).json({ message: e.message, success: false });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name) {
        res.status(400);
        return res.json({ message: "Name field is missing" });
    }
    try {
        const gameType = new entities_1.GameType(req.body.name, req.body.details || "");
        mikro_orm_config_1.DI.orm.em.persistLater(gameType);
        yield mikro_orm_config_1.DI.orm.em.flush();
        return res.json({ success: true, data: gameType });
    }
    catch (e) {
        return res.status(400).json({ message: e.message });
    }
}));
router.post("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameType = yield mikro_orm_config_1.DI.orm.em.findOne(entities_1.GameType, req.params.id);
        if (!gameType) {
            return res.status(404).json({ message: "game type not found" });
        }
        yield mikro_orm_config_1.DI.orm.em.remove(entities_1.GameType, req.params.id);
        yield mikro_orm_config_1.DI.orm.em.flush();
        return res.json({ success: true, data: gameType });
    }
    catch (e) {
        return res.status(400).json({ message: e.message, success: false });
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameType = yield mikro_orm_config_1.DI.orm.em.findOne(entities_1.GameType, req.params.id);
        if (!gameType) {
            return res.status(404).json({ message: "game type not found" });
        }
        gameType.name = req.body.name || gameType.name;
        gameType.details = req.body.details || gameType.details;
        yield mikro_orm_config_1.DI.orm.em.flush();
        return res.json({ success: true, data: gameType });
    }
    catch (e) {
        return res.status(400).json({ message: e.message, success: false });
    }
}));
exports.GameTypeController = router;
//# sourceMappingURL=gametype.controller.js.map