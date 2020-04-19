"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = require("./httpException");
class UserHasSignedUpException extends httpException_1.default {
    constructor(context) {
        super(400, `You have signed up for this ${context}. Please wait for confirmation`);
    }
}
exports.default = UserHasSignedUpException;
//# sourceMappingURL=userHasSignedUpException.js.map