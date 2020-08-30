"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mikro_orm_1 = require("mikro-orm");
const router_1 = __importDefault(require("./router"));
const mikro_orm_config_1 = __importStar(require("./mikro-orm-config"));
const entities_1 = require("./entities");
const feeds_1 = __importDefault(require("./feeds"));
dotenv_1.default.config();
const port = process.env.PORT || 5000;
const app = express_1.default();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    mikro_orm_config_1.DI.orm = yield mikro_orm_1.MikroORM.init(mikro_orm_config_1.default);
    mikro_orm_config_1.DI.em = mikro_orm_config_1.DI.orm.em;
    const gameTypes = yield mikro_orm_config_1.DI.orm.em.find(entities_1.GameType, {});
    if (gameTypes.length === 0) {
        yield feeds_1.default.createCollection();
        yield feeds_1.default.startFeeding();
    }
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use((req, res, next) => mikro_orm_1.RequestContext.create(mikro_orm_config_1.DI.orm.em, next));
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(router_1.default);
    app.use((req, res) => res.status(404).json({ message: "No route found" }));
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
});
main().catch((error) => {
    console.log(error);
});
//# sourceMappingURL=index.js.map