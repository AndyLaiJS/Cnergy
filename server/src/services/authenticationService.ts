import * as bcrypt from "bcrypt";
import { getRepository } from "typeorm";

import { User } from "../entity/User";
import UserDto from "../dtos/userDto";

import UserService from "./userService";
import UserWithEmailExistsException from "../exceptions/userWithSameEmailExistsException";
import utils from "../utils";

class AuthenticationService {
     private userService = new UserService();

     public register = async (userData: UserDto) => {
          const userHasExisted = await this.userService
                                   .getUserByEmail(userData.email);
          if (userHasExisted) {
               throw new UserWithEmailExistsException(userData.email);
          }
          // TODO: Implement SendEmailVerification

          const hashedPassword = await bcrypt.hash(userData.password, 10);
          const user = await this.userService
                              .insertUser(userData, hashedPassword);
          user.password = "";

          const secret = process.env.JWT_SECRET!
          const tokenData = utils.createToken(user, secret);
          const cookie = utils.createCookie(tokenData);
          
          return { cookie, user };
     }
}

export default AuthenticationService;