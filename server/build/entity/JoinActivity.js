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
const Activity_1 = require("./Activity");
let JoinActivity = class JoinActivity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], JoinActivity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("uuid"),
    __metadata("design:type", String)
], JoinActivity.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], JoinActivity.prototype, "activityId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => User_1.User, user => user.joinedActivities, { eager: true }),
    __metadata("design:type", User_1.User)
], JoinActivity.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Activity_1.Activity, activity => activity.participants, { eager: true }),
    __metadata("design:type", Activity_1.Activity)
], JoinActivity.prototype, "activity", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], JoinActivity.prototype, "hasApproved", void 0);
JoinActivity = __decorate([
    typeorm_1.Entity({ name: "joinActivities" })
], JoinActivity);
exports.JoinActivity = JoinActivity;
//# sourceMappingURL=JoinActivity.js.map