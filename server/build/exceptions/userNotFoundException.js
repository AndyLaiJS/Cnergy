"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = require("./httpException");
class UserNotFoundException extends httpException_1.default {
    constructor() {
        super(404, `User not found, please register beforehand`);
    }
}
exports.default = UserNotFoundException;
//# sourceMappingURL=userNotFoundException.js.map