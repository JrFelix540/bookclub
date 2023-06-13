import { Field, Int, ObjectType, Float } from "type-graphql";
import { Book, Post, User } from "../entities";
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

  @Field(() => [Book])
  @ManyToMany(() => Book, (book) => book.favoritedCommunities, {
    onDelete: "SET NULL",
  })
  @JoinTable()
  favoriteBooks: Book[];

  @Field(() => [Int])
  @Column("int", { array: true, nullable: true })
  favoriteBookIds: number[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
