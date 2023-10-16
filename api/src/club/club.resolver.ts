import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { In, QueryFailedError } from "typeorm";
import { clubRepository, userRepository } from "../database/database";
import { User } from "../user/user.entity";
import type { MyContext } from "../types";
import { Club } from "./club.entity";
import { BooleanFieldResponse, ClubResponse } from "./club.types";

const allRelations: string[] = ["posts"];

@Resolver(Club)
export class ClubResolver {
  @FieldResolver(() => User)
  creator(@Root() club: Club) {
    return userRepository.findBy({ id: club.creatorId });
  }

  @FieldResolver(() => [User])
  members(@Root() club: Club) {
    return userRepository.findBy({ id: In(club.memberIds) });
  }

  @Authorized()
  @FieldResolver(() => Boolean, { nullable: true })
  hasJoined(@Root() club: Club, @Ctx() { res }: MyContext) {
    const found = club.memberIds.find((id) => id === res.locals.userId);

    if (found) {
      return true;
    } else {
      return false;
    }
  }

  @FieldResolver(() => String)
  dateCreated(@Root() club: Club) {
    const dateString = String(club.createdAt);
    const date = new Date(dateString);
    const month = date.toLocaleString(`default`, { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }

  @FieldResolver(() => Int)
  numberOfMembers(@Root() club: Club) {
    return club.memberIds.length;
  }

  @Query(() => [Club])
  async popularClubs() {
    const clubs = await clubRepository.find({
      take: 5,
    });

    return clubs;
  }

  @Query(() => [Club])
  async allClubs() {
    const clubs = await clubRepository.find({
      relations: allRelations,
    });
    return clubs;
  }

  @Query(() => Club)
  async club(@Arg("id") id: number) {
    const club = await clubRepository.findOne({
      where: { id },
      relations: ["creator"],
    });
    return club;
  }

  @Authorized()
  @Mutation(() => ClubResponse)
  async createClub(
    @Ctx() { res }: MyContext,
    @Arg("name") name: string,
    @Arg("description") description: string
  ): Promise<ClubResponse> {
    const user = await User.findOne({
      where: { id: res.locals.userId },
    });

    if (!user) {
      return {
        errors: [
          {
            field: "User",
            message: "User not found",
          },
        ],
      };
    }

    const club = new Club();
    club.name = name.toLowerCase();
    club.creator = user;
    club.members = [user];
    club.description = description;
    club.creatorId = user.id;
    club.memberIds = [user.id];

    try {
      await clubRepository.save(club);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        if (
          err.message.includes("duplicate key value violates unique constraint")
        ) {
          return {
            errors: [
              {
                field: "name",
                message: "Another group of the same name exists!",
              },
            ],
          };
        }
        throw err;
      }
    }

    return {
      club,
    };
  }

  @Authorized()
  @Mutation(() => BooleanFieldResponse, { nullable: true })
  async joinClub(
    @Ctx() { res }: MyContext,
    @Arg("id", () => Int) id: number
  ): Promise<BooleanFieldResponse> {
    const user = await User.findOne({ where: { id: res.locals.userId } });
    if (!user) {
      return {
        errors: [
          {
            field: "user",
            message: "User has not been found",
          },
        ],
      };
    }
    const club = await clubRepository.findOne({
      where: { id },
      relations: ["members"],
    });

    if (!club) {
      return {
        errors: [
          {
            field: "club",
            message: "error in fetching club",
          },
        ],
      };
    }

    const exists = club.memberIds.find((id) => id === user.id);

    if (exists) {
      return {
        errors: [
          {
            field: "message",
            message: "User has already joined the group",
          },
        ],
      };
    }

    club.members = [...club.members, user];
    club.memberIds = [...club.memberIds, user.id];

    await club.save();

    return {
      ok: true,
    };
  }

  @Mutation(() => BooleanFieldResponse)
  async leaveClub(
    @Ctx() { res }: MyContext,
    @Arg("clubId") clubId: number
  ): Promise<BooleanFieldResponse> {
    const user = await User.findOneBy({ id: res.locals.userId });
    if (!user) {
      return {
        errors: [
          {
            field: `User`,
            message: `User is not authenticated`,
          },
        ],
      };
    }

    const club = await clubRepository.findOne({
      where: { id: clubId },
      relations: ["members"],
    });
    if (!club) {
      return {
        errors: [
          {
            field: "clubId",
            message: "club id error",
          },
        ],
      };
    }

    const newMembers = club.members.filter((member) => member.id !== user.id);
    const newMemberIds = club.memberIds.filter((id) => id !== user.id);
    club.members = newMembers;
    club.memberIds = newMemberIds;

    try {
      await club.save();
    } catch (err) {
      console.log(err);
    }

    return {
      ok: true,
    };
  }
  @Query(() => [Club])
  async clubsWithIds(): Promise<Club[]> {
    return clubRepository.find({});
  }
}
