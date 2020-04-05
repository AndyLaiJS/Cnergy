import HttpException from "./httpException";

export default class MissingAuthenticationTokenException extends HttpException {
     constructor() {
          super(401, `Authentication token missing`);
     }
}