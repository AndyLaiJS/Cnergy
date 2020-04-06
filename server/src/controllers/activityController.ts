import { Router, Request, Response, NextFunction } from "express";

import ActivityService from "../services/activityService";
import RequestWithUser from "../interfaces/requestWithUserInterface";
import Controller from "../interfaces/controllerInterface";
import ActivityDto from "../dtos/activityDto";
import UpdateActivityDto from "../dtos/updateActivityDto";
import WrongParameterException from "../exceptions/wrongParameterException";
import UnauthorizedException from "../exceptions/unauthorizedException";

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
              .post(`${this.path}`, validationMiddleware(ActivityDto), this.createActivity);
          
          this.router
               .all(`${this.path}/:sid`, authenticationMiddleware)
               .get(`${this.path}/:sid`, this.getUserActivities)
               .patch(`${this.path}/:sid`, validationMiddleware(UpdateActivityDto), this.updateUserActivity)
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
                    console.log(activities);
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
}

export default ActivityController;