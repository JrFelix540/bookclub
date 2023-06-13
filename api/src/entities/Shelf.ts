import { Field, ObjectType } from "type-graphql";
import { Book } from "./";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

@ObjectType()
@Entity()
export default class Shelf extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  type!: string;

  @Field(() => [Book])
  @OneToMany(() => Book, (book) => book.shelf, {
    onDelete: "SET NULL",
  })
  books: Book[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
