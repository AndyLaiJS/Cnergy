"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Activity_1 = require("../entity/Activity");
const JoinActivity_1 = require("../entity/JoinActivity");
class ActivityService {
    constructor() {
        this.activityRepository = typeorm_1.getRepository(Activity_1.Activity);
        this.joinActivityRepository = typeorm_1.getRepository(JoinActivity_1.JoinActivity);
        this.getActivitiesByTimestamp = (timestamp, comparator = ">=") => __awaiter(this, void 0, void 0, function* () {
            const activities = yield this.activityRepository
                .createQueryBuilder("activity")
                .where(`activity.activityDate ${comparator} :time`, {
                time: timestamp
            })
                .getMany();
            return activities;
        });
        this.getActivitiesByEmailAndTimestamp = (userEmail, timestamp, comparator = ">=") => __awaiter(this, void 0, void 0, function* () {
            const activities = yield this.activityRepository
                .createQueryBuilder("activity")
                .innerJoinAndSelect("activity.creator", "creator")
                .where(`creator.email=:email AND
                                               activity.activityDate ${comparator} :time`, {
                email: userEmail,
                time: timestamp
            })
                .getMany();
            return activities;
        });
        this.getActivityById = (activityId) => __awaiter(this, void 0, void 0, function* () {
            const activity = yield this.activityRepository
                .findOne({
                where: { id: activityId }
            });
            return activity;
        });
        this.getActivityTypeById = (activityId) => __awaiter(this, void 0, void 0, function* () {
            const activity = yield this.activityRepository
                .createQueryBuilder("activity")
                .select("activity.type")
                .where(`activity.id = :id`, {
                id: activityId
            })
                .getOne();
            return activity === null || activity === void 0 ? void 0 : activity.type;
        });
        this.postActivity = (activityData, creator) => __awaiter(this, void 0, void 0, function* () {
            const activity = yield this.activityRepository
                .create(Object.assign(Object.assign({}, activityData), { creator: creator }))
                .save();
            return activity;
        });
        this.updateActivity = (activityData) => __awaiter(this, void 0, void 0, function* () {
            const activity = yield this.activityRepository
                .save(Object.assign({}, activityData));
            return activity;
        });
        this.updateActivityParticipantsCount = (activityId, count) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.activityRepository
                .createQueryBuilder("activity")
                .update(Activity_1.Activity)
                .set({ participantsCount: () => `participantsCount + ${count}` })
                .where("id = :id", { id: activityId })
                .execute();
            return result;
        });
        this.getJoinActivityCount = (activityId, userId) => __awaiter(this, void 0, void 0, function* () {
            const isExists = yield this.joinActivityRepository
                .count({
                where: {
                    userId: userId,
                    activityId: activityId,
                }
            });
            return isExists;
        });
        this.postUserJoinActivity = (activityId, userId, hasApproved = true) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.joinActivityRepository
                .insert({
                userId: userId,
                activityId: activityId,
                hasApproved: hasApproved
            });
            return result;
        });
        this.deleteUserJoinActivity = (activityId, userId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.joinActivityRepository
                .createQueryBuilder()
                .delete()
                .from(JoinActivity_1.JoinActivity)
                .where("userId =:userId AND activityId =:activityId", {
                userId: userId,
                activityId: activityId
            })
                .execute();
            return result;
        });
        this.getUserJoinActivityHasApprovedStatus = (activityId, userId) => __awaiter(this, void 0, void 0, function* () {
            const userHasBeenApproved = yield this.joinActivityRepository
                .createQueryBuilder("joinActivity")
                .where(`joinActivity.userId = :userId AND
                                                        joinActivity.activityId = :activityId`, {
                userId: userId,
                activityId: activityId
            })
                .getOne();
            return userHasBeenApproved === null || userHasBeenApproved === void 0 ? void 0 : userHasBeenApproved.hasApproved;
        });
        this.updateJoinActivityApprovedStatus = (activityId, userId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.joinActivityRepository
                .createQueryBuilder()
                .update(JoinActivity_1.JoinActivity)
                .set({ hasApproved: true })
                .where(`userId = :userId AND
                                           activityId = :activityId`, {
                userId: userId,
                activityId: activityId
            })
                .execute();
            return result;
        });
        this.getPendingRequestByUID = (userId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.joinActivityRepository
                .createQueryBuilder("joinActivity")
                .innerJoin("joinActivity.activity", "activity")
                .innerJoin("joinActivity.user", "user")
                .where(`activity.creatorId = :userId AND
                                           joinActivity.hasApproved = false`, {
                userId: userId
            })
                .getMany();
            return result;
        });
    }
}
exports.default = ActivityService;
//# sourceMappingURL=activityService.js.map