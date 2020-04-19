"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = require("./httpException");
class UserHasNotSignedUpException extends httpException_1.default {
    constructor(message) {
        super(400, `You have not signed up for this ${message}`);
    }
}
exports.default = UserHasNotSignedUpException;
//# sourceMappingURL=userHasNotSignedUpException.js.map