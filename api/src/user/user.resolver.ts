import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { AuthenticatedUser } from "../auth/auth.types";
import { userRepository } from "../database/database";
import { User } from "./user.entity";
import { MyContext } from "../types";
import {
  TokenType,
  generateResetToken,
  getUserIdFromToken,
} from "../auth/token";
import {
  EmailType,
  generatePasswordResetPayload,
  sendMail,
} from "../sendgrid/sendgrid";
import { GraphQLError } from "graphql";
import { hashPassword } from "../auth/hash";

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
  async meWithClubs(@Ctx() { res }: MyContext) {
    const user = await userRepository.findOne({
      where: { id: res.locals.userId },
      relations: ["memberClubs"],
    });

    return user;
  }

  @Mutation(() => Boolean)
  async forgetPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return true;
    }

    const token = generateResetToken({ userId: user.id });

    const payload = generatePasswordResetPayload(token, user.username);

    await sendMail(EmailType.PasswordReset, {
      to: email,
      dynamicTemplateData: payload,
    });

    return true;
  }

  @Mutation(() => Boolean)
  async resetPassword(
    @Arg("token") token: string,
    @Arg("password") password: string
  ): Promise<boolean> {
    const userId = getUserIdFromToken(token, TokenType.Reset);

    if (!userId) {
      throw new GraphQLError("Token has expired");
    }
    const user = await User.findOneBy({ id: userId });
    if (!user) {
      throw new GraphQLError("User could not be found");
    }
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.save();

    return true;
  }
}
