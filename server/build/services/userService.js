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
const User_1 = require("../entity/User");
class UserService {
    constructor() {
        this.userRepository = typeorm_1.getRepository(User_1.User);
        this.getUserInfoByUID = (userId) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository
                .findOne({
                where: { id: userId }
            });
            if (user) {
                user.password = "";
            }
            return user;
        });
        this.getUserByEmail = (userEmail) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository
                .findOne({
                email: userEmail
            });
            return user;
        });
        this.insertUser = (userData, hashedPassword) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository
                .create(Object.assign(Object.assign({}, userData), { password: hashedPassword }))
                .save();
            return user;
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=userService.js.map