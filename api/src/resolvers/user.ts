import { Ctx, Field, InputType, Query, Resolver } from "type-graphql";
import { AuthenticatedUser } from "../auth/auth.types";
import { TokenType, getUserIdFromToken } from "../auth/token";
import { userRepository } from "../database/database";
import { User } from "../entities";
import { MyContext } from "../types";

export interface UserDecoded {
  email: string;
}

@InputType()
export class UserRegisterInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await userRepository.find({});
    return users;
  }

  @Query(() => AuthenticatedUser, { nullable: true })
  async me(@Ctx() { token }: MyContext): Promise<User | null | undefined> {
    const userId = getUserIdFromToken(token, TokenType.Auth);
    const currentUser = await userRepository.findOneBy({ id: userId });

    return currentUser;
  }

  @Query(() => User, { nullable: true })
  async meWithCommunities(@Ctx() { token }: MyContext) {
    const userId = getUserIdFromToken(token, TokenType.Auth);
    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ["memberCommunities"],
    });

    return user;
  }
}
