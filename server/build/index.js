"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const app_1 = require("./app");
const authenticationController_1 = require("./controllers/authenticationController");
const activityController_1 = require("./controllers/activityController");
const clubController_1 = require("./controllers/clubController");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const config = yield typeorm_1.getConnectionOptions(process.env.NODE_ENV);
        const db = yield typeorm_1.createConnection(Object.assign(Object.assign({}, config), { name: "default" }));
        yield db.runMigrations();
        console.log("Done migrating");
        const app = new app_1.default([
            new authenticationController_1.default(),
            new activityController_1.default(),
            new clubController_1.default(),
        ], 3000);
        app.listen();
    });
}
main();
//# sourceMappingURL=index.js.map