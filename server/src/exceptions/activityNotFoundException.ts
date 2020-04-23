import HttpException from "./httpException";

export default class ActivityNotFoundException extends HttpException {
     constructor() {
          super(404, `Activity not found`);
     }
}