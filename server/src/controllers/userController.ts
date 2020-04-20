import { Router, Response, Request, NextFunction } from "express";
import * as bcrypt from "bcrypt";

import Controller from "../interfaces/controllerInterface";
import UserService from "../services/userService";
import UserNotFoundException from "../exceptions/userNotFoundException";

class UserController implements Controller {
     public path = "/user";
     public context = "user";
     public router = Router();
     private userService = new UserService();

     constructor() {
          this.initRoutes();
     }

     private initRoutes() {
          this.router.patch(`${this.path}/pwd`, this.changePassword);
     }

     /**
      * PATCH /user/pwd?uid=...
      * 
      * changePassword() allow user to change their password
      */
     private changePassword = async (request: Request, response: Response, next: NextFunction) => {
          const uid = request.query["uid"];
          const user = await this.userService
                                 .getUserInfoByUID(uid);
          if (user) {
               const password = request.body["password"];
               const hashedPassword = await bcrypt.hash(password, 10);

               try {
                    await this.userService
                              .updateUserPassword(uid, hashedPassword);
                    response.send({
                         message: "Update password successful",
                         status: 200
                    })
               } catch(e) {
                    next(e);
               }
          } else {
               next(new UserNotFoundException());
          }
     }
}

export default UserController;