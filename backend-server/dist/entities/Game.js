"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const mikro_orm_1 = require("mikro-orm");
const index_1 = require("./index");
const BaseEntity_1 = require("./BaseEntity");
let Game = class Game extends BaseEntity_1.BaseEntity {
    constructor(name, round, gameType, homeTeam, awayTeam, details = "") {
        super();
        this.name = name;
        this.round = round;
        this.gameType = gameType;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.details = details;
    }
};
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", String)
], Game.prototype, "name", void 0);
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", Number)
], Game.prototype, "round", void 0);
__decorate([
    mikro_orm_1.ManyToOne(),
    __metadata("design:type", index_1.GameType)
], Game.prototype, "gameType", void 0);
__decorate([
    mikro_orm_1.OneToOne(),
    __metadata("design:type", index_1.Team)
], Game.prototype, "homeTeam", void 0);
__decorate([
    mikro_orm_1.OneToOne(),
    __metadata("design:type", index_1.Team)
], Game.prototype, "awayTeam", void 0);
__decorate([
    mikro_orm_1.OneToOne(),
    __metadata("design:type", index_1.Team)
], Game.prototype, "winTeam", void 0);
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", String)
], Game.prototype, "details", void 0);
Game = __decorate([
    mikro_orm_1.Entity(),
    __metadata("design:paramtypes", [String, Number, index_1.GameType, index_1.Team, index_1.Team, String])
], Game);
exports.Game = Game;
//# sourceMappingURL=Game.js.map