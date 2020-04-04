import "reflect-metadata";
import {createConnection, getConnectionOptions } from "typeorm";
import AuthenticationController from "./controllers/authenticationController";
import App from "./app";

async function main() {
    const config = await getConnectionOptions(process.env.NODE_ENV);
    await createConnection({
        ...config,
        name: "default"
    });
    // await db.runMigrations();
   
    const app = new App([
        new AuthenticationController()
    ],3000);
    app.listen();
}

main();