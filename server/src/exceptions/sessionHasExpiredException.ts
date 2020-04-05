import HttpException from "./httpException";

export default class SessionHasExpiredException extends HttpException {
     constructor() {
          super(401, `Session has expired, please login again.`);
     }
}