"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = require("./httpException");
class UnauthorizedException extends httpException_1.default {
    constructor() {
        super(401, `You are not authorized to perform this action.`);
    }
}
exports.default = UnauthorizedException;
//# sourceMappingURL=unauthorizedException.js.map