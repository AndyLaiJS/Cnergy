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
const clubService_1 = require("../services/clubService");
const userService_1 = require("../services/userService");
const clubRequestDto_1 = require("../dtos/clubRequestDto");
const createClubDto_1 = require("../dtos/createClubDto");
const joinClubDto_1 = require("../dtos/joinClubDto");
const updateClubDto_1 = require("../dtos/updateClubDto");
const unauthorizedException_1 = require("../exceptions/unauthorizedException");
const userHasSignedUpException_1 = require("../exceptions/userHasSignedUpException");
const userHasNotSignedUpException_1 = require("../exceptions/userHasNotSignedUpException");
const userHasJoinedException_1 = require("../exceptions/userHasJoinedException");
const joinRequestNotFoundException_1 = require("../exceptions/joinRequestNotFoundException");
const authenticationMiddleware_1 = require("../middlewares/authenticationMiddleware");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
class ClubController {
    constructor() {
        this.path = "/club";
        this.context = "club";
        this.router = express_1.Router();
        this.clubService = new clubService_1.default();
        this.userService = new userService_1.default();
        this.getClubs = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const clubs = yield this.clubService
                    .getClubs();
                response.send(clubs);
            }
            catch (e) {
                next(e);
            }
        });
        this.createClub = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const president = request.user;
            const clubInfo = request.body;
            try {
                const result = yield this.clubService
                    .postClub(clubInfo, president);
                response.send(result);
            }
            catch (e) {
                next(e);
            }
        });
        this.updateClubInfo = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const president = request.user;
            const updatedClubInfo = request.body;
            if (president.id == updatedClubInfo.president.id) {
                try {
                    yield this.clubService
                        .updateClubInfo(updatedClubInfo);
                    response.send({
                        status: 200
                    });
                }
                catch (e) {
                    next(e);
                }
            }
            else {
                next(new unauthorizedException_1.default());
            }
        });
        this.joinClub = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const user = request.user;
            const joinClubInfo = request.body;
            const hasSignedUp = yield this.clubService
                .getUserJoinClubCount(joinClubInfo.id, user.id);
            if (hasSignedUp != 0) {
                next(new userHasSignedUpException_1.default(this.context));
            }
            else {
                try {
                    yield this.clubService
                        .postUserJoinClub(joinClubInfo, user.id);
                    response.send({
                        message: "You have successfully signed up for this club. Please wait for the confirmation",
                        status: 200
                    });
                }
                catch (e) {
                    next(e);
                }
            }
        });
        this.cancelJoinClub = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const user = request.user;
            const clubInfo = request.body;
            const hasSignedUp = yield this.clubService
                .getUserJoinClubCount(clubInfo.id, user.id);
            if (hasSignedUp == 0) {
                next(new userHasNotSignedUpException_1.default(this.context));
            }
            else {
                try {
                    const hasJoined = yield this.clubService
                        .getUserHasJoinedClubStatus(clubInfo.id, user.id);
                    if (hasJoined) {
                        next(new userHasJoinedException_1.default(this.context));
                    }
                    else {
                        yield this.clubService
                            .deleteUserJoinClub(clubInfo.id, user.id);
                        response.send({
                            message: "You have succesfully cancel your join request",
                            status: 200
                        });
                    }
                }
                catch (e) {
                    next(e);
                }
            }
        });
        this.getPendingClubRequests = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const user = request.user;
            const results = yield this.clubService
                .getPendingRequestsByUID(user);
            for (let i = 0; i < results.length; i++) {
                results[i]["club"] = (yield this.clubService
                    .getClubById(results[i].clubId));
                results[i]["user"] = (yield this.userService
                    .getUserInfoByUID(results[i].userId));
            }
            response.send(results);
        });
        this.rejectJoinClubRequest = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const user = request.user;
            const clubInfo = request.body;
            const hasSignedUp = yield this.clubService
                .getUserJoinClubCount(clubInfo.club.id, clubInfo.user.id);
            if (hasSignedUp == 0) {
                next(new joinRequestNotFoundException_1.default(this.context));
            }
            else {
                const hasJoined = yield this.clubService
                    .getUserHasJoinedClubStatus(clubInfo.club.id, clubInfo.user.id);
                if (hasJoined) {
                    next(new userHasJoinedException_1.default(this.context));
                }
                else {
                    yield this.clubService
                        .deleteUserJoinClub(clubInfo.club.id, clubInfo.user.id);
                    response.send({
                        message: "You have successfully rejecting club request",
                        status: 200
                    });
                }
            }
        });
        this.acceptJoinClubRequest = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const clubInfo = request.body;
            const hasSignedUp = yield this.clubService
                .getUserJoinClubCount(clubInfo.club.id, clubInfo.user.id);
            if (hasSignedUp == 0) {
                next(new joinRequestNotFoundException_1.default(this.context));
            }
            else {
                const hasJoined = yield this.clubService
                    .getUserHasJoinedClubStatus(clubInfo.club.id, clubInfo.user.id);
                if (hasJoined) {
                    next(new userHasJoinedException_1.default(this.context));
                }
                else {
                    yield this.clubService
                        .updateUserHasJoinedClubStatus(clubInfo.club.id, clubInfo.user.id);
                    response.send({
                        message: "You have successfully accepting club request",
                        status: 200
                    });
                }
            }
        });
        this.getClubMembers = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const clubId = request.body["id"];
            try {
                const members = yield this.clubService
                    .getClubMembers(clubId);
                response.send(members);
            }
            catch (e) {
                next(e);
            }
        });
        this.initRoutes();
    }
    initRoutes() {
        this.router
            .all(`${this.path}`, authenticationMiddleware_1.default)
            .get(`${this.path}`, this.getClubs)
            .post(`${this.path}`, validationMiddleware_1.default(createClubDto_1.default), this.createClub)
            .patch(`${this.path}`, validationMiddleware_1.default(updateClubDto_1.default), this.updateClubInfo);
        this.router
            .get(`${this.path}/members`, authenticationMiddleware_1.default, this.getClubMembers);
        this.router
            .all(`${this.path}/join`, authenticationMiddleware_1.default)
            .post(`${this.path}/join`, validationMiddleware_1.default(joinClubDto_1.default), this.joinClub)
            .delete(`${this.path}/join`, this.cancelJoinClub);
        this.router
            .get(`${this.path}/pending`, authenticationMiddleware_1.default, this.getPendingClubRequests);
        this.router
            .delete(`${this.path}/reject`, authenticationMiddleware_1.default, validationMiddleware_1.default(clubRequestDto_1.default), this.rejectJoinClubRequest);
        this.router
            .post(`${this.path}/accept`, authenticationMiddleware_1.default, validationMiddleware_1.default(clubRequestDto_1.default), this.acceptJoinClubRequest);
    }
}
exports.default = ClubController;
//# sourceMappingURL=clubController.js.map