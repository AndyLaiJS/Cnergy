import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";

import App from "./app";

import AuthenticationController from "./controllers/authenticationController";
import ActivityController from "./controllers/activityController";
import ClubController from "./controllers/clubController";
import UserController from "./controllers/userController";

async function main() {
    const config = await getConnectionOptions(process.env.NODE_ENV);
    const db = await createConnection({
        ...config,
        name: "default"
    });
    await db.runMigrations();
    console.log("Done migrating");
    
    const app = new App([
        new AuthenticationController(),
        new ActivityController(),
        new ClubController(),
        new UserController(),
    ],3000);
    app.listen();
}

main();