import HttpException from "./httpException";

export default class UserNotFoundException extends HttpException {
     constructor() {
          super(404, `User not found, please register beforehand`);
     }
}