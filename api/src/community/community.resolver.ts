import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { In } from "typeorm";
import { getUserIdFromToken, TokenType } from "../auth/token";
import { communityRepository, userRepository } from "../database/database";
import { User } from "../entities";
import { MyContext } from "../types";
import { Community } from "./community.entity";
import { BooleanFieldResponse, CommunityResponse } from "./community.types";

const allRelations: string[] = ["posts", "favoriteBooks"];

@Resolver(Community)
export class CommunityResolver {
  @FieldResolver(() => User)
  creator(@Root() community: Community) {
    return userRepository.findBy({ id: community.creatorId });
  }

  @FieldResolver(() => [User])
  members(@Root() community: Community) {
    return userRepository.findBy({ id: In(community.memberIds) });
  }

  @FieldResolver(() => Boolean)
  hasJoined(@Root() community: Community, @Ctx() { token }: MyContext) {
    const userId = getUserIdFromToken(token, TokenType.Auth);

    const found = community.memberIds.find((commId) => commId === userId);

    if (found) {
      return true;
    } else {
      return false;
    }
  }

  @FieldResolver(() => String)
  dateCreated(@Root() community: Community) {
    const dateString = String(community.createdAt);
    const date = new Date(dateString);
    const month = date.toLocaleString(`default`, { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }

  @Query(() => [Community])
  async allCommunities() {
    const communities = await communityRepository.find({
      relations: allRelations,
    });
    return communities;
  }

  @Query(() => Community)
  async community(@Arg("id") id: number) {
    const community = await communityRepository.findOne({
      where: { id },
      relations: ["creator"],
    });
    return community;
  }

  @Mutation(() => CommunityResponse)
  async createCommunity(
    @Ctx() { token }: MyContext,
    @Arg("name") name: string,
    @Arg("description") description: string
  ): Promise<CommunityResponse> {
    const userId = getUserIdFromToken(token, TokenType.Auth);
    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "Token not verified",
          },
        ],
      };
    }
    const user = await User.findOne({
      where: { id: userId },
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

    const community = new Community();
    community.name = name.toLowerCase();
    community.creator = user;
    community.members = [user];
    community.description = description;
    community.creatorId = user.id;
    community.memberIds = [user.id];

    try {
      await communityRepository.save(community);
    } catch (err) {
      if (err.detail.includes("already exists")) {
        return {
          errors: [
            {
              field: "name",
              message: "Another group of the same name exists!",
            },
          ],
        };
      }

      console.log(err);
    }

    return {
      community,
    };
  }

  @Mutation(() => BooleanFieldResponse)
  async joinCommunity(
    @Ctx() { token }: MyContext,
    @Arg("id", () => Int) id: number
  ): Promise<BooleanFieldResponse> {
    const userId = getUserIdFromToken(token, TokenType.Auth);
    if (!userId) {
      return {
        ok: false,
        errors: [
          {
            field: "User",
            message: "User not authenticated",
          },
        ],
      };
    }

    const user = await User.findOne({ where: { id: userId } });
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
    const community = await communityRepository.findOne({
      where: { id },
      relations: ["members"],
    });

    if (!community) {
      return {
        errors: [
          {
            field: "community",
            message: "error in fetching community",
          },
        ],
      };
    }

    const exists = community.memberIds.find((id) => id === user.id);

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

    community.members = [...community.members, user];
    community.memberIds = [...community.memberIds, user.id];

    try {
      await community.save();
    } catch (err) {
      console.log(err);

      if (err.detail.includes("already exists")) {
        return {
          errors: [
            {
              field: "community",
              message: `You've already joined this community`,
            },
          ],
        };
      }
    }

    return {
      ok: true,
    };
  }

  @Mutation(() => BooleanFieldResponse)
  async leaveCommunity(
    @Ctx() { token }: MyContext,
    @Arg("communityId") communityId: number
  ): Promise<BooleanFieldResponse> {
    let userId = getUserIdFromToken(token, TokenType.Auth);

    if (!userId) {
      return {
        ok: false,
        errors: [
          {
            field: "User",
            message: "User not authenticated",
          },
        ],
      };
    }

    const user = await User.findOneBy({ id: userId });
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

    const community = await communityRepository.findOne({
      where: { id: communityId },
      relations: ["members"],
    });
    if (!community) {
      return {
        errors: [
          {
            field: "communityId",
            message: "community id error",
          },
        ],
      };
    }

    const newMembers = community.members.filter(
      (member) => member.id !== user.id
    );
    const newMemberIds = community.memberIds.filter((id) => id !== user.id);
    community.members = newMembers;
    community.memberIds = newMemberIds;

    try {
      await community.save();
    } catch (err) {
      console.log(err);
    }

    return {
      ok: true,
    };
  }
  @Query(() => [Community])
  async communitiesWithIds(): Promise<Community[]> {
    return Community.find({});
  }
}
