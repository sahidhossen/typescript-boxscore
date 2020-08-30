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
exports.GameScore = void 0;
const mikro_orm_1 = require("mikro-orm");
const index_1 = require("./index");
const BaseEntity_1 = require("./BaseEntity");
let GameScore = class GameScore extends BaseEntity_1.BaseEntity {
    constructor(game, homeTeamScore, awayTeamScore) {
        super();
        this.game = game;
        this.homeTeamScore = homeTeamScore;
        this.awayTeamScore = awayTeamScore;
    }
};
__decorate([
    mikro_orm_1.ManyToOne(),
    __metadata("design:type", index_1.Game)
], GameScore.prototype, "game", void 0);
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", Object)
], GameScore.prototype, "homeTeamScore", void 0);
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", Object)
], GameScore.prototype, "awayTeamScore", void 0);
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", String)
], GameScore.prototype, "details", void 0);
GameScore = __decorate([
    mikro_orm_1.Entity(),
    __metadata("design:paramtypes", [index_1.Game, Object, Object])
], GameScore);
exports.GameScore = GameScore;
//# sourceMappingURL=GameScore.js.map