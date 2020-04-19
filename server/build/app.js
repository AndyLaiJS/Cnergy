"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
class App {
    constructor(controllers, port) {
        this.app = express();
        this.port = port;
        this.initMiddlewares();
        this.initControllers(controllers);
        this.initErrorHandling();
    }
    initMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
    }
    initControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }
    initErrorHandling() {
        this.app.use(errorMiddleware_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening and Serving at localhost:${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map