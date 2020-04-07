import { Entity, BaseEntity, ManyToOne, PrimaryColumn, JoinTable, Column, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { User } from "./User";
import { Activity } from "./Activity";

@Entity({ name: "joinActivities" })
export class JoinActivity extends BaseEntity {
     @PrimaryGeneratedColumn()
     id: number;

     @Column("uuid")
     userId: string;

     @Column()
     activityId: number;

     @ManyToOne(type => User, user => user.joinedActivities, {eager: true})
     user: User;

     @ManyToOne(type => Activity, activity => activity.participants, {eager: true})
     activity: Activity;

     @Column()
     hasApproved: boolean;
}