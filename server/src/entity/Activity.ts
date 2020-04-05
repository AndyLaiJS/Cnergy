import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, JoinColumn, DeleteDateColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: "activities" })
export class Activity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => User, user => user.activities)
    creator: User;

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