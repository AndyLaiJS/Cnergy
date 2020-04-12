import HttpException from "./httpException";

export default class UserHasJoinedActivityException extends HttpException {
     constructor(context: string) {
          super(400, `The selected user has joined the ${context}`);
     }
}