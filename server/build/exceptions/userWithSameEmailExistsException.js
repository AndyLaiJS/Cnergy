"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = require("./httpException");
class UserWithEmailExistsException extends httpException_1.default {
    constructor(email) {
        super(400, `User with email ${email} already exists, please register with different email`);
    }
}
exports.default = UserWithEmailExistsException;
//# sourceMappingURL=userWithSameEmailExistsException.js.map