import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";

import { User } from "../entity/User";
import DataStoredInToken from "../interfaces/dataStoredInTokenInterface";

import WrongAuthenticationTokenException from "../exceptions/wrongAuthenticationTokenException";
import MissingAuthenticationTokenException from "../exceptions/missingAuthenticationTokenException";
import SessionHasExpiredException from "../exceptions/sessionHasExpiredException";
import RequestWithUser from "src/interfaces/requestWithUserInterface";

async function authenticationMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
     const cookies = request.cookies;
     const userRepository = getRepository(User);

     if (cookies && cookies.Authorization) {
          const secret = process.env.JWT_SECRET!;
          try {
               const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
               const id = verificationResponse.id;
               const user = await userRepository.findOne({
                    id: id
               });
               if (user) {
                    request.user = user;
                    next();
               } else {
                    next(new WrongAuthenticationTokenException());
               }
          } catch(e) {
               next(new SessionHasExpiredException());
          }
     } else {
          next(new MissingAuthenticationTokenException());
     }
}

export default authenticationMiddleware;
