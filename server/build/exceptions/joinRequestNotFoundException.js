"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = require("./httpException");
class JoinRequestNotFoundException extends httpException_1.default {
    constructor(context) {
        super(401, `No join ${context} request entry found.`);
    }
}
exports.default = JoinRequestNotFoundException;
//# sourceMappingURL=joinRequestNotFoundException.js.map