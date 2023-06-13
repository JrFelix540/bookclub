import bycrypt from "bcryptjs";
import { Arg, Mutation, Resolver } from "type-graphql";
import { userRepository } from "../database/database";
import { User } from "../entities";
import { sendMail } from "../utils/sendMail";
import { AuthResponse, BooleanResponse } from "./auth.types";
import { validateUserRegisterInput } from "./auth.utils";
import { hashPassword } from "./hash";
import {
  TokenType,
  generateAuthToken,
  generateResetToken,
  getUserIdFromToken,
} from "./token";

@Resolver()
export class AuthResolver {
  @Mutation(() => AuthResponse)
  async signup(
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<AuthResponse> {
    const errors = await validateUserRegisterInput({
      username,
      email,
      password,
    });

    if (errors.length > 0) {
      return {
        errors,
      };
    }

    const user = new User();

    try {
      const hashedPassword = await hashPassword(password);
      user.username = username;
      user.email = email;
      user.password = hashedPassword;
      await userRepository.save(user);
    } catch (err) {
      if (
        err.detail.includes("already exists") &&
        err.constraint === "UQ_78a916df40e02a9deb1c4b75edb"
      ) {
        return {
          errors: [
            {
              field: "username",
              message: "username already exists",
            },
          ],
        };
      }

      if (
        err.detail.includes("already exists") &&
        err.constraint === "UQ_e12875dfb3b1d92d7d7c5377e22"
      ) {
        return {
          errors: [
            {
              field: "email",
              message: "A user of this email already exists",
            },
          ],
        };
      }
      throw new Error(err);
    }

    const userId = user.id;
    const accessToken = generateAuthToken({ userId });
    return {
      loggedInUser: {
        accessToken,
        id: user.id,
        username: user.username,
      },
    };
  }

  @Mutation(() => AuthResponse)
  async signin(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<AuthResponse> {
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "email does not exist",
          },
        ],
      };
    }

    const verifyPassword = await bycrypt.compare(password, user.password);

    if (!verifyPassword) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect Password",
          },
        ],
      };
    }

    const userId = user.id;
    const accessToken = generateAuthToken({ userId });
    return {
      loggedInUser: {
        accessToken,
        id: user.id,
        username: user.username,
      },
    };
  }

  @Mutation(() => BooleanResponse)
  async resetPassword(
    @Arg("token") token: string,
    @Arg("password") password: string
  ): Promise<BooleanResponse> {
    const userId = getUserIdFromToken(token, TokenType.Reset);

    if (!userId) {
      return {
        errors: [
          {
            field: "password",
            message: "Token has expired",
          },
        ],
      };
    }

    if (password.length < 4) {
      return {
        errors: [
          {
            field: "password",
            message: "Choose a longer password",
          },
        ],
      };
    }

    const user = await User.findOneBy({ id: userId });
    if (!user) {
      return {
        errors: [
          {
            field: "password",
            message: "Couldn't find user",
          },
        ],
      };
    }
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.save();

    return {
      ok: true,
    };
  }

  @Mutation(() => BooleanResponse)
  async forgetPassword(@Arg("email") email: string) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return {
        ok: true,
      };
    }

    const token = generateResetToken({ userId: user.id });

    sendMail(
      user.email,
      `<a href="http://localhost:3000/auth/password/reset/${token}">Reset Password</a>`
    );

    return {
      ok: true,
    };
  }

  @Mutation(() => Boolean)
  signOut() {
    return true;
  }
}
