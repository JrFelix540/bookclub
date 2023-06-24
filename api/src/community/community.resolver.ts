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
import { In } from "typeorm";
import { communityRepository, userRepository } from "../database/database";
import { User } from "../user/user.entity";
import { MyContext } from "../types";
import { Community } from "./community.entity";
import { BooleanFieldResponse, CommunityResponse } from "./community.types";

const allRelations: string[] = ["posts"];

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

  @Authorized()
  @FieldResolver(() => Boolean, { nullable: true })
  hasJoined(@Root() community: Community, @Ctx() { res }: MyContext) {
    const found = community.memberIds.find(
      (commId) => commId === res.locals.userId
    );

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

  @FieldResolver(() => Int)
  numberOfMembers(@Root() community: Community) {
    return community.memberIds.length;
  }

  @Query(() => [Community])
  async popularCommunities() {
    const communities = await communityRepository.find({
      take: 5,
    });

    return communities;
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

  @Authorized()
  @Mutation(() => CommunityResponse)
  async createCommunity(
    @Ctx() { res }: MyContext,
    @Arg("name") name: string,
    @Arg("description") description: string
  ): Promise<CommunityResponse> {
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

  @Authorized()
  @Mutation(() => BooleanFieldResponse, { nullable: true })
  async joinCommunity(
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
    @Ctx() { res }: MyContext,
    @Arg("communityId") communityId: number
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
