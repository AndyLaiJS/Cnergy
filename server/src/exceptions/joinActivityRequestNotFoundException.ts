import HttpException from "./httpException";

export default class JoinActivityRequestNotFoundException extends HttpException {
     constructor() {
          super(401, "No join activity request entry found.");
     }
}