import HttpException from "./httpException";

export default class UserHasSignedUpActivityException extends HttpException {
     constructor() {
          super(400, `You have signed up for this activity. Please wait for confirmation`);
     }
}