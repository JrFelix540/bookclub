import { Field, Float, ObjectType } from "type-graphql";

@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class LoggedInUser {
  @Field()
  accessToken: string;

  @Field()
  id: number;

  @Field()
  username: string;
}

@ObjectType()
export class AuthResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => LoggedInUser, { nullable: true })
  loggedInUser?: LoggedInUser;
}

@ObjectType()
export class BooleanResponse {
  @Field(() => Boolean, { nullable: true })
  ok?: boolean;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType()
export class AuthenticatedUser {
  @Field(() => Float, { nullable: true })
  id: number;

  @Field(() => String, { nullable: true })
  username: string;
}
