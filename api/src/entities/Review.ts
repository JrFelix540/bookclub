import { Field, ObjectType } from "type-graphql";
import { Book, User } from "./";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export default class Review extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column()
  value!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: "SET NULL",
  })
  creator!: User;

  @Field(() => Book)
  @ManyToOne(() => Book, (book) => book.reviews, {
    onDelete: "SET NULL",
  })
  book!: Book;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
