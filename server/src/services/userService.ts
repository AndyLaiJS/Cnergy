import { getRepository } from "typeorm";
import { User } from "../entity/User";
import UserDto from "src/dtos/userDto";

class UserService {
     private userRepository = getRepository(User);

     public getUserNameByUID = async (userId: string) => {
          const user = await this.userRepository
                              .findOne({
                                   where: { id: userId }
                              });
          return user;
     }

     public getUserByEmail = async (userEmail: string) => {
          const user = await this.userRepository
                              .findOne({
                                   email: userEmail
                              });
          return user;
     }

     public insertUser = async (userData: UserDto, hashedPassword: string) => {
          const user = await this.userRepository
                              .create({
                                   ...userData,
                                   password: hashedPassword
                              })
                              .save();
          return user;
     }
}

export default UserService;