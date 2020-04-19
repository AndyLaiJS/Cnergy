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
const Activity_1 = require("./Activity");
const JoinActivity_1 = require("./JoinActivity");
const Club_1 = require("./Club");
const JoinClub_1 = require("./JoinClub");
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        nullable: false
    }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({
        unique: true,
        nullable: false
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({
        nullable: false
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({
        nullable: false
    }),
    __metadata("design:type", String)
], User.prototype, "college", void 0);
__decorate([
    typeorm_1.OneToMany(() => Activity_1.Activity, activity => activity.creator, { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "activities", void 0);
__decorate([
    typeorm_1.OneToMany(() => Club_1.Club, club => club.president, { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "clubs", void 0);
__decorate([
    typeorm_1.OneToMany(() => JoinActivity_1.JoinActivity, joinActivity => joinActivity.user),
    __metadata("design:type", Array)
], User.prototype, "joinedActivities", void 0);
__decorate([
    typeorm_1.OneToMany(() => JoinClub_1.JoinClub, joinClub => joinClub.user),
    __metadata("design:type", Array)
], User.prototype, "joinedClubs", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        default: () => "CURRENT_TIMESTAMP(6)",
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
User = __decorate([
    typeorm_1.Entity({ name: "users" })
], User);
exports.User = User;
//# sourceMappingURL=User.js.map