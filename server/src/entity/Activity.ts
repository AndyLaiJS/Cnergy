import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, JoinColumn, DeleteDateColumn, OneToMany } from "typeorm";
import { User } from "./User";
import { JoinActivity } from "./JoinActivity";

@Entity({ name: "activities" })
export class Activity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => User, user => user.activities)
    creator: User;

    @OneToMany(() => JoinActivity, joinActivity => joinActivity.activity)
    participants: JoinActivity[];

    @Column({
        nullable: false
    })
    name: string;
    
    @Column({
        nullable: false
    })
    description: string;
        
    @Column({
        nullable: false
    })
    activityDate: Date;
    
    @Column({
        nullable: false
    })
    maxParticipants: number;
    
    @Column({
        nullable: false
    })
    minParticipants: number;

    @Column({
        default: () => "0",
        nullable: false
    })
    participantsCount: number;

    // Type can be either "Public" or "Private"
    @Column({
        default: "Public",
        nullable: false
    })
    type: string;

    @CreateDateColumn({
        default: () => "CURRENT_TIMESTAMP(6)",
        nullable: false
    })
    createdAt: Date;

    @UpdateDateColumn({
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)",
        nullable: false
    })
    updatedAt: Date;
    
    @DeleteDateColumn({
         nullable: true
     })
     deletedAt: Date;
     
}