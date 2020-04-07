import { getRepository } from "typeorm";
import { Activity } from "../entity/Activity";
import { JoinActivity } from "../entity/JoinActivity";
import ActivityDto from "src/dtos/createActivityDto";
import User from "src/interfaces/userInterface";
import UpdateActivityDto from "src/dtos/updateActivityDto";

class ActivityService {
     private activityRepository = getRepository(Activity);
     private joinActivityRepository = getRepository(JoinActivity);

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

     public updateActivityParticipantsCount = async (activityData: ActivityDto, count: number) => {
          const result = await this.activityRepository
                              .createQueryBuilder("activity")
                              .update(Activity)
                              .set({ participantsCount: () => `participantsCount + ${count}` })
                              .where("id = :id", { id: activityData.id })
                              .execute();
          return result;
     }

     // TODO: Think of a better function name
     public getUserStatus = async (activityData: ActivityDto, user: User) => {
          const isExists = await this.joinActivityRepository
                              .count({
                                   where: {
                                        userId: user.id,
                                        activityId: activityData.id,
                                   }
                              })
          return isExists;
     }

     public postUserJoinActivity = async (activityData: ActivityDto, user: User) => {
          const hasApproved = (activityData.type == "Public" ? true : false);
          const result = await this.joinActivityRepository
                              .insert({
                                   userId: user.id,
                                   activityId: activityData.id,
                                   hasApproved: hasApproved
                              });
          return result;
     }

     public deleteUserJoinActivity = async (activityData: ActivityDto, user: User) => {
          const result = await this.joinActivityRepository
                              .createQueryBuilder()
                              .delete()
                              .from(JoinActivity)
                              .where("userId =:userId AND activityId =:activityId", {
                                   userId: user.id,
                                   activityId: activityData.id
                              })
                              .execute();
          return result;
     }

     public getUserJoinActivityHasApprovedStatus = async (activityData: ActivityDto, user: User) => {
          const userHasBeenApproved = await this.joinActivityRepository
                                        .createQueryBuilder("joinActivity")
                                        .where(`joinActivity.userId = :userId AND 
                                                joinActivity.activityId = :activityId`, {
                                             userId: user.id,
                                             activityId: activityData.id
                                        })
                                        .getOne();
          return userHasBeenApproved?.hasApproved;
     }
}

export default ActivityService;