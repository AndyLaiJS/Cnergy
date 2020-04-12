import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { User } from "./User";
import { JoinClub } from "./JoinClub";

@Entity({ name: "clubs" })
export class Club extends BaseEntity {
     @PrimaryGeneratedColumn()
     id: number;

     @ManyToOne(
          () => User, 
          user => user.clubs
     )
     president: User;

     @OneToMany(
          () => JoinClub,
          joinClub => joinClub.club
     )
     members: JoinClub[];

     @Column({ 
          type: "longblob",
          nullable: true
     })
     avatar: Buffer;

     @Column()
     name: string;

     @Column("text")
     description: Text;

     @CreateDateColumn({
          default: () => "CURRENT_TIMESTAMP(6)"
     })
     createdAt: Date;

     @UpdateDateColumn({
          default: () => "CURRENT_TIMESTAMP(6)",
          onUpdate: "CURRENT_TIMESTAMP(6)"
     })
     updatedAt: Date;
}