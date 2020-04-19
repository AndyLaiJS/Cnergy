"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = require("./httpException");
class SessionHasExpiredException extends httpException_1.default {
    constructor() {
        super(401, `Session has expired, please login again.`);
    }
}
exports.default = SessionHasExpiredException;
//# sourceMappingURL=sessionHasExpiredException.js.map