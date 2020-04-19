"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(error, _, response, next) {
    const status = error.status || 500;
    const message = error.message || "Internal error";
    response
        .status(status)
        .send({
        message,
        status
    });
}
exports.default = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map