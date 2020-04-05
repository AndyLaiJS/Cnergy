import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";

import App from "./app";

import AuthenticationController from "./controllers/authenticationController";
import ActivityController from "./controllers/activityController";

async function main() {
    const config = await getConnectionOptions(process.env.NODE_ENV);
    await createConnection({
        ...config,
        name: "default"
    });
    // await db.runMigrations();
    const app = new App([
        new AuthenticationController(),
        new ActivityController(),
    ],3000);
    app.listen();
}

main();