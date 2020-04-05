import { Router, Request, Response, NextFunction } from "express";

import ActivityService from "../services/activityService";
import RequestWithUser from "../interfaces/requestWithUserInterface";
import Controller from "../interfaces/controllerInterface";
import ActivityDto from "../dtos/activityDto";
import WrongParameterException from "../exceptions/wrongParameterException";

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
          this.router.get(`${this.path}/:id`, authenticationMiddleware, this.getUserActivities)
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
          const userSid = request.params.id;
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
}

export default ActivityController;