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
exports.Team = void 0;
const mikro_orm_1 = require("mikro-orm");
const index_1 = require("./index");
const BaseEntity_1 = require("./BaseEntity");
let Team = class Team extends BaseEntity_1.BaseEntity {
    constructor(name, shortName, gameType) {
        super();
        this.teamMember = new mikro_orm_1.Collection(this);
        this.name = name;
        this.gameType = gameType;
        this.shortName = shortName;
    }
};
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", String)
], Team.prototype, "name", void 0);
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", String)
], Team.prototype, "shortName", void 0);
__decorate([
    mikro_orm_1.ManyToOne(),
    __metadata("design:type", index_1.GameType)
], Team.prototype, "gameType", void 0);
__decorate([
    mikro_orm_1.OneToMany(() => index_1.TeamMember, (b) => b.team, { cascade: [mikro_orm_1.Cascade.ALL] }),
    __metadata("design:type", Object)
], Team.prototype, "teamMember", void 0);
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", String)
], Team.prototype, "details", void 0);
Team = __decorate([
    mikro_orm_1.Entity(),
    __metadata("design:paramtypes", [String, String, index_1.GameType])
], Team);
exports.Team = Team;
//# sourceMappingURL=Team.js.map