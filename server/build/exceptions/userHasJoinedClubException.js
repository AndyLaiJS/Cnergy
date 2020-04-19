"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = require("./httpException");
class UserHasJoinedClubException extends httpException_1.default {
    constructor() {
        super(400, `You have joined the club`);
    }
}
exports.default = UserHasJoinedClubException;
//# sourceMappingURL=userHasJoinedClubException.js.map