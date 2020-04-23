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
import ActivityNotFoundException from "../exceptions/activityNotFoundException";
import CreatorLeaveActivityException from "../exceptions/creatorLeaveActivityExceptions";
import ParticipantsCountLimitExceededException from "../exceptions/participantsCountLimitExceededException";
import UnauthorizedException from "../exceptions/unauthorizedException";
import UserHasSignedUpException from "../exceptions/userHasSignedUpException";
import UserHasNotSignedUpException from "../exceptions/userHasNotSignedUpException";
import UserHasJoinedException from "../exceptions/userHasJoinedException";
import JoinRequestNotFoundException from "../exceptions/joinRequestNotFoundException";

import validationMiddleware from "../middlewares/validationMiddleware";
import utils from "../utils";
import { Activity } from "src/entity/Activity";

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
              .put(`${this.path}`, validationMiddleware(UpdateActivityDto), this.updateUserActivity);

          this.router
              .get(`${this.path}/past`, this.getAllPastActivities)

          this.router
              .get(`${this.path}/join`, this.getJoinedActivities)
              .post(`${this.path}/join`, validationMiddleware(JoinActivityDto) ,this.joinActivity)
              .delete(`${this.path}/join`, this.cancelJoinActivity);

          this.router
              .post(`${this.path}/accept`, validationMiddleware(ActivityRequestDto), this.acceptActivityRequest);
          this.router
              .delete(`${this.path}/reject`, validationMiddleware(ActivityRequestDto), this.rejectActivityRequest);
          this.router
              .get(`${this.path}/pending`, validationMiddleware(JoinActivityDto), this.getPendingActivityRequests);
     }

     /**
      * GET /activity?uid=...
      * 
      * getAllOngoingActivities() allow all users to view on-going activities
      * 
      * If UID is passed to the query, then it should return all activities created by the user with the corresponding id
      * else, it will return all on-going activities.
      */
     private getAllOngoingActivities = async (request: Request, response: Response, next: NextFunction) => {
          const userId = request.query["uid"];
          const timestamp = utils.getCurrentTimestamp();

          try {
               let activities;
               if (userId) {
                    activities = await this.activityService
                                           .getActivitiesByUIDAndTimestamp(userId, timestamp);
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
      * GET /activity/past?uid=...
      * 
      * getAllPastActivities() allow all users to view past activities
      * 
      * If UID is passed to the query, then it should return all activities created by the user with the corresponding id
      * else, it will return all past activities.
      */
     private getAllPastActivities = async (request: Request, response: Response, next: NextFunction) => {
          const userId = request.query["uid"];
          const timestamp = utils.getCurrentTimestamp();

          try {
               let activities;
               if (userId) {
                    activities = await this.activityService
                                           .getActivitiesByUIDAndTimestamp(userId, timestamp, "<");
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

               // Activity creator join the activity by default
               await this.activityService
                         .postUserJoinActivity(result.id, creator.id);
               await this.activityService
                         .updateActivityParticipantsCount(result.id, 1);

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
          const activityData: UpdateActivityDto = request.body;

          const users = await this.activityService
                                  .getActivityCreatorId(activityData.id);
          if (users.length == 0) {
               next(new ActivityNotFoundException());
               return;
          }

          const creatorId = users[0].creatorId;

          // Only the creator of the activity can update the activity field
          if (creatorId == uid) {
               try {
                    await this.activityService
                              .updateActivityDescription(activityData);
                    response.send({
                         message: "You have successfully update the activity description",
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
          const activity = await this.activityService
                                     .getActivityById(activityData.id) as Activity;
          if (!activity) {
               next(new ActivityNotFoundException());
               return;
          }

          let hasApproved: boolean = true;
          if (activity.type == "Private") {
               hasApproved = false;
          }
          
          const hasSignedUp = await this.activityService
                                        .getJoinActivityCount(activityData.id, user.id);

          // If the user request is recorded, then he/she can't request to join the activity again
          if (hasSignedUp != 0) {
               next(new UserHasSignedUpException(this.context, hasApproved));
               return;
          }
          if (activity.participantsCount == activity.maxParticipants) {
               next(new ParticipantsCountLimitExceededException());
               return;
          }
          
          try {
               await this.activityService
                         .postUserJoinActivity(activityData.id, user.id, hasApproved);

               let additionalMsg: string = (activity.type == "Private")
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
          try {
               const activities = await this.activityService
                                            .getUserHasJoinedActvities(uid);
               response.send(activities);
          } catch(e) {
               next(e);
          }                            
     }

     /**
      * GET /activity/pending?uid=...
      * 
      * getPendingActivityRequests() allow activity creator to check
      * who signed up to the activity and has not been accepted yet
      */
     private getPendingActivityRequests = async (request: Request, response: Response, next: NextFunction) => {
          const uid: string = request.query["uid"];
          const activityData: JoinActivityDto = request.body;

          const results = await this.activityService
                                    .getActivityCreatorId(activityData.id);
          if (results.length == 0) {
               next(new ActivityNotFoundException());
               return;
          }

          const creatorId = results[0].creatorId;

          // Only the creator of the activity can view the activity pending requests
          if (creatorId == uid) {
               const users = await this.activityService
                                       .getActivityPendingRequest(activityData.id);
               response.send(users);
          } else {
               next(new UnauthorizedException());
          }
     }

     /**
      * DELETE /activity/reject?uid=...
      * 
      * rejectActivityRequest() allow activity creator to reject a join request from different user
      */
     private rejectActivityRequest = async (request: Request, response: Response, next: NextFunction) => {
          const uid: string = request.query["uid"];
          const joinRequest: ActivityRequestDto = request.body;

          const results = await this.activityService
                                    .getActivityCreatorId(joinRequest.activityId);
          if (results.length == 0) {
               next(new ActivityNotFoundException());
               return;
          }

          // Only the creator of the activity can reject the pending requests
          const creatorId = results[0].creatorId;
          if (creatorId != uid) {
               next(new UnauthorizedException());
               return;
          }

          const hasSignedUp = await this.activityService
                                        .getJoinActivityCount(
                                             joinRequest.activityId,
                                             joinRequest.userId
                                        );
          // No joinActivity record is found
          if (hasSignedUp == 0) {
               next(new JoinRequestNotFoundException(this.context));
               return;
          }

          const hasApproved = await this.activityService
                                        .getUserJoinActivityHasApprovedStatus(
                                             joinRequest.activityId,
                                             joinRequest.userId
                                        );
          if (!hasApproved) {
               await this.activityService
                         .deleteUserJoinActivity(
                              joinRequest.activityId,
                              joinRequest.userId
                         );
               response.send({
                    message: "You have successfully rejecting activity request",
                    status: 200
               });
          } else {
               next(new UserHasJoinedException(this.context));
          }
     }

     /**
      * POST /activity/accept?uid=...
      * 
      * acceptActivityRequest() allow activity creator to accept a join request from different user
      */
     private acceptActivityRequest = async (request: Request, response: Response, next: NextFunction) => {
          const uid: string = request.query["uid"];
          const joinRequest: ActivityRequestDto = request.body;
          
          const results = await this.activityService
                                    .getActivityCreatorId(joinRequest.activityId);
          if (results.length == 0) {
               next(new ActivityNotFoundException());
               return;
          }

          // Only the creator of the activity can accept the pending requests
          const creatorId = results[0].creatorId;
          if (creatorId != uid) {
               next(new UnauthorizedException());
               return;
          }
          
          // If no join activity request found, throw an error message
          const hasSignedUp = await this.activityService
                                        .getJoinActivityCount(
                                             joinRequest.activityId,
                                             joinRequest.userId
                                        );
          if (hasSignedUp == 0) {
               next(new JoinRequestNotFoundException(this.context));
               return;
          }
          
          const hasApproved = await this.activityService
                                        .getUserJoinActivityHasApprovedStatus(
                                             joinRequest.activityId,
                                             joinRequest.userId
                                        );
          if (!hasApproved) {
               const activity = await this.activityService
                                             .getActivityById(
                                                  joinRequest.activityId
                                             ) as Activity;

               // Can't accept activity request if the participant counts has reached the limit
               if (activity.participantsCount == activity.maxParticipants) {
                    next(new ParticipantsCountLimitExceededException());
                    return;
               }

               await this.activityService
                         .updateJoinActivityApprovedStatus(
                              joinRequest.activityId,
                              joinRequest.userId
                         );
               await this.activityService
                         .updateActivityParticipantsCount(joinRequest.activityId, 1);

               response.send({
                    message: "You have successfully accepting activity request",
                    status: 200
               });
          } else {
               next(new UserHasJoinedException(this.context));
          }
     }
}

export default ActivityController;