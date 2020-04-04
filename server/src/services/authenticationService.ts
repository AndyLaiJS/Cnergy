import * as bcrypt from "bcrypt";
import { getRepository } from "typeorm";

import { User } from "../entity/User";
import UserDto from "../dtos/userDto";

import UserWithEmailExistsException from "../exceptions/userWithSameEmailExistsException";
import utils from "../utils";

class AuthenticationService {
     private userRepository = getRepository(User);

     public register = async (userData: UserDto) => {
          if (await this.userRepository.findOne({
               email: userData.email
          })) {
               throw new UserWithEmailExistsException(userData.email);
          }
          // TODO: Implement SendEmailVerification

          const hashedPassword = await bcrypt.hash(userData.password, 10);
          const user = this.userRepository.create({
               ...userData,
               password: hashedPassword
          });

          await this.userRepository.save(user);
          user.password = "";

          const secret = process.env.JWT_SECRET!
          const tokenData = utils.createToken(user, secret);
          const cookie = utils.createCookie(tokenData);
          
          return { cookie, user };
     }
}

export default AuthenticationService;