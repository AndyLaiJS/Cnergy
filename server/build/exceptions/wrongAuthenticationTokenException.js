"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = require("./httpException");
class WrongAuthenticationTokenException extends httpException_1.default {
    constructor() {
        super(401, `Wrong authentication token`);
    }
}
exports.default = WrongAuthenticationTokenException;
//# sourceMappingURL=wrongAuthenticationTokenException.js.map