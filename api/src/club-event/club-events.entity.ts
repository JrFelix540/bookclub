import { Club } from "../club/club.entity";
import { User } from "../user/user.entity";
import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import type { Relation } from "typeorm";

@ObjectType()
@Entity()
export class ClubEvent {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column({ type: "timestamptz" })
  date: Date;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  meetingLink: string;

  @Field()
  @Column()
  duration: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.createdEvents)
  creator: Relation<User>;

  @Field(() => Club)
  @ManyToOne(() => Club, (club) => club.events)
  club: Relation<Club>;

  @Field(() => [User])
  @ManyToMany(() => User)
  @JoinTable()
  attendees: Array<User>;
}
