import { getRepository } from "typeorm";
import { Activity } from "../entity/Activity";
import { JoinActivity } from "../entity/JoinActivity";
import { User } from "../entity/User";
import CreateActivityDto from "src/dtos/createActivityDto";
import UpdateActivityDto from "src/dtos/updateActivityDto";

class ActivityService {
     private activityRepository = getRepository(Activity);
     private joinActivityRepository = getRepository(JoinActivity);
     private userRepository = getRepository(User);

     public getActivitiesByTimestamp = async (timestamp: string, comparator: string = ">=") => {
          const activities = await this.activityRepository
                                       .createQueryBuilder("activity")
                                       .where(`activity.activityDate ${comparator} :time`, {
                                            time: timestamp
                                       })
                                       .getMany();
          return activities;
     }

     public getActivitiesByUIDAndTimestamp = async (userId: string, timestamp: string, comparator: string = ">=") => {
          const activities = await this.activityRepository
                                       .createQueryBuilder("activity")
                                       .innerJoin("activity.creator", "creator")
                                       .where(`creator.id = :userId AND
                                               activity.activityDate ${comparator} :time`, {
                                                  userId: userId,
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

     public getActivityParticipantsCount = async (activityId: number) => {
          const activity = await this.activityRepository
                                  .createQueryBuilder("activity")
                                  .select("activity.maxParticipants")
                                  .where(`activity.id = :id`, {
                                       id: activityId
                                  })
                                  .getOne();
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

     public getActivityCreatorId = async (activityId: number) => {
          const user = await this.activityRepository
                                 .query(`SELECT creatorId 
                                         FROM activities 
                                         WHERE id = ${activityId}
                                         LIMIT 1
                                  `);
          return user;
     }

     public postActivity = async (activityData: CreateActivityDto, creator) => {
          const activity = await this.activityRepository
                                     .create({
                                          ...activityData,
                                          creator: creator
                                     })
                                     .save();
          return activity;
     }

     public updateActivityDescription = async (activityData: UpdateActivityDto) => {
          const activity = await this.activityRepository
                                     .createQueryBuilder()
                                     .update(Activity)
                                     .set({ description: `${activityData.description}`})
                                     .where(`id = :activityId`, {
                                          activityId: activityData.id
                                     })
                                     .execute();
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

     public getActivityPendingRequest = async (activityId: number) => {
          const result = await this.userRepository
                                   .createQueryBuilder("user")
                                   .innerJoin("user.joinedActivities", "activity")
                                   .where(`activity.activityId = :activityId AND
                                           activity.hasApproved = FALSE`, {
                                             activityId: activityId
                                        })
                                   .getMany();
          return result;
     }
}

export default ActivityService;