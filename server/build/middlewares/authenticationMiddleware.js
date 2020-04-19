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
const jwt = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const wrongAuthenticationTokenException_1 = require("../exceptions/wrongAuthenticationTokenException");
const missingAuthenticationTokenException_1 = require("../exceptions/missingAuthenticationTokenException");
const sessionHasExpiredException_1 = require("../exceptions/sessionHasExpiredException");
function authenticationMiddleware(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const cookies = request.cookies;
        const userRepository = typeorm_1.getRepository(User_1.User);
        if (cookies && cookies.Authorization) {
            const secret = process.env.JWT_SECRET;
            try {
                const verificationResponse = jwt.verify(cookies.Authorization, secret);
                const id = verificationResponse.id;
                const user = yield userRepository.findOne({
                    id: id
                });
                if (user) {
                    request.user = user;
                    next();
                }
                else {
                    next(new wrongAuthenticationTokenException_1.default());
                }
            }
            catch (e) {
                next(new sessionHasExpiredException_1.default());
            }
        }
        else {
            next(new missingAuthenticationTokenException_1.default());
        }
    });
}
exports.default = authenticationMiddleware;
//# sourceMappingURL=authenticationMiddleware.js.map