"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = require("./httpException");
class UserHasJoinedActivityException extends httpException_1.default {
    constructor(context) {
        super(400, `The selected user has joined the ${context}`);
    }
}
exports.default = UserHasJoinedActivityException;
//# sourceMappingURL=userHasJoinedException.js.map