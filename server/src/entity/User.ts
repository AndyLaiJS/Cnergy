import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany } from "typeorm";
import { Activity } from "./Activity";
import { JoinActivity } from "./JoinActivity";
import { Club } from "./Club";
import { JoinClub } from "./JoinClub";

@Entity({ name: "users" })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        nullable: false
    })
    firstName: string;

    @Column()
    lastName: string;

    @Column({ 
        unique: true,
        nullable: false
    })
    email: string;

    @Column({
        nullable: false
    })
    password: string;

    @Column({
        nullable: false
    })
    college: string;

    @OneToMany(() => Activity, activity => activity.creator, { nullable: true })
    activities: Activity[];

    @OneToMany(() => Club, club => club.president, { nullable: true })
    clubs: Club[];

    @OneToMany(() => JoinActivity, joinActivity => joinActivity.user)
    joinedActivities: JoinActivity[];

    @OneToMany(() => JoinClub, joinClub => joinClub.user)
    joinedClubs: JoinClub[];

    @CreateDateColumn({
        default: () => "CURRENT_TIMESTAMP(6)",
    })
    createdAt: Date;

    @UpdateDateColumn({
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    updatedAt: Date;
}