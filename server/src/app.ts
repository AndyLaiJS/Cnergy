import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";

import Controller from "./interfaces/controllerInterface";
import errorMiddleware from "./middlewares/errorMiddleware";

class App {
     public app: express.Application;
     public port: number;

     constructor(controllers: Controller[], port: number) {
          this.app = express();
          this.port = port;

          this.initMiddlewares();
          this.initControllers(controllers);
          this.initErrorHandling();
     }

     private initMiddlewares() {
          this.app.use(bodyParser.json());
          this.app.use(cookieParser());
     }

     private initControllers(controllers: Controller[]) {
          controllers.forEach((controller) => {
               this.app.use("/", controller.router);
          })
     }

     private initErrorHandling() {
          this.app.use(errorMiddleware);
     }

     public listen() {
          this.app.listen(this.port, () => {
               console.log(`Listening and Serving at localhost:${this.port}`);
          });
     }
}

export default App;