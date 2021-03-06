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
exports.Cache = void 0;
const mikro_orm_1 = require("mikro-orm");
const BaseEntity_1 = require("./BaseEntity");
let Cache = class Cache extends BaseEntity_1.BaseEntity {
    constructor(name, data, lifeTime) {
        super();
        this.name = name;
        this.data = data;
        this.lifeTime = lifeTime;
    }
};
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", String)
], Cache.prototype, "name", void 0);
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", String)
], Cache.prototype, "data", void 0);
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", Number)
], Cache.prototype, "lifeTime", void 0);
Cache = __decorate([
    mikro_orm_1.Entity(),
    __metadata("design:paramtypes", [String, String, Number])
], Cache);
exports.Cache = Cache;
//# sourceMappingURL=Cache.js.map