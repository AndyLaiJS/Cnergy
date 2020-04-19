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
const JoinClub_1 = require("./JoinClub");
let Club = class Club extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Club.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, user => user.clubs),
    __metadata("design:type", User_1.User)
], Club.prototype, "president", void 0);
__decorate([
    typeorm_1.OneToMany(() => JoinClub_1.JoinClub, joinClub => joinClub.club),
    __metadata("design:type", Array)
], Club.prototype, "members", void 0);
__decorate([
    typeorm_1.Column({
        type: "longblob",
        nullable: true
    }),
    __metadata("design:type", Buffer)
], Club.prototype, "avatar", void 0);
__decorate([
    typeorm_1.Column({
        nullable: false
    }),
    __metadata("design:type", String)
], Club.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("text", {
        nullable: false
    }),
    __metadata("design:type", Text)
], Club.prototype, "description", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        default: () => "CURRENT_TIMESTAMP(6)"
    }),
    __metadata("design:type", Date)
], Club.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    }),
    __metadata("design:type", Date)
], Club.prototype, "updatedAt", void 0);
Club = __decorate([
    typeorm_1.Entity({ name: "clubs" })
], Club);
exports.Club = Club;
//# sourceMappingURL=Club.js.map