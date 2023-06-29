import { Field, ObjectType } from "type-graphql";
import { FieldError } from "../auth/auth.types";
import { Club } from "./club.entity";

@ObjectType()
export class ClubResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => Club, { nullable: true })
  club?: Club;
}

@ObjectType()
export class BooleanFieldResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Boolean, { nullable: true })
  ok?: boolean;
}
