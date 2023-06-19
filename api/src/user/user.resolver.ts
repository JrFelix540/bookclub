import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { AuthenticatedUser } from "../auth/auth.types";
import { userRepository } from "../database/database";
import { User } from "./user.entity";
import { MyContext } from "../types";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await userRepository.find({});
    return users;
  }

  @Authorized()
  @Query(() => AuthenticatedUser, { nullable: true })
  async me(@Ctx() { res }: MyContext): Promise<User | null | undefined> {
    const currentUser = await userRepository.findOneBy({
      id: res.locals.userId,
    });

    return currentUser;
  }

  @Authorized()
  @Query(() => User, { nullable: true })
  async meWithCommunities(@Ctx() { res }: MyContext) {
    const user = await userRepository.findOne({
      where: { id: res.locals.userId },
      relations: ["memberCommunities"],
    });

    return user;
  }
}
