import HttpException from "./httpException";

class WrongParameterException extends HttpException {
     constructor() {
          super(400, `Wrong parameter, please input a different parameter`);
     }
}

export default WrongParameterException;