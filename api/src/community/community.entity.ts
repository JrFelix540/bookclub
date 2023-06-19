import { Field, Int, ObjectType, Float } from "type-graphql";
import { Post } from "../post/post.entity";
import { User } from "../user/user.entity";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Community extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Field()
  @Column()
  description!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.createdCommunities, {
    onDelete: "SET NULL",
  })
  creator: User;

  @Field(() => Int)
  @Column()
  creatorId: number;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.community, {
    onDelete: "CASCADE",
  })
  posts: Post[];

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.memberCommunities, {
    onDelete: "CASCADE",
  })
  @JoinTable()
  members: User[];

  @Field(() => [Float])
  @Column("int", { array: true, nullable: true })
  memberIds: number[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
