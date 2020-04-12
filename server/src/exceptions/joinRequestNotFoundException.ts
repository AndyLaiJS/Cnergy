import HttpException from "./httpException";

export default class JoinRequestNotFoundException extends HttpException {
     constructor(context: string) {
          super(401, `No join ${context} request entry found.`);
     }
}