import { getRepository } from "typeorm";
import { Activity } from "../entity/Activity";
import { JoinActivity } from "../entity/JoinActivity";
import CreateActivityDto from "src/dtos/createActivityDto";
import User from "src/interfaces/userInterface";
import UpdateActivityDto from "src/dtos/updateActivityDto";

class ActivityService {
     private activityRepository = getRepository(Activity);
     private joinActivityRepository = getRepository(JoinActivity);

     public getActivitiesByTimestamp = async (timestamp: string, comparator: string = ">=") => {
          const activities = await this.activityRepository
                                       .createQueryBuilder("activity")
                                       .where(`activity.activityDate ${comparator} :time`, {
                                            time: timestamp
                                       })
                                       .getMany();
          return activities;
     }

     public getActivitiesByEmailAndTimestamp = async (userEmail: string, timestamp: string, comparator: string = ">=") => {
          const activities = await this.activityRepository
                                       .createQueryBuilder("activity")
                                       .innerJoinAndSelect("activity.creator", "creator")
                                       .where(`creator.email=:email AND
                                               activity.activityDate ${comparator} :time`, {
                                                  email: userEmail,
                                                  time: timestamp
                                             })
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

     public getActivityTypeById = async (activityId: number) => {
          const activity = await this.activityRepository
                                     .createQueryBuilder("activity")
                                     .select("activity.type")
                                     .where(`activity.id = :id`, {
                                          id: activityId
                                     })
                                     .getOne();
          return activity?.type;
     }

     public postActivity = async (activityData: CreateActivityDto, creator: User) => {
          const activity = await this.activityRepository
                                     .create({
                                          ...activityData,
                                          creator: creator
                                     })
                                     .save();
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

     public getJoinActivityCount = async (activityId: number, userId: string) => {
          const isExists = await this.joinActivityRepository
                                     .count({
                                          where: {
                                               userId: userId,
                                               activityId: activityId,
                                          }
                                     });
          return isExists;
     }

     public postUserJoinActivity = async (activityId: number, userId: string, hasApproved: boolean = true) => {
          const result = await this.joinActivityRepository
                                   .insert({
                                        userId: userId,
                                        activityId: activityId,
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

     public getUserHasJoinedActvities = async (userId: string) => {
          // const joinedActivities = await this.joinActivityRepository
          //                                    .createQueryBuilder("joinActivity")
          //                                    .innerJoinAndSelect("joinActivity.activity", "activity")
          //                                    .where(`joinActivity.userId = :userId AND
          //                                            joinActivity.hasApproved = true AND
          //                                            joinActivity.activityId = activity.id`, {
          //                                                 userId: userId
          //                                            })
          //                                    .getMany();
          // return joinedActivities;
          const activities = await this.activityRepository
                                       .createQueryBuilder("activity")
                                       .innerJoin("activity.participants", "participants")
                                       .where(`participants.userId = :userId AND
                                               participants.hasApproved = true AND
                                               activity.id = participants.ActivityId`, {
                                                    userId: userId
                                             })
                                        .getMany();
          return activities;
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

     public getPendingRequestByUID = async (userId: string) => {
          const result = await this.joinActivityRepository
                                   .createQueryBuilder("joinActivity")
                                   .innerJoin("joinActivity.activity", "activity")
                                   .innerJoin("joinActivity.user", "user")
                                   .where(`activity.creatorId = :userId AND
                                           joinActivity.hasApproved = false`, {
                                             userId: userId
                                   })
                                   .getMany();
          return result;
     }
}

export default ActivityService;