import bycrypt from "bcryptjs";
import { Arg, Mutation, Resolver } from "type-graphql";
import { userRepository } from "../database/database";
import { User } from "../user/user.entity";
import { AuthResponse } from "./auth.types";
import { validateUserRegisterInput } from "./auth.utils";
import { hashPassword } from "./hash";
import { generateAuthToken } from "./token";
import { QueryFailedError } from "typeorm";

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
      user.emailConfirmation = false;
      await userRepository.save(user);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        if (
          err.message ===
          'duplicate key value violates unique constraint "UQ_78a916df40e02a9deb1c4b75edb"'
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
          err.message ===
          'duplicate key value violates unique constraint "UQ_e12875dfb3b1d92d7d7c5377e22"'
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
        throw err;
      }
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

  @Mutation(() => Boolean)
  signOut() {
    return true;
  }
}
