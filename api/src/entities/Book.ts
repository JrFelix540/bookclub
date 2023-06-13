import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Author, Genre, Shelf, Review } from "./";
import { Community } from "../community/community.entity";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export default class Book extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field(() => [Author])
  @ManyToMany(() => Author, (author) => author.books, {
    onDelete: "SET NULL",
  })
  authors!: Author[];

  @Field(() => [Book])
  @ManyToMany(() => Genre, (genre) => genre.books, {
    onDelete: "SET NULL",
  })
  genres: Genre[];

  @Field(() => Shelf)
  @ManyToOne(() => Shelf, (shelf) => shelf.books, {
    onDelete: "SET NULL",
  })
  shelf: Shelf;

  @Field(() => [Review])
  @OneToMany(() => Review, (review) => review.book, {
    onDelete: "CASCADE",
  })
  reviews: Review[];

  @Field(() => [Community])
  @ManyToMany(() => Community, (community) => community.favoriteBooks, {
    onDelete: "SET NULL",
  })
  favoritedCommunities: Community[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
