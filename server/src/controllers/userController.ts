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
          this.router.put(`${this.path}/pwd`, this.changePassword);
          this.router.put(`${this.path}/about`, this.changeAbout);
     }

     /**
      * PUT /user/pwd?uid=...
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

     /**
      * PUT /user/about?uid=...
      * 
      * changeAbout() allow user to change their `About`
      */
     private changeAbout = async (request: Request, response: Response, next: NextFunction) => {
          const uid = request.query["uid"];
          const user = await this.userService
                                 .getUserInfoByUID(uid);
          if (user) {
               const about = request.body["about"] || "";
               try {
                    await this.userService
                              .updateUserAbout(user.id, about);
                    response.send({
                         message: "Update about successful",
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