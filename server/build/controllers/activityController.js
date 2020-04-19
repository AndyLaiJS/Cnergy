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
const express_1 = require("express");
const activityService_1 = require("../services/activityService");
const userService_1 = require("../services/userService");
const activityRequestDto_1 = require("../dtos/activityRequestDto");
const createActivityDto_1 = require("../dtos/createActivityDto");
const unauthorizedException_1 = require("../exceptions/unauthorizedException");
const userHasSignedUpException_1 = require("../exceptions/userHasSignedUpException");
const userHasNotSignedUpException_1 = require("../exceptions/userHasNotSignedUpException");
const userHasJoinedException_1 = require("../exceptions/userHasJoinedException");
const joinRequestNotFoundException_1 = require("../exceptions/joinRequestNotFoundException");
const authenticationMiddleware_1 = require("../middlewares/authenticationMiddleware");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const utils_1 = require("../utils");
class ActivityController {
    constructor() {
        this.path = "/activity";
        this.context = "activity";
        this.router = express_1.Router();
        this.activityService = new activityService_1.default();
        this.userService = new userService_1.default();
        this.getAllOngoingActivities = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const userSid = request.query["sid"];
            const timestamp = utils_1.default.getCurrentTimestamp();
            try {
                let activities;
                if (userSid) {
                    const userEmail = utils_1.default.getEmail(userSid);
                    activities = yield this.activityService
                        .getActivitiesByEmailAndTimestamp(userEmail, timestamp);
                }
                else {
                    activities = yield this.activityService
                        .getActivitiesByTimestamp(timestamp);
                }
                response.send({
                    activities: activities
                });
            }
            catch (e) {
                next(e);
            }
        });
        this.getAllPastActivities = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const userSid = request.query["sid"];
            const timestamp = utils_1.default.getCurrentTimestamp();
            try {
                let activities;
                if (userSid) {
                    const userEmail = utils_1.default.getEmail(userSid);
                    activities = yield this.activityService
                        .getActivitiesByEmailAndTimestamp(userEmail, timestamp, "<");
                }
                else {
                    activities = yield this.activityService
                        .getActivitiesByTimestamp(timestamp, "<");
                }
                response.send({
                    activities: activities
                });
            }
            catch (e) {
                next(e);
            }
        });
        this.createActivity = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const creator = request.user;
            const activityData = request.body;
            try {
                const result = yield this.activityService
                    .postActivity(activityData, creator);
                response.send(result);
            }
            catch (e) {
                next(e);
            }
        });
        this.updateUserActivity = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const creator = request.user;
            const activityData = request.body;
            if (creator.id == activityData.creator.id) {
                try {
                    const result = yield this.activityService
                        .updateActivity(activityData);
                    response.send(result);
                }
                catch (e) {
                    next(e);
                }
            }
            else {
                next(new unauthorizedException_1.default());
            }
        });
        this.joinActivity = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const user = request.user;
            const activityData = request.body;
            const hasSignedUp = yield this.activityService
                .getJoinActivityCount(activityData.id, user.id);
            if (hasSignedUp != 0) {
                next(new userHasSignedUpException_1.default(this.context));
            }
            else {
                try {
                    const type = yield this.activityService
                        .getActivityTypeById(activityData.id);
                    let hasApproved = true;
                    if (type == "Private") {
                        hasApproved = false;
                    }
                    yield this.activityService
                        .postUserJoinActivity(activityData.id, user.id, hasApproved);
                    let additionalMsg = (type == "Private")
                        ? " Please wait for the confirmation from the activity creator"
                        : "";
                    if (additionalMsg.length == 0) {
                        yield this.activityService
                            .updateActivityParticipantsCount(activityData.id, 1);
                    }
                    response.send({
                        message: `You have successfully signed up for the activity.${additionalMsg}`,
                        status: 200
                    });
                }
                catch (e) {
                    next(e);
                }
            }
        });
        this.cancelJoinActivity = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const user = request.user;
            const activityData = request.body;
            const hasSignedUp = yield this.activityService
                .getJoinActivityCount(activityData.id, user.id);
            if (hasSignedUp == 0) {
                next(new userHasNotSignedUpException_1.default(this.context));
            }
            else {
                try {
                    const hasApproved = yield this.activityService
                        .getUserJoinActivityHasApprovedStatus(activityData.id, user.id);
                    const type = yield this.activityService
                        .getActivityTypeById(activityData.id);
                    yield this.activityService
                        .deleteUserJoinActivity(activityData.id, user.id);
                    if (type == "Public" || (type == "Private" && hasApproved)) {
                        yield this.activityService
                            .updateActivityParticipantsCount(activityData.id, -1);
                    }
                    response.send({
                        message: "You have successfully unregistered the activity",
                        status: 200
                    });
                }
                catch (e) {
                    next(e);
                }
            }
        });
        this.getPendingActivityRequests = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const user = request.user;
            const results = yield this.activityService
                .getPendingRequestByUID(user.id);
            for (let i = 0; i < results.length; i++) {
                results[i]["activity"] = (yield this.activityService
                    .getActivityById(results[i].activityId));
                results[i]["user"] = (yield this.userService
                    .getUserInfoByUID(results[i].userId));
            }
            response.send(results);
        });
        this.rejectActivityRequest = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const activityData = request.body;
            const hasSignedUp = yield this.activityService
                .getJoinActivityCount(activityData.activity.id, activityData.user.id);
            if (hasSignedUp == 0) {
                next(new joinRequestNotFoundException_1.default(this.context));
            }
            else {
                const hasApproved = yield this.activityService
                    .getUserJoinActivityHasApprovedStatus(activityData.activity.id, activityData.user.id);
                if (hasApproved) {
                    next(new userHasJoinedException_1.default(this.context));
                }
                else {
                    yield this.activityService
                        .deleteUserJoinActivity(activityData.activity.id, activityData.user.id);
                    response.send({
                        message: "You have successfully rejecting activity request",
                        status: 200
                    });
                }
            }
        });
        this.acceptActivityRequest = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const activityData = request.body;
            const hasSignedUp = yield this.activityService
                .getJoinActivityCount(activityData.activity.id, activityData.user.id);
            if (hasSignedUp == 0) {
                next(new joinRequestNotFoundException_1.default(this.context));
            }
            else {
                const hasApproved = yield this.activityService
                    .getUserJoinActivityHasApprovedStatus(activityData.activity.id, activityData.user.id);
                if (hasApproved == false) {
                    yield this.activityService
                        .updateJoinActivityApprovedStatus(activityData.activity.id, activityData.user.id);
                    yield this.activityService
                        .updateActivityParticipantsCount(activityData.activity.id, 1);
                    response.send({
                        message: "You have successfully accepting activity request",
                        status: 200
                    });
                }
                else {
                    next(new userHasJoinedException_1.default(this.context));
                }
            }
        });
        this.initRoutes();
    }
    initRoutes() {
        this.router
            .all(`${this.path}`, authenticationMiddleware_1.default)
            .get(`${this.path}`, this.getAllOngoingActivities)
            .post(`${this.path}`, validationMiddleware_1.default(createActivityDto_1.default), this.createActivity)
            .patch(`${this.path}`, this.updateUserActivity);
        this.router
            .all(`${this.path}/past`, authenticationMiddleware_1.default)
            .get(`${this.path}/past`, this.getAllPastActivities);
        this.router
            .all(`${this.path}/join`, authenticationMiddleware_1.default)
            .post(`${this.path}/join`, this.joinActivity)
            .delete(`${this.path}/join`, this.cancelJoinActivity);
        this.router
            .post(`${this.path}/accept`, authenticationMiddleware_1.default, this.acceptActivityRequest);
        this.router
            .delete(`${this.path}/reject`, authenticationMiddleware_1.default, validationMiddleware_1.default(activityRequestDto_1.default), this.rejectActivityRequest);
        this.router
            .get(`${this.path}/pending`, authenticationMiddleware_1.default, validationMiddleware_1.default(activityRequestDto_1.default), this.getPendingActivityRequests);
    }
}
exports.default = ActivityController;
//# sourceMappingURL=activityController.js.map