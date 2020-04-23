import HttpException from "./httpException";

export default class ClubNotFoundException extends HttpException {
     constructor() {
          super(404, `Club not found`);
     }
}