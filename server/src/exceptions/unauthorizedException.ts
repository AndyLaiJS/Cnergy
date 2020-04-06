import HttpException from "./httpException";

export default class UnauthorizedException extends HttpException {
     constructor() {
          super(401, `You are not authorized to perform this action.`);
     }
}