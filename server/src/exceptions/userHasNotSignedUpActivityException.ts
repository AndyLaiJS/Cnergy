import HttpException from "./httpException";

export default class UserHasNotSignedUpActivityException extends HttpException {
     constructor() {
          super(400, `You have not signed up for this activity`);
     }
}