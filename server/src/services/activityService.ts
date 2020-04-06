import { getRepository } from "typeorm";
import { Activity } from "../entity/Activity";
import ActivityDto from "src/dtos/activityDto";
import User from "src/interfaces/userInterface";
import UpdateActivityDto from "src/dtos/updateActivityDto";

class ActivityService {
     private activityRepository = getRepository(Activity);

     public getAllActivities = async () => {
          const activities = await this.activityRepository.find();
          return activities;
     }

     public getActivitiesByUserEmail = async (userEmail: string) => {
          const activities = await this.activityRepository
                                   .createQueryBuilder("activity")
                                   .innerJoinAndSelect("activity.creator", "creator")
                                   .where("creator.email=:email", { email: userEmail })
                                   .getMany();
          return activities;
     }

     public postActivity = async (activityData: ActivityDto, creator: User) => {
          const activity = await this.activityRepository.create({
               ...activityData,
               creator: creator
          });
          await this.activityRepository.save(activity);
          
          return activity;
     }

     public updateActivity = async (activityData: UpdateActivityDto) => {
          const activity = await this.activityRepository
                              .save({
                                   ...activityData
                              });
          return activity;
     }
}

export default ActivityService;