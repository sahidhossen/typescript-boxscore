"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const entities_1 = require("./entities");
dotenv_1.default.config();
exports.DI = {};
const config = {
    entities: [entities_1.GameType, entities_1.Team, entities_1.TeamMember, entities_1.Game, entities_1.GameScore, entities_1.Cache, entities_1.BaseEntity],
    entitiesDirsTs: ["src/entities"],
    type: "mongo",
    dbName: process.env.MONGODB,
    clientUrl: process.env.MONGO_CLIENT_URL,
    logger: console.log.bind(console),
    debug: false,
};
exports.default = config;
//# sourceMappingURL=mikro-orm-config.js.map