import { Request, Response, Router, NextFunction } from "express";

import ClubService from "../services/clubService";
import UserService from "../services/userService";
import Controller from "../interfaces/controllerInterface";
import RequestWithUser from "../interfaces/requestWithUserInterface";
import User from "../interfaces/userInterface";
import ClubRequestDto from "../dtos/clubRequestDto";
import CreateClubDto from "../dtos/createClubDto";
import JoinClubDto from "../dtos/joinClubDto";
import UpdateClubDto from "../dtos/updateClubDto";
import UnauthorizedException from "../exceptions/unauthorizedException";
import UserHasSignedUpException from "../exceptions/userHasSignedUpException";
import UserHasNotSignedUpException from "../exceptions/userHasNotSignedUpException";
import UserHasJoinedException from "../exceptions/userHasJoinedException";
import JoinRequestNotFoundException from "../exceptions/joinRequestNotFoundException";

import authenticationMiddleware from "../middlewares/authenticationMiddleware";
import validationMiddleware from "../middlewares/validationMiddleware";

class ClubController implements Controller {
     public path = "/club";
     public context = "club";
     public router = Router();
     public clubService = new ClubService();
     private userService = new UserService();

     constructor() {
          this.initRoutes();
     }

     private initRoutes() {
          this.router
              .all(`${this.path}`, authenticationMiddleware)
              .get(`${this.path}`, this.getClubs)
              .post(`${this.path}`, validationMiddleware(CreateClubDto), this.createClub)
              .patch(`${this.path}`, validationMiddleware(UpdateClubDto), this.updateClubInfo)
     
          this.router
              .get(`${this.path}/members`, authenticationMiddleware, this.getClubMembers);

          this.router
              .all(`${this.path}/join`, authenticationMiddleware)
              .post(`${this.path}/join`, validationMiddleware(JoinClubDto), this.joinClub)  
              .delete(`${this.path}/join`, this.cancelJoinClub)
    
          this.router
              .get(`${this.path}/pending`, authenticationMiddleware, this.getPendingClubRequests); 
          this.router
              .delete(`${this.path}/reject`, authenticationMiddleware, validationMiddleware(ClubRequestDto), this.rejectJoinClubRequest); 
          this.router
              .post(`${this.path}/accept`, authenticationMiddleware, validationMiddleware(ClubRequestDto), this.acceptJoinClubRequest); 
     }

     /**
      * GET /club
      * 
      * getClubs() allow users to view registered clubs
      */
     private getClubs = async(request: Request, response: Response, next: NextFunction) => {
          try {
               const clubs = await this.clubService
                                       .getClubs();
               response.send(clubs);
          } catch(e) {
               next(e);
          }
     }

     /**
      * POST /club
      * 
      * createClub() allow user to create a club.
      * By default, the creator of the club is the president
      */
     private createClub = async (request: RequestWithUser, response: Response, next: NextFunction) => {
          const president: User = request.user;
          const clubInfo: CreateClubDto = request.body;

          try {
               // By default, the president of the club is the creator
               const result = await this.clubService
                                        .postClub(clubInfo, president);
               response.send(result);
          } catch(e) {
               next(e);
          }
     }

     /**
      * PATCH /club
      * 
      * updateClubInfo() allow the president of the club to update the club's info
      */
     private updateClubInfo = async (request: RequestWithUser, response: Response, next: NextFunction) => {
          const president: User = request.user;
          const updatedClubInfo: UpdateClubDto = request.body;

          // Only the president of the club can update the club info
          if (president.id == updatedClubInfo.president.id) {
               try {
                    await this.clubService
                              .updateClubInfo(updatedClubInfo);
                    response.send({
                         status: 200
                    });
               } catch(e) {
                    next(e);
               }
          } else {
               next(new UnauthorizedException());
          }
     }

     /**
      * POST /club/join
      * 
      * joinClub() allow users to sign up as the member of the club.
      * User should wait for the club president's confirmation
      */
     private joinClub = async (request: RequestWithUser, response: Response, next: NextFunction) => {
          const user: User = request.user;
          const joinClubInfo: JoinClubDto = request.body;

          const hasSignedUp = await this.clubService
                                        .getUserJoinClubCount(joinClubInfo.id, user.id);

          // If the user request is recorded, then he/she can't request to join the club again
          if (hasSignedUp != 0) {
               next(new UserHasSignedUpException(this.context));
          } else {
               try {
                    await this.clubService
                              .postUserJoinClub(joinClubInfo, user.id);
                    response.send({
                         message: "You have successfully signed up for this club. Please wait for the confirmation",
                         status: 200
                    })
               } catch(e) {
                    next(e);    
               }
          }
     }

     /**
      * DELETE /club/join
      * 
      * cancelJoinClub() allow user to cancel the his/her signup request
      */
     private cancelJoinClub = async (request: RequestWithUser, response: Response, next: NextFunction) => {
          const user: User = request.user;
          const clubInfo: JoinClubDto = request.body;

          const hasSignedUp = await this.clubService
                                        .getUserJoinClubCount(clubInfo.id, user.id);
          if (hasSignedUp == 0) {
               // User has not signed up for the club, thus can't cancel the request
               next(new UserHasNotSignedUpException(this.context));
          } else {
               try {
                    const hasJoined = await this.clubService
                                                .getUserHasJoinedClubStatus(clubInfo.id, user.id);
                    if (hasJoined) {
                         // User has joined the club, therefore can't cancel the request
                         next(new UserHasJoinedException(this.context));
                    } else {
                         await this.clubService
                                   .deleteUserJoinClub(clubInfo.id, user.id);

                         response.send({
                              message: "You have succesfully cancel your join request",
                              status: 200
                         });
                    }
               } catch(e) {
                    next(e);
               }
          }
     }

     /**
      * GET /club/pending
      * 
      * getPendingClubRequests() allow club president to check who signed up
      * as the member of the club and has not been accepted yet
      */
     private getPendingClubRequests = async (request: RequestWithUser, response: Response, next: NextFunction) => {
          const user: User = request.user;
          const results = await this.clubService
                                    .getPendingRequestsByUID(user);

          for (let i = 0; i < results.length; i ++) {
               results[i]["club"] = ( await this.clubService
                                                .getClubById(results[i].clubId) )!;
               results[i]["user"] = ( await this.userService
                                                .getUserInfoByUID(results[i].userId) )!;
          }

          response.send(results);
     }

     /**
      * DELETE /club/reject
      * 
      * rejectJoinClubRequest() allow club president to reject a sign up request from user
      */
     private rejectJoinClubRequest = async (request: RequestWithUser, response: Response, next: NextFunction) => {
          const user: User = request.user;
          const clubInfo: ClubRequestDto = request.body;
          const hasSignedUp = await this.clubService
                                        .getUserJoinClubCount(
                                             clubInfo.club.id,
                                             clubInfo.user.id
                                        );
          if (hasSignedUp == 0) {
               next(new JoinRequestNotFoundException(this.context));
          } else {
               const hasJoined = await this.clubService
                                           .getUserHasJoinedClubStatus(
                                                clubInfo.club.id,
                                                clubInfo.user.id
                                           );
               if (hasJoined) {
                    next(new UserHasJoinedException(this.context))
               } else {
                    await this.clubService
                              .deleteUserJoinClub(
                                   clubInfo.club.id,
                                   clubInfo.user.id
                              );
                    response.send({
                         message: "You have successfully rejecting club request",
                         status: 200
                    });          
               }
          }
     }

     /**
      * POST /club/accept
      * 
      * acceptJoinClubRequest() allow club president to accept a sign up request from user
      */
     private acceptJoinClubRequest = async (request: RequestWithUser, response: Response, next: NextFunction) => {
          const clubInfo: ClubRequestDto = request.body;
          const hasSignedUp = await this.clubService
                                        .getUserJoinClubCount(
                                             clubInfo.club.id,
                                             clubInfo.user.id
                                        );
          if (hasSignedUp == 0) {
               next(new JoinRequestNotFoundException(this.context))
          }
           else {
               const hasJoined = await this.clubService
                                           .getUserHasJoinedClubStatus(
                                                clubInfo.club.id,
                                                clubInfo.user.id
                                           );
               if (hasJoined) {
                    next(new UserHasJoinedException(this.context))
               } else {
                    await this.clubService
                              .updateUserHasJoinedClubStatus(
                                   clubInfo.club.id,
                                   clubInfo.user.id
                              );
                    response.send({
                         message: "You have successfully accepting club request",
                         status: 200
                    })
               }
          }
     }

     /**
      * GET /club/members
      * 
      * getClubMembers() allow user to view all members in a specific club
      */
     private getClubMembers = async (request: Request, response: Response, next: NextFunction) => {
          const clubId = request.body["id"];

          try {
               const members = await this.clubService
                                         .getClubMembers(clubId);
               response.send(members);
          } catch(e) {
               next(e);
          }
     }
}

export default ClubController;