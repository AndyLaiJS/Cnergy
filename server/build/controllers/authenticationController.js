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
const bcrypt = require("bcrypt");
const userDto_1 = require("../dtos/userDto");
const loginDto_1 = require("../dtos/loginDto");
const authenticationService_1 = require("../services/authenticationService");
const userService_1 = require("../services/userService");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const wrongCredentialsException_1 = require("../exceptions/wrongCredentialsException");
const userNotFoundException_1 = require("../exceptions/userNotFoundException");
const utils_1 = require("../utils");
class AuthenticationController {
    constructor() {
        this.path = "/auth";
        this.context = "";
        this.router = express_1.Router();
        this.authenticationService = new authenticationService_1.default();
        this.userService = new userService_1.default();
        this.handleRegistration = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const userData = request.body;
            try {
                const { cookie, user } = yield this.authenticationService
                    .register(userData);
                response.setHeader("Set-Cookie", [cookie]);
                response.send(user);
            }
            catch (e) {
                next(e);
            }
        });
        this.handleLogin = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const loginData = request.body;
            const user = yield this.userService
                .getUserByEmail(loginData.email);
            if (user) {
                const passwordIsMatch = yield bcrypt.compare(loginData.password, user.password);
                if (passwordIsMatch) {
                    const secret = process.env.JWT_SECRET;
                    const tokenData = utils_1.default.createToken(user, secret);
                    const cookie = utils_1.default.createCookie(tokenData);
                    response.setHeader("Set-Cookie", [cookie]);
                    response.send(user);
                }
                else {
                    next(new wrongCredentialsException_1.default());
                }
            }
            else {
                next(new userNotFoundException_1.default());
            }
        });
        this.handleLogout = (_, response) => __awaiter(this, void 0, void 0, function* () {
            response.setHeader("Set-Cookie", ["Authorization=;Max-age=0"]);
            response.send(200);
        });
        this.initRoutes();
    }
    initRoutes() {
        this.router.post(`${this.path}/register`, validationMiddleware_1.default(userDto_1.default), this.handleRegistration);
        this.router.post(`${this.path}/login`, validationMiddleware_1.default(loginDto_1.default), this.handleLogin);
        this.router.post(`${this.path}/logout`, this.handleLogout);
    }
}
exports.default = AuthenticationController;
//# sourceMappingURL=authenticationController.js.map