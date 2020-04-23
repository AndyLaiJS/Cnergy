import { getRepository } from "typeorm";
import { Club } from "../entity/Club";
import { JoinClub } from "../entity/JoinClub";
import User from "../interfaces/userInterface";
import CreateClubDto from "../dtos/createClubDto";
import UpdateClubDto from "../dtos/updateClubDto";
import JoinClubDto from "../dtos/joinClubDto";

class ClubService {
     private clubRepository = getRepository(Club);
     private joinClubRepository = getRepository(JoinClub);

     public getClubs = async() => {
          const clubs = await this.clubRepository
                                  .createQueryBuilder("club")
                                  .getMany();
          return clubs;
     }

     public getClubsByPresidentId = async (presidentId: string) => {
          const clubs = await this.clubRepository
                                  .createQueryBuilder("club")
                                  .where(`club.presidentId = :presidentId`, {
                                       presidentId: presidentId
                                  })
                                  .getMany();
          return clubs;
     }

     public getUserIsPresidentStatus = async (clubId: number, userId: string) => {
          const exists = await this.clubRepository
                                   .findOne({
                                        where: { id: clubId, presidentId: userId }
                                   });
          return exists;
     }

     public getClubById = async (clubId: number) => {
          const club = await this.clubRepository
                                 .createQueryBuilder("club")
                                 .where(`club.Id = :clubId`, {
                                      clubId: clubId
                                 })
                                 .getOne();
          return club;
     }

     public postClub = async (clubData: CreateClubDto, user: User) => {
          const result = await this.clubRepository
                                   .create({
                                        ...clubData,
                                        president: user
                                   })
                                   .save();
          return result;
     }

     public updateClubInfo = async (clubData: UpdateClubDto) => {
          const result = await this.clubRepository
                                   .createQueryBuilder("club")
                                   .update(Club)
                                   .set({
                                        ...clubData
                                   })
                                   .where("id = :id", { id: clubData.id })
                                   .execute();
          return result;
     }

     public getUserHasJoinedClubs = async(userId: string) => {
          const results = await this.clubRepository
                                    .createQueryBuilder("club")
                                    .innerJoin("club.members", "member")
                                    .where(`member.userId = :userId AND
                                            member.hasJoined = TRUE`, {
                                                 userId: userId
                                    })
                                    .getMany();
          return results;
     }

     public getUserJoinClubCount = async (clubId: number, userId: string) => {
          const isExists = await this.joinClubRepository
                                     .createQueryBuilder("joinClub")
                                     .where(`userId = :userId AND
                                             clubId = :clubId`, {
                                                  userId: userId,
                                                  clubId: clubId
                                     })
                                     .getCount()
          return isExists;
     }

     public getUserHasJoinedClubStatus = async (clubId: number, userId: string) => {
          const result = await this.joinClubRepository
                                   .createQueryBuilder("joinClub")
                                   .select("joinClub.hasJoined")
                                   .where(`joinClub.userId = :userId AND
                                           joinClub.clubId = :clubId`, {
                                             userId: userId,
                                             clubId: clubId
                                   })
                                   .getOne();
          return result?.hasJoined;
     }

     public updateUserHasJoinedClubStatus = async (clubId: number, userId: string) => {
          const result = await this.joinClubRepository
                                   .createQueryBuilder()
                                   .update(JoinClub)
                                   .set({ hasJoined: true })
                                   .where(`userId = :userId AND
                                           clubId = :clubId`, {
                                             userId: userId,
                                             clubId: clubId
                                        })
                                   .execute();
          return result;
     }
     
     public postUserJoinClub = async (clubData: JoinClubDto, userId: string, hasJoined: boolean = false) => {
          const result = await this.joinClubRepository
                                   .insert({
                                        userId: userId,
                                        clubId: clubData.id,
                                        reason: clubData.reason,
                                        hasJoined: hasJoined,
                                   });
          return result;
     }

     public deleteUserJoinClub = async (clubId: number, userId: string) => {
          const result = await this.joinClubRepository
                                   .createQueryBuilder()
                                   .delete()
                                   .from(JoinClub)
                                   .where(`userId = :userId AND
                                           clubId = :clubId`, {
                                             userId: userId,
                                             clubId: clubId
                                   })
                                   .execute();
          return result;
     }

     public getPendingRequestsByUID = async (user: User) => {
          const result = await this.joinClubRepository
                                   .createQueryBuilder("joinClub")
                                   .innerJoin("joinClub.club", "club")
                                   .innerJoin("joinClub.user", "user")
                                   .where(`club.presidentId = :userId AND
                                           joinClub.hasJoined = false`, {
                                                userId: user.id
                                   })
                                   .getMany();
          return result;
     }

     public getClubMembers = async (clubId: number) => {
          const results = await this.joinClubRepository
                                   .createQueryBuilder("joinClub")
                                   .innerJoinAndSelect("joinClub.user", "user.id")
                                   .where(`joinClub.clubId = :clubId AND
                                           joinClub.hasJoined = true`, {
                                        clubId: clubId
                                   })
                                   .getMany();
          return results;
     }

     public getClubPresident = async (clubId: number) => {
          const user = await this.clubRepository
                                 .query(`SELECT presidentId 
                                         FROM clubs 
                                         WHERE id = ${clubId}
                                         LIMIT 1
                                  `);
return user;
     }
}

export default ClubService;