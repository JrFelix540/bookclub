import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Book } from "./";

@ObjectType()
@Entity()
export default class Genre extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column()
  text: string;

  @Field(() => [Book])
  @ManyToMany(() => Book, (book) => book.genres, {
    onDelete: "SET NULL",
  })
  @JoinTable()
  books: Book[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
