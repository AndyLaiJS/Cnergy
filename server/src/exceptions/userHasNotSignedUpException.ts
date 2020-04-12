import HttpException from "./httpException";

export default class UserHasNotSignedUpException extends HttpException {
     constructor(message: string) {
          super(400, `You have not signed up for this ${message}`);
     }
}