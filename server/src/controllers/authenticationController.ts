import { Router, Response, Request, NextFunction } from "express";
import * as bcrypt from "bcrypt";

import UserDto from "../dtos/userDto";
import LoginDto from "../dtos/loginDto";

import Controller from "../interfaces/controllerInterface";
import AuthenticationService from "../services/authenticationService";
import UserService from "../services/userService";
import validationMiddleware from "../middlewares/validationMiddleware";
import WrongCredentialsException from "../exceptions/wrongCredentialsException";
import UserNotFoundException from "../exceptions/userNotFoundException";
import utils from "../utils";

class AuthenticationController implements Controller {
     public path = "/auth";
     public context = "";
     public router = Router();
     private authenticationService = new AuthenticationService();
     private userService = new UserService();

     constructor() {
          this.initRoutes();
     }

     private initRoutes() {
          this.router.post(`${this.path}/register`, validationMiddleware(UserDto), this.handleRegistration);
          this.router.post(`${this.path}/login`, validationMiddleware(LoginDto), this.handleLogin);
          this.router.post(`${this.path}/logout`, this.handleLogout);
     }

     private handleRegistration = async(request: Request, response: Response, next: NextFunction) => {
          const userData: UserDto = request.body;
          try {
               const { cookie, user } = await this.authenticationService
                                                  .register(userData);

               response.setHeader("Set-Cookie", [cookie]);
               response.send(user);
          } catch (e) {
               next(e);
          }
     }

     private handleLogin = async(request: Request, response: Response, next: NextFunction) => {
          const loginData: LoginDto = request.body;
          
          const user = await this.userService
                                 .getUserByEmail(loginData.email);
          if (user) {
               const passwordIsMatch = await bcrypt.compare(
                    loginData.password,
                    user.password
               );
               if (passwordIsMatch) {
                    const secret = process.env.JWT_SECRET!
                    const tokenData = utils.createToken(user, secret);
                    const cookie = utils.createCookie(tokenData);

                    response.setHeader("Set-Cookie", [cookie]);
                    response.send(user);
               } else {
                    next(new WrongCredentialsException());
               }
          } else {
               next(new UserNotFoundException());
          }
     }

     private handleLogout = async (_: Request, response: Response) => {
          response.setHeader("Set-Cookie", ["Authorization=;Max-age=0"]);
          response.send(200);
     }
}

export default AuthenticationController;