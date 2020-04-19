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
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Club_1 = require("./Club");
let JoinClub = class JoinClub extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], JoinClub.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("uuid"),
    __metadata("design:type", String)
], JoinClub.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], JoinClub.prototype, "clubId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, user => user.joinedClubs, { eager: true }),
    __metadata("design:type", User_1.User)
], JoinClub.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Club_1.Club, club => club.members, { eager: true }),
    __metadata("design:type", Club_1.Club)
], JoinClub.prototype, "club", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], JoinClub.prototype, "hasJoined", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", Text)
], JoinClub.prototype, "reason", void 0);
JoinClub = __decorate([
    typeorm_1.Entity({ name: "joinClubs" })
], JoinClub);
exports.JoinClub = JoinClub;
//# sourceMappingURL=JoinClub.js.map