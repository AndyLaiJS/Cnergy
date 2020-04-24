import HttpException from "./httpException";

export default class UserHasJoinedActivityException extends HttpException {
     constructor(context: string) {
          super(400, `You have joined the ${context}`);
     }
}