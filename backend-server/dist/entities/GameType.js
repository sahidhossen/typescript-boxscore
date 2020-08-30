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
exports.GameType = void 0;
const mikro_orm_1 = require("mikro-orm");
const BaseEntity_1 = require("./BaseEntity");
const index_1 = require("./index");
let GameType = class GameType extends BaseEntity_1.BaseEntity {
    constructor(name, details) {
        super();
        this.teams = new mikro_orm_1.Collection(this);
        this.games = new mikro_orm_1.Collection(this);
        this.name = name;
        this.details = details;
    }
};
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", String)
], GameType.prototype, "name", void 0);
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", String)
], GameType.prototype, "details", void 0);
__decorate([
    mikro_orm_1.OneToMany(() => index_1.Team, (b) => b.gameType, { cascade: [mikro_orm_1.Cascade.ALL] }),
    __metadata("design:type", Object)
], GameType.prototype, "teams", void 0);
__decorate([
    mikro_orm_1.OneToMany(() => index_1.Game, (b) => b.gameType, { cascade: [mikro_orm_1.Cascade.ALL] }),
    __metadata("design:type", Object)
], GameType.prototype, "games", void 0);
GameType = __decorate([
    mikro_orm_1.Entity(),
    __metadata("design:paramtypes", [String, String])
], GameType);
exports.GameType = GameType;
//# sourceMappingURL=GameType.js.map