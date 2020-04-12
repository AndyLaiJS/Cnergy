import { Entity, BaseEntity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Club } from "./Club";

@Entity({ name: "joinClubs" })
export class JoinClub extends BaseEntity {
     @PrimaryGeneratedColumn()
     id: number;

     @Column("uuid")
     userId: string;

     @Column()
     clubId: number;

     @ManyToOne(
          () => User, 
          user => user.joinedClubs,
          { eager: true }
     )
     user: User;

     @ManyToOne(
          () => Club,
          club => club.members,
          { eager: true }
     )
     club: Club;

     @Column()
     hasJoined: boolean;

     @Column("text")
     reason: Text;
}