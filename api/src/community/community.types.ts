import { Field, ObjectType } from "type-graphql";
import { FieldError } from "../auth/auth.types";
import { Community } from "./community.entity";

@ObjectType()
export class CommunityResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => Community, { nullable: true })
  community?: Community;
}

@ObjectType()
export class BooleanFieldResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Boolean, { nullable: true })
  ok?: boolean;
}
