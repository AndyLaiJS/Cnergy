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
const bcrypt = require("bcrypt");
const userService_1 = require("./userService");
const userWithSameEmailExistsException_1 = require("../exceptions/userWithSameEmailExistsException");
const utils_1 = require("../utils");
class AuthenticationService {
    constructor() {
        this.userService = new userService_1.default();
        this.register = (userData) => __awaiter(this, void 0, void 0, function* () {
            const userHasExisted = yield this.userService
                .getUserByEmail(userData.email);
            if (userHasExisted) {
                throw new userWithSameEmailExistsException_1.default(userData.email);
            }
            const hashedPassword = yield bcrypt.hash(userData.password, 10);
            const user = yield this.userService
                .insertUser(userData, hashedPassword);
            user.password = "";
            const secret = process.env.JWT_SECRET;
            const tokenData = utils_1.default.createToken(user, secret);
            const cookie = utils_1.default.createCookie(tokenData);
            return { cookie, user };
        });
    }
}
exports.default = AuthenticationService;
//# sourceMappingURL=authenticationService.js.map