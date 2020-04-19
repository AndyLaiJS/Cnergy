"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const httpException_1 = require("../exceptions/httpException");
function validationMiddleware(type) {
    return (request, _, next) => {
        class_validator_1.validate(class_transformer_1.plainToClass(type, request.body))
            .then((errors) => {
            if (errors.length > 0) {
                const message = errors.map((error) => Object.values(error.constraints)).join(", ");
                next(new httpException_1.default(400, message));
            }
            else {
                next();
            }
        });
    };
}
exports.default = validationMiddleware;
//# sourceMappingURL=validationMiddleware.js.map