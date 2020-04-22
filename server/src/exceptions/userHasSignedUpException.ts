import HttpException from "./httpException";

export default class UserHasSignedUpException extends HttpException {
     constructor(context: string, hasApproved: boolean) {
          const additionalMsg: string = hasApproved
               ?    ""
               :    " Please wait for confirmation";

          super(400, `You have signed up for this ${context}.${additionalMsg}`);
     }
}