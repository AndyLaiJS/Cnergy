"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = require("./httpException");
class MissingAuthenticationTokenException extends httpException_1.default {
    constructor() {
        super(401, `Authentication token missing`);
    }
}
exports.default = MissingAuthenticationTokenException;
//# sourceMappingURL=missingAuthenticationTokenException.js.map