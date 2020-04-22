import HttpException from "./httpException";

export default class CreatorLeaveActivityException extends HttpException {
     constructor() {
          super(403, `Creator of the activity should not leave the activity`);
     }
}