import HttpException from "./httpException";

export default class UserHasSignedUpException extends HttpException {
     constructor(context: string) {
          super(400, `You have signed up for this ${context}. Please wait for confirmation`);
     }
}