import * as express from "express";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";

import HttpException from "../exceptions/httpException";

function validationMiddleware(type: any): express.RequestHandler {
     return (request, _, next) => {
          validate(plainToClass(type, request.body))
               .then((errors: ValidationError[]) => {
                    if (errors.length > 0) {
                         const message = errors.map((error: ValidationError) =>
                              Object.values(error.constraints)).join(",");

                         next(new HttpException(400, message));
                    } else {
                         next();
                    }
               });
     };
}

export default validationMiddleware;