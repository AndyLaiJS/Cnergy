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
const JoinActivity_1 = require("./JoinActivity");
let Activity = class Activity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Activity.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, user => user.activities),
    __metadata("design:type", User_1.User)
], Activity.prototype, "creator", void 0);
__decorate([
    typeorm_1.OneToMany(() => JoinActivity_1.JoinActivity, joinActivity => joinActivity.activity),
    __metadata("design:type", Array)
], Activity.prototype, "participants", void 0);
__decorate([
    typeorm_1.Column({
        nullable: false
    }),
    __metadata("design:type", String)
], Activity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        nullable: false
    }),
    __metadata("design:type", String)
], Activity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({
        nullable: false
    }),
    __metadata("design:type", Date)
], Activity.prototype, "activityDate", void 0);
__decorate([
    typeorm_1.Column({
        nullable: false
    }),
    __metadata("design:type", Number)
], Activity.prototype, "maxParticipants", void 0);
__decorate([
    typeorm_1.Column({
        nullable: false
    }),
    __metadata("design:type", Number)
], Activity.prototype, "minParticipants", void 0);
__decorate([
    typeorm_1.Column({
        default: () => "0",
        nullable: false
    }),
    __metadata("design:type", Number)
], Activity.prototype, "participantsCount", void 0);
__decorate([
    typeorm_1.Column({
        default: "Public",
        nullable: false
    }),
    __metadata("design:type", String)
], Activity.prototype, "type", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        default: () => "CURRENT_TIMESTAMP(6)",
        nullable: false
    }),
    __metadata("design:type", Date)
], Activity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)",
        nullable: false
    }),
    __metadata("design:type", Date)
], Activity.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.DeleteDateColumn({
        nullable: true
    }),
    __metadata("design:type", Date)
], Activity.prototype, "deletedAt", void 0);
Activity = __decorate([
    typeorm_1.Entity({ name: "activities" })
], Activity);
exports.Activity = Activity;
//# sourceMappingURL=Activity.js.map