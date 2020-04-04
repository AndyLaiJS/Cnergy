import HttpException from "./httpException";

export default class WrongCredentialsException extends HttpException {
     constructor() {
          super(401, `Wrong credentials provided`);
     }
}