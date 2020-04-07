import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, JoinColumn, DeleteDateColumn, OneToMany } from "typeorm";
import { User } from "./User";
import { JoinActivity } from "./JoinActivity";

@Entity({ name: "activities" })
export class Activity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => User, user => user.activities)
    creator: User;

    @OneToMany(type => JoinActivity, joinActivity => joinActivity.activity)
    participants: JoinActivity[];

    @Column()
    name: string;
    
    @Column()
    description: string;
        
    @Column()
    activityDate: Date;
    
    @Column()
    maxParticipants: number;
    
    @Column()
    minParticipants: number;

    @Column()
    participantsCount: number;

    // Type can be either "Public" or "Private"
    @Column({
        default: "Public",
        nullable: false
    })
    type: string;

    @CreateDateColumn({
        default: () => "CURRENT_TIMESTAMP(6)",
    })
    createdAt: Date;

    @UpdateDateColumn({
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    updatedAt: Date;
    
    @DeleteDateColumn({
         nullable: true
     })
     deletedAt: Date;
     
}