import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Book } from "./";

@ObjectType()
@Entity()
export default class Author extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  firstName!: string;

  @Field()
  @Column()
  lastName!: string;

  @Field(() => [Book])
  @ManyToMany(() => Book, (book) => book.authors, {
    onDelete: "SET NULL",
  })
  @JoinTable()
  books: Book[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
