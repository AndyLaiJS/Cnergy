import { Request, Response, Router, NextFunction } from "express";

import ClubService from "../services/clubService";
import UserService from "../services/userService";
import Controller from "../interfaces/controllerInterface";
import User from "../interfaces/userInterface";
import ClubRequestDto from "../dtos/clubRequestDto";
import CreateClubDto from "../dtos/createClubDto";
import JoinClubDto from "../dtos/joinClubDto";
import UpdateClubDto from "../dtos/updateClubDto";
import ClubNotFoundException from "../exceptions/clubNotFoundException";
import UnauthorizedException from "../exceptions/unauthorizedException";
import UserHasSignedUpException from "../exceptions/userHasSignedUpException";
import UserHasNotSignedUpException from "../exceptions/userHasNotSignedUpException";
import UserHasJoinedException from "../exceptions/userHasJoinedException";
import UserNotFoundException from "../exceptions/userNotFoundException";
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
              .get(`${this.path}`, this.getClubs)
              .post(`${this.path}`, validationMiddleware(CreateClubDto), this.createClub)
              .put(`${this.path}`, validationMiddleware(UpdateClubDto), this.updateClubInfo)
     
          this.router
              .get(`${this.path}/members`, this.getClubMembers);

          this.router
              .get(`${this.path}/join`, this.getJoinedClubs)
              .post(`${this.path}/join`, validationMiddleware(JoinClubDto), this.joinClub)  
              .delete(`${this.path}/join`, this.cancelJoinClub)
    
          this.router
              .get(`${this.path}/pending`, this.getPendingClubRequests); 
          this.router
              .post(`${this.path}/reject`, this.rejectJoinClubRequest); 
          this.router
              .post(`${this.path}/accept`, validationMiddleware(ClubRequestDto), this.acceptJoinClubRequest); 
     }

     /**
      * GET /club?uid=...
      * 
      * getClubs() allow users to view registered clubs
      * 
      * If UID is passed to the query, then it should return all clubs where the president's
      * UID is equal to the passed UID
      */
     private getClubs = async(request: Request, response: Response, next: NextFunction) => {
          const uid: string = request.query["uid"];
          
          try {
               let clubs;
               if (uid) {
                    const user = await this.userService
                                           .getUserInfoByUID(uid) as User;
                    if (user) {
                         clubs = await this.clubService
                                           .getClubsByPresidentId(user.id);
                    } else {
                         next(new UserNotFoundException());
                    }
               } else {
                    clubs = await this.clubService
                                      .getClubs();
               }
               response.send(clubs);
          } catch(e) {
               next(e);
          }
     }

     /**
      * POST /club?uid=...
      * 
      * createClub() allow user to create a club.
      * By default, the creator of the club is the president
      */
     private createClub = async (request: Request, response: Response, next: NextFunction) => {
          const uid: string = request.query["uid"];
          const president = await this.userService
                                      .getUserInfoByUID(uid) as User;
          const clubInfo: CreateClubDto = request.body;

          try {
               // By default, the president of the club is the creator
               const result = await this.clubService
                                        .postClub(clubInfo, president);
               const mockJoinData: JoinClubDto = {
                    id: result.id,
                    reason: "",
               };
               await this.clubService
                         .postUserJoinClub(mockJoinData, uid, true);
                         
               response.send({
                    message: "You have successfully created a club",
                    status: 200
               });
          } catch(e) {
               next(e);
          }
     }

     /**
      * PUT /club?uid=...
      * 
      * updateClubInfo() allow the president of the club to update the club's info
      */
     private updateClubInfo = async (request: Request, response: Response, next: NextFunction) => {
          const uid: string = request.query["uid"];
          const updatedClubInfo: UpdateClubDto = request.body;

          const users = await this.clubService
                                  .getClubPresident(updatedClubInfo.id);
          if (users.length == 0) {
               next(new ClubNotFoundException());
               return;
          }

          const presidentId = users[0].presidentId;

          // Only the president of the club can update the club info
          if (presidentId == uid) {
               try {
                    await this.clubService
                              .updateClubInfo(updatedClubInfo);
                    response.send({
                         message: "You have successfully update the club description",
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
      * POST /club/join?uid=...
      * 
      * joinClub() allow users to sign up as the member of the club.
      * User should wait for the club president's confirmation
      */
     private joinClub = async (request: Request, response: Response, next: NextFunction) => {
          const uid: string = request.query["uid"];
          const user = await this.userService
                                 .getUserInfoByUID(uid) as User;

          const joinClubInfo: JoinClubDto = request.body;
          const hasSignedUp = await this.clubService
                                        .getUserJoinClubCount(joinClubInfo.id, user.id);

          const isPresident = await this.clubService
                                        .getUserIsPresidentStatus(joinClubInfo.id, user.id);

          // Prevent the president to request joining the club
          if (isPresident) {
               next(new UnauthorizedException());
               return;
          }

          // If the user request is recorded, then he/she can't request to join the club again
          if (hasSignedUp != 0) {
               const hasJoined = await this.clubService
                                           .getUserHasJoinedClubStatus(joinClubInfo.id, user.id) || false;

               next(new UserHasSignedUpException(this.context, hasJoined));
               return;
          }

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

     /**
      * DELETE /club/join?uid=...
      * 
      * cancelJoinClub() allow user to cancel the his/her signup request
      */
     private cancelJoinClub = async (request: Request, response: Response, next: NextFunction) => {
          const uid: string = request.query["uid"];
          const user = await this.userService
                                 .getUserInfoByUID(uid) as User;
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
      * GET /club/join?uid=...
      * 
      * getJoinedClubs() allow user to check which clubs he has been accepted
      */
     private getJoinedClubs = async (request: Request, response: Response, next: NextFunction) => {
          const uid: string = request.query["uid"];
          try {
               const results = await this.clubService
                                         .getUserHasJoinedClubs(uid);
               response.send(results);
          } catch(e) {
               next(e);
          }
     }

     /**
      * GET /club/pending?uid=...&cid=...
      * 
      * getPendingClubRequests() allow club president to check who signed up
      * as the member of the club and has not been accepted yet
      */
     private getPendingClubRequests = async (request: Request, response: Response, next: NextFunction) => {
          const uid: string = request.query["uid"];
          const clubId: number = request.query["cid"];          

          const results = await this.clubService
                                    .getClubPresident(clubId);
          if (results.length == 0) {
               next(new ClubNotFoundException());
               return;
          }

          // Only the creator of the activity can view the activity pending requests
          const presidentId = results[0].presidentId;
          if (presidentId == uid) {
               const users = await this.clubService
                                       .getClubPendingRequest(clubId);

               for (let i = 0; i < users.length; i ++) {
                    const reason = await this.clubService
                                             .getJoinClubReason(clubId, users[i].id);
                    users[i]["reason"] = reason;
               }
               response.send(users);

          } else {
               next(new UnauthorizedException());
          }
     }

     /**
      * POST /club/reject?uid=...
      * 
      * rejectJoinClubRequest() allow club president to reject a sign up request from user
      */
     private rejectJoinClubRequest = async (request: Request, response: Response, next: NextFunction) => {
          const uid: string = request.query["uid"];
          const joinRequest: ClubRequestDto = request.body;

          const results = await this.clubService
                                    .getClubPresident(joinRequest.clubId);
          if (results.length == 0) {
               next(new ClubNotFoundException());
               return;
          }

          // Only the president of the club can reject the pending requests
          const presidentId = results[0].presidentId;
          if (presidentId != uid) {
               next(new UnauthorizedException());
               return;
          }

          const hasSignedUp = await this.clubService
                                        .getUserJoinClubCount(
                                             joinRequest.clubId,
                                             joinRequest.userId
                                        );
          if (hasSignedUp == 0) {
               next(new JoinRequestNotFoundException(this.context));
               return;
          }

          const hasJoined = await this.clubService
                                      .getUserHasJoinedClubStatus(
                                           joinRequest.clubId,
                                           joinRequest.userId
                                      );
          if (hasJoined) {
               next(new UserHasJoinedException(this.context));
               return;
          }

          try {
               await this.clubService
                         .deleteUserJoinClub(
                              joinRequest.clubId,
                              joinRequest.userId
                         );
               response.send({
                    message: "You have successfully rejecting club request",
                    status: 200
               });
          } catch(e) {
               next(e);
          }
     }

     /**
      * POST /club/accept?uid=...
      * 
      * acceptJoinClubRequest() allow club president to accept a sign up request from user
      */
     private acceptJoinClubRequest = async (request: Request, response: Response, next: NextFunction) => {
          const uid: string = request.query["uid"];
          const joinRequest: ClubRequestDto = request.body;

          const results = await this.clubService
                                    .getClubPresident(joinRequest.clubId);
          if (results.length == 0) {
               next(new ClubNotFoundException());
               return;
          }

          // Only the president of the club can reject the pending requests
          const presidentId = results[0].presidentId;
          if (presidentId != uid) {
               next(new UnauthorizedException());
               return;
          }
          
          const hasSignedUp = await this.clubService
                                        .getUserJoinClubCount(
                                             joinRequest.clubId,
                                             joinRequest.userId
                                        );
          if (hasSignedUp == 0) {
               next(new JoinRequestNotFoundException(this.context));
               return;
          }

          const hasJoined = await this.clubService
                                      .getUserHasJoinedClubStatus(
                                           joinRequest.clubId,
                                           joinRequest.userId
                                      );
          if (hasJoined) {
               next(new UserHasJoinedException(this.context));
               return;
          }

          try {
               await this.clubService
                         .updateUserHasJoinedClubStatus(
                              joinRequest.clubId,
                              joinRequest.userId
                         );
               response.send({
                    message: "You have successfully accepting club request",
                    status: 200
               });
          } catch(e) {
               next(e);
          }          
     }

     /**
      * GET /club/members
      * 
      * getClubMembers() allow user to view all members in a specific club
      */
     private getClubMembers = async (request: Request, response: Response, next: NextFunction) => {
          const clubId = request.query["id"];

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