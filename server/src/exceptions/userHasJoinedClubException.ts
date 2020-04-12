import HttpException from "./httpException";

export default class UserHasJoinedClubException extends HttpException {
     constructor() {
          super(400, `You have joined the club`);
     }
}