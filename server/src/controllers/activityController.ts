import { Router, Request, Response, NextFunction } from "express";

import ActivityService from "../services/activityService";
import UserService from "../services/userService";
import RequestWithUser from "../interfaces/requestWithUserInterface";
import Controller from "../interfaces/controllerInterface";
import ActivityDto from "../dtos/createActivityDto";
import UpdateActivityDto from "../dtos/updateActivityDto";
import JoinActivityDto from "../dtos/joinActivityDto";
import UnauthorizedException from "../exceptions/unauthorizedException";
import UserHasSignedUpActivityException from "../exceptions/userHasSignedUpActivityException";
import UserHasNotSignedUpActivityException from "../exceptions/userHasNotSignedUpActivityException";
import UserHasJoinedActivityException from "../exceptions/userHasJoinedActivityException";
import JoinActivityRequestNotFoundException from "../exceptions/joinActivityRequestNotFoundException";

import authenticationMiddleware from "../middlewares/authenticationMiddleware";
import validationMiddleware from "../middlewares/validationMiddleware";
import utils from "../utils";

class ActivityController implements Controller {
     public path = "/activity";
     public router = Router();
     private activityService = new ActivityService();
     private userService = new UserService();

     constructor() {
          this.initRoutes();
     }

     private initRoutes() {
          this.router
              .all(`${this.path}`, authenticationMiddleware)
              .get(`${this.path}`, this.getAllActivities)
              .post(`${this.path}`, validationMiddleware(ActivityDto), this.createActivity)
              .patch(`${this.path}`, this.updateUserActivity);

          this.router
              .all(`${this.path}/join`, authenticationMiddleware)
              .post(`${this.path}/join`, this.joinActivity)
              .delete(`${this.path}/join`, this.cancelJoinActivity);

          this.router
              .post(`${this.path}/accept`, authenticationMiddleware, this.acceptActivityRequest);
          this.router
              .delete(`${this.path}/reject`, authenticationMiddleware, validationMiddleware(JoinActivityDto), this.rejectActivityRequest);
          this.router
              .get(`${this.path}/pending`, authenticationMiddleware, validationMiddleware(JoinActivityDto), this.getPendingActivityRequests);
     }

     // TODO: Should not return finished activities.
     // getAllActivities() allow all users to view on-going activities
     // if SID is passed to the query, then it should return all activities created by the user with the corresponding SID
     // else, it will return all on-going activities.
     private getAllActivities = async (request: Request, response: Response, next: NextFunction) => {
          const userSid = request.query["sid"];

          try {
               let activities;
               if (userSid) {
                    const userEmail = utils.getEmail(userSid);
                    activities = await this.activityService
                                           .getActivitiesByUserEmail(userEmail);
               } else {
                    activities = await this.activityService
                                           .getAllActivities();
               }
               response.send({
                    activities: activities
               });

          } catch(e) {
               next(e);
          }
     }

     // createActivity() allow user to create an activity
     private createActivity = async (request: RequestWithUser, response: Response, next: NextFunction) => {
          const activityData: ActivityDto = request.body;
          const creator = request.user;
          try {
               const result = await this.activityService
                                        .postActivity(activityData, creator);
               response.send(result);
          } catch(e) {
               next(e);
          }
     }

     // updateUserActivity() allow user to update the activity's specification
     private updateUserActivity = async (request: RequestWithUser, response: Response, next: NextFunction) => {
          const creator = request.user;
          const activityData: UpdateActivityDto = request.body;

          // Only the creator of the activity can update the activity field
          if (creator.id == activityData.creator.id) {
               try {
                    const result = await this.activityService
                                             .updateActivity(activityData);
                    response.send(result);
               } catch(e) {
                    next(e);
               }
          } else {
               next(new UnauthorizedException());
          }
     }

     // joinActivity() allow users to join an activity.
     // If the activity is for "public", then the user will automatically signed up
     // If the activity is for "private", then the user shall wait for the activity's creator permission
     private joinActivity = async (request: RequestWithUser, response: Response, next: NextFunction) => {
          const user = request.user;
          const activityData: ActivityDto = request.body;

          const hasSignedUp = await this.activityService
                                        .getJoinActivityCount(activityData.id, user.id);

          // If the user request is recorded, then he/she can't request to join the activity again
          if (hasSignedUp != 0) {
               next(new UserHasSignedUpActivityException());
          } else {
               try {
                    await this.activityService
                              .postUserJoinActivity(activityData, user);
                    
                    var additionalMsg: string = "";
                    if (activityData.type == "Private") {
                         additionalMsg = " Please wait for the confirmation from the activity creator";
                    } else {
                         await this.activityService
                                   .updateActivityParticipantsCount(activityData.id, 1);
                    }

                    response.send({
                         message: `You have successfully signed up for the activity.${additionalMsg}`,
                         status: 200
                    });
                    
               } catch(e) {
                    next(e);
               }
          }
     }

     // cancelJoinActivity() allow user to cancel the activity that he/she signed up for
     private cancelJoinActivity = async (request: RequestWithUser, response: Response, next: NextFunction) => {
          const user = request.user;
          const activityData: ActivityDto = request.body;

          const hasSignedUp = await this.activityService
                                        .getJoinActivityCount(activityData.id, user.id);
          if (hasSignedUp == 0) {
               next(new UserHasNotSignedUpActivityException())
          } else {
               try {
                    const hasApproved = await this.activityService
                                                  .getUserJoinActivityHasApprovedStatus(activityData.id, user.id);

                    await this.activityService
                              .deleteUserJoinActivity(activityData.id, user.id);
                         
                    if ( activityData.type == "Public" || (
                         activityData.type == "Private" && hasApproved
                    )) {
                         await this.activityService
                                   .updateActivityParticipantsCount(activityData.id, -1);
                    }
                    response.send({
                         message: "You have successfully unregistered the activity",
                         status: 200
                    });

               } catch(e) {
                    next(e);
               }
          }
     }

     // getPendingActivityRequests() allow activity creator to check
     // who signed up to the activity and has not been accepted yet
     private getPendingActivityRequests = async (request: RequestWithUser, response: Response) => {
          const user = request.user;
          const results = await this.activityService
                                    .getPendingRequestByUID(user);

          for (let i = 0; i < results.length; i ++) {
               results[i]["activity"] = ( await this.activityService
                                                    .getActivityById(results[i].activityId) )!;
               results[i]["user"] = ( await this.userService
                                                .getUserNameByUID(results[i].userId) )!;
          }

          response.send(results);
     }

     // rejectActivityRequest() allow activity creator to reject a join request from different user
     private rejectActivityRequest = async (request: Request, response: Response, next: NextFunction) => {
          const activityData: JoinActivityDto = request.body;
          const hasSignedUp = await this.activityService
                                        .getJoinActivityCount(activityData.activityId,
                                                              activityData.userId);

          // No joinActivity record is found
          if (hasSignedUp == 0) {
               next(new JoinActivityRequestNotFoundException());
          } else {
               const hasApproved = await this.activityService
                                             .getUserJoinActivityHasApprovedStatus(
                                                  activityData.activityId,
                                                  activityData.userId
                                             );
               if (hasApproved) {
                    next(new UserHasJoinedActivityException());
               } else {
                    await this.activityService
                              .deleteUserJoinActivity(activityData.activityId,
                                                      activityData.userId);
                    response.send({
                         message: "You have successfully rejecting activity request",
                         status: 200
                    });
               }
          }
     }

     // acceptActivityRequest() allow activity creator to accept a join request from different user
     private acceptActivityRequest = async (request: Request, response: Response, next: NextFunction) => {
          const activityData: JoinActivityDto = request.body;
          const hasSignedUp = await this.activityService
                                        .getJoinActivityCount(activityData.activityId,
                                                              activityData.userId);

          // No joinActivity record is found
          if (hasSignedUp == 0) {
               next(new JoinActivityRequestNotFoundException());
               // Throw error
          } else {
               const hasApproved = await this.activityService
                                             .getUserJoinActivityHasApprovedStatus(
                                                  activityData.activityId,
                                                  activityData.userId);
               if (hasApproved == false) {
                    await this.activityService
                              .updateJoinActivityApprovedStatus(activityData.activityId, activityData.userId);
                    await this.activityService
                              .updateActivityParticipantsCount(activityData.activityId, 1);

                    response.send({
                         message: "You have successfully accepting activity request",
                         status: 200
                    });
               } else {
                    next(new UserHasJoinedActivityException());
               }
          }
     }
}

export default ActivityController;