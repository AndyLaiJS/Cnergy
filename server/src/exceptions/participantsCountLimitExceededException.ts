import HttpException from "./httpException";

export default class ParticipantsCountLimitExceededException extends HttpException {
     constructor() {
          super(400, `Participants count exceeds the limit`);
     }
}