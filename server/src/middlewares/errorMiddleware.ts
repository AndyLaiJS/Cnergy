import HttpException from "../exceptions/httpException";
import { Response, Request, NextFunction } from "express";

function errorMiddleware(error: HttpException, _: Request, response: Response, next: NextFunction) {
     const status = error.status || 500;
     const message = error.message || "Internal error";
                                                                                                                         
     response
          .status(status)
          .send({
               message,
               status
          });
}
   
export default errorMiddleware;