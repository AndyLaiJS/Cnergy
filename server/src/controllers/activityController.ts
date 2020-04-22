import { Router, Request, Response, NextFunction } from "express";

import ActivityService from "../services/activityService";
import UserService from "../services/userService";
import RequestWithUser from "../interfaces/requestWithUserInterface";
import Controller from "../interfaces/controllerInterface";
import User from "../interfaces/userInterface";
import ActivityRequestDto from "../dtos/activityRequestDto";
import CreateActivityDto from "../dtos/createActivityDto";
import UpdateActivityDto from "../dtos/updateActivityDto";
import JoinActivityDto from "../dtos/joinActivityDto";
import CreatorLeaveActivityException from "../exceptions/creatorLeaveActivityExceptions";
import UnauthorizedException from "../exceptions/unauthorizedException";
import UserHasSignedUpException from "../exceptions/userHasSignedUpException";
import UserHasNotSignedUpException from "../exceptions/userHasNotSignedUpException";
import UserHasJoinedException from "../exceptions/userHasJoinedException";
import JoinRequestNotFoundException from "../exceptions/joinRequestNotFoundException";

import validationMiddleware from "../middlewares/validationMiddleware";
import utils from "../utils";

class ActivityController implements Controller {
     public path = "/activity";
     public context = "activity";
     public router = Router();
     private activityService = new ActivityService();
     private userService = new UserService();

     constructor() {
          this.initRoutes();
     }

     private initRoutes() {
          this.router
              .get(`${this.path}`, this.getAllOngoingActivities)
              .post(`${this.path}`, validationMiddleware(CreateActivityDto), this.createActivity)
              .put(`${this.path}`, this.updateUserActivity);

          this.router
              .get(`${this.path}/past`, this.getAllPastActivities)

          this.router
              .get(`${this.path}/join`, this.getJoinedActivities)
              .post(`${this.path}/join`, this.joinActivity)
              .delete(`${this.path}/join`, this.cancelJoinActivity);

          this.router
              .post(`${this.path}/accept`, this.acceptActivityRequest);
          this.router
              .delete(`${this.path}/reject`, validationMiddleware(ActivityRequestDto), this.rejectActivityRequest);
          this.router
              .get(`${this.path}/pending`, validationMiddleware(JoinActivityDto), this.getPendingActivityRequests);
     }

     /**
      * GET /activity?sid=...
      * 
      * getAllOngoingActivities() allow all users to view on-going activities
      * 
      * If SID is passed to the query, then it should return all activities created by the user with the corresponding SID
      * else, it will return all on-going activities.
      */
     private getAllOngoingActivities = async (request: Request, response: Response, next: NextFunction) => {
          const userSid = request.query["sid"];
          const timestamp = utils.getCurrentTimestamp();

          try {
               let activities;
               if (userSid) {
                    const userEmail = utils.getEmail(userSid);
                    activities = await this.activityService
                                           .getActivitiesByEmailAndTimestamp(userEmail, timestamp);
               } else {
                    activities = await this.activityService
                                           .getActivitiesByTimestamp(timestamp);
               }
               response.send({
                    activities: activities
               });

          } catch(e) {
               next(e);
          }
     }

     /**
      * GET /activity/past?sid=...
      * 
      * getAllPastActivities() allow all users to view past activities
      * 
      * If SID is passed to the query, then it should return all activities created by the user with the corresponding SID
      * else, it will return all past activities.
      */
     private getAllPastActivities = async (request: Request, response: Response, next: NextFunction) => {
          const userSid = request.query["sid"];
          const timestamp = utils.getCurrentTimestamp();

          try {
               let activities;
               if (userSid) {
                    const userEmail = utils.getEmail(userSid);
                    activities = await this.activityService
                                           .getActivitiesByEmailAndTimestamp(userEmail, timestamp, "<");
               } else {
                    activities = await this.activityService
                                           .getActivitiesByTimestamp(timestamp, "<");
               }
               response.send({
                    activities: activities
               });

          } catch(e) {
               next(e);
          }
     }

     /**
      * POST /activity?uid=...
      * 
      * createActivity() allow user to create an activity
      */
     private createActivity = async (request: Request, response: Response, next: NextFunction) => {
          const uid: string = request.query["uid"];
          const creator = await this.userService
                                    .getUserInfoByUID(uid) as User;
          const activityData: CreateActivityDto = request.body;

          try {
               const result = await this.activityService
                                        .postActivity(activityData, creator);
               response.send(result);
          } catch(e) {
               next(e);
          }
     }

     /**
      * PUT /activity?uid=...
      * 
      * updateUserActivity() allow user to update the activity's specification
      */
     private updateUserActivity = async (request: Request, response: Response, next: NextFunction) => {
          const uid: string = request.query["uid"];
          const creator = await this.userService
                                    .getUserInfoByUID(uid) as User;
          const activityData: UpdateActivityDto = request.body;

          // // Only the creator of the activity can update the activity field
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

     /**
      * POST /activity/join?uid=...
      * 
      * joinActivity() allow users to join an activity.
      * 
      * If the activity is for "Public", then the user will automatically signed up
      * If the activity is for "Private", then the user shall wait for the activity's creator permission
      * By default, the activity type is "Public"
      */
     private joinActivity = async (request: Request, response: Response, next: NextFunction) => {
          const uid: string = request.query["uid"];
          const user = await this.userService
                                 .getUserInfoByUID(uid) as User;

          const activityData: JoinActivityDto = request.body;
          const hasSignedUp = await this.activityService
                                        .getJoinActivityCount(activityData.id, user.id);
          const type = await this.activityService
                                   .getActivityTypeById(activityData.id);

          let hasApproved: boolean = true;
          if (type == "Private") {
               hasApproved = false;
          }

          // If the user request is recorded, then he/she can't request to join the activity again
          if (hasSignedUp != 0) {
               next(new UserHasSignedUpException(this.context, hasApproved));
               return;
          }

          try {
               await this.activityService
                         .postUserJoinActivity(activityData.id, user.id, hasApproved);

               let additionalMsg: string = (type == "Private")
                    ?    " Please wait for the confirmation from the activity creator"
                    :    ""
               if (additionalMsg.length == 0) {
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

     /**
      * DELETE /activity/join?uid=...
      * 
      * cancelJoinActivity() allow user to cancel the activity that he/she signed up for
      */
     private cancelJoinActivity = async (request: Request, response: Response, next: NextFunction) => {
          const uid: string = request.query["uid"];
          const user = await this.userService
                                    .getUserInfoByUID(uid) as User;

          const activityData: JoinActivityDto = request.body;
          const hasSignedUp = await this.activityService
                                        .getJoinActivityCount(activityData.id, user.id);
          if (hasSignedUp == 0) {
               next(new UserHasNotSignedUpException(this.context))
          } else {
               try {
                    const creator = await this.userService
                                              .getActivityCreatorByActivityId(activityData.id);
                    if (uid == creator?.id) {
                         next(new CreatorLeaveActivityException());
                         return;
                    }

                    const hasApproved = await this.activityService
                                                  .getUserJoinActivityHasApprovedStatus(activityData.id, user.id);
                    const type = await this.activityService
                                           .getActivityTypeById(activityData.id);

                    await this.activityService
                              .deleteUserJoinActivity(activityData.id, user.id);
                         
                    if ( type == "Public" || (
                         type == "Private" && hasApproved
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

     /**
      * GET /activity/join?uid=...
      * 
      * getJoinedActivities() allow user to check 
      * which activities he/she has successfully signedup
      */
     private getJoinedActivities = async (request: Request, response: Response, next: NextFunction) => {
          const uid: string = request.query["uid"];
          const user = await this.userService
                                 .getUserInfoByUID(uid) as User;
          const activities = await this.activityService
                                       .getUserHasJoinedActvities(user.id);
                            
          response.send(activities);
     }

     /**
      * GET /activity/pending?uid=...
      * 
      * getPendingActivityRequests() allow activity creator to check
      * who signed up to the activity and has not been accepted yet
      */
     private getPendingActivityRequests = async (request: Request, response: Response) => {
          const uid: string = request.query["uid"];
          const user = await this.userService
                                    .getUserInfoByUID(uid) as User;
          const results = await this.activityService
                                    .getPendingRequestByUID(user.id);

          for (let i = 0; i < results.length; i ++) {
               results[i]["activity"] = ( await this.activityService
                                                    .getActivityById(results[i].activityId) )!;
               results[i]["user"] = ( await this.userService
                                                .getUserInfoByUID(results[i].userId) )!;
          }
          response.send(results);
     }

     /**
      * DELETE /activity/reject
      * 
      * rejectActivityRequest() allow activity creator to reject a join request from different user
      */
     private rejectActivityRequest = async (request: Request, response: Response, next: NextFunction) => {
          const activityData: ActivityRequestDto = request.body;
          const hasSignedUp = await this.activityService
                                        .getJoinActivityCount(
                                             activityData.activity.id,
                                             activityData.user.id
                                        );

          // No joinActivity record is found
          if (hasSignedUp == 0) {
               next(new JoinRequestNotFoundException(this.context));
          } else {
               const hasApproved = await this.activityService
                                             .getUserJoinActivityHasApprovedStatus(
                                                  activityData.activity.id,
                                                  activityData.user.id
                                             );
               if (hasApproved) {
                    next(new UserHasJoinedException(this.context));
               } else {
                    await this.activityService
                              .deleteUserJoinActivity(
                                   activityData.activity.id,
                                   activityData.user.id
                              );
                    response.send({
                         message: "You have successfully rejecting activity request",
                         status: 200
                    });
               }
          }
     }

     /**
      * POST /activity/accept
      * 
      * acceptActivityRequest() allow activity creator to accept a join request from different user
      */
     private acceptActivityRequest = async (request: Request, response: Response, next: NextFunction) => {
          const activityData: ActivityRequestDto = request.body;
          const hasSignedUp = await this.activityService
                                        .getJoinActivityCount(
                                             activityData.activity.id,
                                             activityData.user.id
                                        );

          // No joinActivity record is found
          if (hasSignedUp == 0) {
               next(new JoinRequestNotFoundException(this.context));
          } else {
               const hasApproved = await this.activityService
                                             .getUserJoinActivityHasApprovedStatus(
                                                  activityData.activity.id,
                                                  activityData.user.id
                                             );
               if (hasApproved == false) {
                    await this.activityService
                              .updateJoinActivityApprovedStatus(
                                   activityData.activity.id,
                                   activityData.user.id
                              );
                    await this.activityService
                              .updateActivityParticipantsCount(activityData.activity.id, 1);

                    response.send({
                         message: "You have successfully accepting activity request",
                         status: 200
                    });
               } else {
                    next(new UserHasJoinedException(this.context));
               }
          }
     }
}

export default ActivityController;