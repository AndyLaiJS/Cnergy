import HttpException from "./httpException";

export default class UserWithEmailExistsException extends HttpException {
     constructor(email: string) {
          super(400, `User with email ${email} already exists, please register with different email`);
     }
}