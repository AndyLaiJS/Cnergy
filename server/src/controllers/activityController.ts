import { Router, Request, Response, NextFunction } from "express";

import ActivityService from "../services/activityService";
import RequestWithUser from "../interfaces/requestWithUserInterface";
import Controller from "../interfaces/controllerInterface";
import ActivityDto from "../dtos/createActivityDto";
import UpdateActivityDto from "../dtos/updateActivityDto";
import WrongParameterException from "../exceptions/wrongParameterException";
import UnauthorizedException from "../exceptions/unauthorizedException";
import UserHasSignedUpActivityException from "../exceptions/userHasSignedUpActivityException";
import UserHasNotSignedUpActivityException from "../exceptions/userHasNotSignedUpActivityException";

import authenticationMiddleware from "../middlewares/authenticationMiddleware";
import validationMiddleware from "../middlewares/validationMiddleware";
import utils from "../utils";

class ActivityController implements Controller {
     public path = "/activity";
     public router = Router();
     private activityService = new ActivityService();

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
               .all(`${this.path}/:sid`, authenticationMiddleware)
               .get(`${this.path}/:sid`, this.getUserActivities);

          this.router
               // .all(`${this.path}/join`, authenticationMiddleware)
               .post(`${this.path}/join`, this.joinActivity)
               .delete(`${this.path}/join`, this.cancelJoinActivity);
     }

     private getAllActivities = async (_: Request, response: Response, next: NextFunction) => {
          try {
               const activities = await this.activityService
                                        .getAllActivities();
               response.send(activities);
          } catch (e) {
               next(e);
          }
     }

     private getUserActivities = async (request: Request, response: Response, next: NextFunction) => {
          const userSid = request.params.sid;
          try {
               const userEmail = utils.getEmail(userSid);
               try {
                    const activities = await this.activityService
                                        .getActivitiesByUserEmail(userEmail);
                    response.send({ activities: activities });
               } catch(e) {
                    next(e);
               } 
          } catch(e) {
               next(new WrongParameterException());
          }
     }

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

     private joinActivity = async (request: RequestWithUser, response: Response, next: NextFunction) => {
          const user = request.user;
          const activityData: ActivityDto = request.body;

          const hasSignedUp = await this.activityService
                                   .getUserStatus(activityData, user);
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
                         this.activityService
                              .updateActivityParticipantsCount(activityData, 1);
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

     private cancelJoinActivity = async (request: RequestWithUser, response: Response, next: NextFunction) => {
          const user = request.user;
          const activityData: ActivityDto = request.body;

          const hasSignedUp = await this.activityService
                                   .getUserStatus(activityData, user);
          if (hasSignedUp == 0) {
               next(new UserHasNotSignedUpActivityException())
          } else {
               try {
                    const hasApproved = await this.activityService
                                             .getUserJoinActivityHasApprovedStatus(activityData, user);

                    await this.activityService
                         .deleteUserJoinActivity(activityData, user);
                         
                    if ( activityData.type == "Public" || (
                         activityData.type == "Private" && hasApproved
                    )) {
                         await this.activityService.
                              updateActivityParticipantsCount(activityData, -1);
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
}

export default ActivityController;