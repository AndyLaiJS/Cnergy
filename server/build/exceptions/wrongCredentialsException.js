"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = require("./httpException");
class WrongCredentialsException extends httpException_1.default {
    constructor() {
        super(401, `Wrong credentials provided`);
    }
}
exports.default = WrongCredentialsException;
//# sourceMappingURL=wrongCredentialsException.js.map