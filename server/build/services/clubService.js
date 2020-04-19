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
const Club_1 = require("../entity/Club");
const JoinClub_1 = require("../entity/JoinClub");
class ClubService {
    constructor() {
        this.clubRepository = typeorm_1.getRepository(Club_1.Club);
        this.joinClubRepository = typeorm_1.getRepository(JoinClub_1.JoinClub);
        this.getClubs = () => __awaiter(this, void 0, void 0, function* () {
            const clubs = yield this.clubRepository
                .createQueryBuilder("club")
                .getMany();
            return clubs;
        });
        this.getClubById = (clubId) => __awaiter(this, void 0, void 0, function* () {
            const club = yield this.clubRepository
                .createQueryBuilder("club")
                .where(`club.Id = :clubId`, {
                clubId: clubId
            })
                .getOne();
            return club;
        });
        this.postClub = (clubData, user) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.clubRepository
                .create(Object.assign(Object.assign({}, clubData), { president: user }))
                .save();
            return result;
        });
        this.updateClubInfo = (clubData) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.clubRepository
                .createQueryBuilder("club")
                .update(Club_1.Club)
                .set(Object.assign({}, clubData))
                .where("id = :id", { id: clubData.id })
                .execute();
            return result;
        });
        this.getUserJoinClubCount = (clubId, userId) => __awaiter(this, void 0, void 0, function* () {
            const isExists = yield this.joinClubRepository
                .createQueryBuilder("joinClub")
                .where(`userId = :userId AND
                                             clubId = :clubId`, {
                userId: userId,
                clubId: clubId
            })
                .getCount();
            return isExists;
        });
        this.getUserHasJoinedClubStatus = (clubId, userId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.joinClubRepository
                .createQueryBuilder("joinClub")
                .select("joinClub.hasJoined")
                .where(`joinClub.userId = :userId AND
                                           joinClub.clubId = :clubId`, {
                userId: userId,
                clubId: clubId
            })
                .getOne();
            return result === null || result === void 0 ? void 0 : result.hasJoined;
        });
        this.updateUserHasJoinedClubStatus = (clubId, userId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.joinClubRepository
                .createQueryBuilder()
                .update(JoinClub_1.JoinClub)
                .set({ hasJoined: true })
                .where(`userId = :userId AND
                                           clubId = :clubId`, {
                userId: userId,
                clubId: clubId
            })
                .execute();
            return result;
        });
        this.postUserJoinClub = (clubData, userId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.joinClubRepository
                .insert({
                userId: userId,
                clubId: clubData.id,
                reason: clubData.reason,
                hasJoined: false
            });
            return result;
        });
        this.deleteUserJoinClub = (clubId, userId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.joinClubRepository
                .createQueryBuilder()
                .delete()
                .from(JoinClub_1.JoinClub)
                .where(`userId = :userId AND
                                           clubId = :clubId`, {
                userId: userId,
                clubId: clubId
            })
                .execute();
            return result;
        });
        this.getPendingRequestsByUID = (user) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.joinClubRepository
                .createQueryBuilder("joinClub")
                .innerJoin("joinClub.club", "club")
                .innerJoin("joinClub.user", "user")
                .where(`club.presidentId = :userId AND
                                           joinClub.hasJoined = false`, {
                userId: user.id
            })
                .getMany();
            return result;
        });
        this.getClubMembers = (clubId) => __awaiter(this, void 0, void 0, function* () {
            const results = yield this.joinClubRepository
                .createQueryBuilder("joinClub")
                .innerJoinAndSelect("joinClub.user", "user.id")
                .where(`joinClub.clubId = :clubId AND
                                           joinClub.hasJoined = true`, {
                clubId: clubId
            })
                .getMany();
            return results;
        });
    }
}
exports.default = ClubService;
//# sourceMappingURL=clubService.js.map