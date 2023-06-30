import { Query, Resolver, Arg, Authorized, Mutation, Ctx } from "type-graphql";
import { ClubEvent } from "./club-events.entity";
import {
  appDataSource,
  clubEventRepository,
  clubRepository,
  userRepository,
} from "../database/database";
import { GraphQLError } from "graphql";
import { MyContext } from "../types";

@Resolver()
export class ClubEventsResolver {
  @Query(() => [ClubEvent])
  async popularEvents(): Promise<Array<ClubEvent>> {
    const events = await clubEventRepository.find();
    return events;
  }

  @Query(() => ClubEvent)
  async clubEvent(@Arg("id") id: number): Promise<ClubEvent> {
    try {
      const club = await clubEventRepository.findOne({
        where: { id },
        relations: { creator: true, club: true },
      });
      if (!club) {
        throw new GraphQLError("not found");
      }
      return club;
    } catch (e) {
      console.log(e);
      throw new GraphQLError("An error occurred while fetching club event");
    }
  }

  @Authorized()
  @Mutation(() => ClubEvent)
  async createClubEvent(
    @Arg("title") title: string,
    @Arg("description") description: string,
    @Arg("date") date: Date,
    @Arg("meetingLink") meetingLink: string,
    @Arg("duration") duration: string,
    @Arg("clubId") clubId: number,
    @Ctx() { res }: MyContext
  ): Promise<ClubEvent> {
    const clubEvent = new ClubEvent();
    try {
      const user = await userRepository.findOneBy({ id: res.locals.userId });
      if (!user) {
        throw new GraphQLError("Could not find user");
      }

      const club = await clubRepository.findOneBy({ id: clubId });

      if (!club) {
        throw new Error("Could not find club");
      }

      clubEvent.title = title;
      clubEvent.description = description;
      clubEvent.date = date;
      clubEvent.meetingLink = meetingLink;
      clubEvent.creator = user;
      clubEvent.attendees = [user];
      clubEvent.duration = duration;
      clubEvent.club = club;

      await clubEventRepository.save(clubEvent);
    } catch (e) {
      console.log(e);
      throw new GraphQLError("An error has occurred while creating club event");
    }
    return clubEvent;
  }

  @Authorized()
  @Mutation(() => ClubEvent)
  async updateClubEvent(
    @Arg("id") id: number,
    @Arg("title") title: string,
    @Arg("description") description: string,
    @Arg("date") date: Date,
    @Arg("meetingLink") meetingLink: string,
    @Arg("duration") duration: string,
    @Ctx() { res }: MyContext
  ): Promise<ClubEvent> {
    try {
      const clubEvent = await clubEventRepository.findOne({
        where: { id },
        relations: { creator: true },
      });
      if (!clubEvent) {
        throw new GraphQLError("Error when retrieving club event");
      }
      if (clubEvent.creator.id !== res.locals.userId) {
        throw new GraphQLError("User did not create this event");
      }
      const response = await appDataSource
        .createQueryBuilder()
        .update(ClubEvent)
        .set({
          title,
          description,
          date,
          meetingLink,
          duration,
        })
        .where("id = :id", { id })
        .returning("*")
        .execute();

      return response.raw[0];
    } catch (e) {
      console.log(e);
      throw new GraphQLError("An error has occurred while updating club event");
    }
  }
}
