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

     public getActivityById = async (activityId: number) => {
          const activity = await this.activityRepository
                              .findOne({
                                   where: { id: activityId }
                              });
          return activity;
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

     public updateActivityParticipantsCount = async (activityId: number, count: number) => {
          const result = await this.activityRepository
                              .createQueryBuilder("activity")
                              .update(Activity)
                              .set({ participantsCount: () => `participantsCount + ${count}` })
                              .where("id = :id", { id: activityId })
                              .execute();
          return result;
     }

     // TODO: Think of a better function name
     public getJoinActivityCount = async (activityId: number, userId: string) => {
          const isExists = await this.joinActivityRepository
                              .count({
                                   where: {
                                        userId: userId,
                                        activityId: activityId,
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

     public deleteUserJoinActivity = async (activityId: number, userId: string) => {
          const result = await this.joinActivityRepository
                              .createQueryBuilder()
                              .delete()
                              .from(JoinActivity)
                              .where("userId =:userId AND activityId =:activityId", {
                                   userId: userId,
                                   activityId: activityId
                              })
                              .execute();
          return result;
     }

     public getUserJoinActivityHasApprovedStatus = async (activityId: number, userId: string) => {
          const userHasBeenApproved = await this.joinActivityRepository
                                        .createQueryBuilder("joinActivity")
                                        .where(`joinActivity.userId = :userId AND 
                                                joinActivity.activityId = :activityId`, {
                                             userId: userId,
                                             activityId: activityId
                                        })
                                        .getOne();
          return userHasBeenApproved?.hasApproved;
     }

     public updateJoinActivityApprovedStatus = async (activityId: number, userId: string) => {
          const result = await this.joinActivityRepository
                              .createQueryBuilder()
                              .update(JoinActivity)
                              .set({ hasApproved: true })
                              .where(`userId = :userId AND
                                      activityId = :activityId`, {
                                           userId: userId,
                                           activityId: activityId
                                      })
                              .execute();
          return result;
     }

     public getPendingRequestByUID = async (user: User) => {
          const result = await this.joinActivityRepository
                              .createQueryBuilder("joinActivity")
                              .innerJoin("joinActivity.activity", "activity")
                              .innerJoin("joinActivity.user", "user")
                              .where(`activity.creatorId = :userId AND
                                      joinActivity.hasApproved = false`, {
                                   userId: user.id
                              })
                              .getMany();
          return result;
     }
}

export default ActivityService;