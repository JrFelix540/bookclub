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
import { Club } from "../club/club.entity";
import {
  AppDataSource,
  clubRepository,
  postRepository,
  postUpvoteRepository,
} from "../database/database";
import { Post } from "./post.entity";
import { User } from "../user/user.entity";
import { MyContext } from "../types";
import { PaginatedPosts, PostResponse, UpvoteResponse } from "./post.types";
import { PostUpvote } from "../post-upvote/post-upvote.entity";
import { userRepository } from "../database/database";

const allRelations = ["club", "comments", "postUpvotes"];

@Resolver(Post)
export class PostResolver {
  @Authorized()
  @FieldResolver(() => Boolean, { nullable: true })
  isOwner(@Root() post: Post, @Ctx() { res }: MyContext) {
    if (res.locals.userId === post.creatorId) {
      return true;
    } else {
      return false;
    }
  }

  @FieldResolver(() => User)
  creator(@Root() post: Post) {
    return userRepository.findOneBy({ id: post.creatorId });
  }

  @FieldResolver(() => Club)
  club(@Root() post: Post) {
    return clubRepository.findOneBy({ id: post.clubId });
  }

  @Authorized()
  @FieldResolver(() => Boolean, { nullable: true })
  async joinStatus(@Root() post: Post, @Ctx() { res }: MyContext) {
    const club = await clubRepository.findOneBy({
      id: post.clubId,
    });

    if (!club) {
      return false;
    }

    const found = club.memberIds.find(
      (commId: number) => commId === res.locals.userId
    );

    if (found) {
      return true;
    } else {
      return false;
    }
  }

  @Authorized()
  @FieldResolver(() => Int, { nullable: true })
  async hasVoted(@Root() post: Post, @Ctx() { res }: MyContext) {
    const upvote = await postUpvoteRepository.findOne({
      where: {
        postId: post.id,
        creatorId: res.locals.userId,
      },
    });
    return upvote ? upvote.value : null;
  }

  @Authorized()
  @Mutation(() => UpvoteResponse, { nullable: true })
  async vote(
    @Ctx() { res }: MyContext,
    @Arg("postId", () => Int) postId: number,
    @Arg("value", () => Int) value: number
  ): Promise<UpvoteResponse> {
    const post = await Post.findOneBy({ id: postId });
    const user = await User.findOneBy({ id: res.locals.userId });

    if (!user) {
      return {
        errors: [
          {
            field: "User",
            message: "The user does not exist",
          },
        ],
      };
    }
    if (!post) {
      return {
        errors: [
          {
            field: "post",
            message: "post does not exist",
          },
        ],
      };
    }
    const checkUpvote = await postUpvoteRepository.findOne({
      where: { creatorId: res.locals.userId, postId: postId },
    });

    if (checkUpvote) {
      if (checkUpvote.value !== value) {
        checkUpvote.value = value;
        try {
          await checkUpvote.save();
        } catch (err) {
          console.log(err);
        }

        post.points = post.points + 2 * value;

        try {
          await post.save();
        } catch (err) {
          console.log(err);
        }
      }

      return {
        errors: [
          {
            field: "user",
            message: "user has already voted",
          },
        ],
      };
    }

    const upvote = new PostUpvote();
    upvote.postId = postId;
    upvote.post = post;
    upvote.creatorId = user.id;
    upvote.creator = user;
    upvote.value = value === 1 ? 1 : -1;

    try {
      await upvote.save();
    } catch (err) {
      console.log(err);
    }

    post.points = post.points + value;

    try {
      await post.save();
    } catch (err) {
      console.log(err);
    }

    return {
      upvote,
    };
  }

  @Query(() => PaginatedPosts)
  async latestPosts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true })
    cursor: string | null
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const posts = await AppDataSource.query(
      `
    select p.* 
    from post p
    ${cursor ? `where p."updatedAt" < $2` : ``}
    order by p."updatedAt" DESC
    limit $1
    `,
      replacements
    );

    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === realLimitPlusOne,
    };
  }

  @Query(() => PaginatedPosts, { nullable: true })
  async popularPosts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => Int, { nullable: true }) cursor: number | null
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const posts = await postRepository
      .createQueryBuilder("post")
      .orderBy("post.points", "DESC")
      .skip(cursor ? cursor : 0)
      .take(realLimitPlusOne)
      .getMany();

    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === realLimitPlusOne,
    };
  }

  @Authorized()
  @Query(() => PaginatedPosts, { nullable: true })
  async myClubsPosts(
    @Ctx() { res }: MyContext,
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true })
    cursor: string | null
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(20, limit);
    const realLimitPlusOne = Math.min(20, limit) + 1;
    const replacements: any[] = [realLimitPlusOne];
    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }
    const user = await userRepository.findOne({
      where: { id: res.locals.userId },
      relations: ["memberClubs"],
    });
    if (!user) {
      return {
        posts: [],
        hasMore: false,
        errors: [
          {
            field: "user",
            message: "User not found",
          },
        ],
      };
    }
    const clubIds = user.memberClubs.map((comm) => comm.id);

    if (clubIds.length === 0) {
      return {
        posts: [],
        hasMore: false,
      };
    }
    const posts = await AppDataSource.query(
      `
    select p.*
    from post p
    where (p."clubId" in (${clubIds}))
    ${cursor ? `and p."updatedAt" < $2` : ``}
    order by p."updatedAt" DESC
    limit $1

    `,
      replacements
    );
    return {
      posts: posts.slice(0, realLimit),
      hasMore: realLimitPlusOne === posts.length,
    };
  }

  @Query(() => PaginatedPosts, { nullable: true })
  async clubPosts(
    @Arg("clubId") clubId: number,
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true })
    cursor: string | null
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(20, limit);
    const realLimitPlusOne = Math.min(20, limit) + 1;
    const replacements: any[] = [realLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const posts = await AppDataSource.query(
      `
      select p.* 
      from post p
      where (p."clubId" = ${clubId})
      ${cursor ? `and p."createdAt" < $2` : ``}
      order by p.points DESC
      limit $1
    `,
      replacements
    );

    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.realLimitPlusOne === posts.length,
    };
  }

  @Query(() => Post)
  async post(@Arg("id") id: number): Promise<Post> {
    const post = await Post.find({
      where: { id },
      relations: allRelations,
    });
    return post[0];
  }

  @Authorized()
  @Mutation(() => PostResponse)
  async createPost(
    @Arg("title") title: string,
    @Arg("content") content: string,
    @Arg("clubId", () => Int) clubId: number,
    @Ctx() { res }: MyContext
  ): Promise<PostResponse> {
    if (clubId === undefined) {
      return {
        errors: [
          {
            field: "clubId",
            message: "Please select a bookclub",
          },
        ],
      };
    }

    const club = await clubRepository.findOne({
      where: { id: clubId },
    });
    if (!club) {
      return {
        errors: [
          {
            field: "club",
            message: "Club does not exist",
          },
        ],
      };
    }

    const user = await userRepository.findOne({
      where: { id: res.locals.userId },
      relations: ["memberClubs"],
    });

    if (!user) {
      return {
        errors: [
          {
            field: "user",
            message: "User not found",
          },
        ],
      };
    }

    const found = user.memberClubs.find((comm) => comm.id === clubId);

    if (!found) {
      return {
        errors: [
          {
            field: "user",
            message: "User is not a member of the group",
          },
        ],
      };
    }

    const post = new Post();
    post.creator = user;
    post.club = club;
    post.title = title;
    post.content = content;
    post.creatorId = user.id;
    post.clubId = club.id;

    try {
      await post.save();
    } catch (err) {
      console.log(err);
    }

    return {
      post,
    };
  }

  @Authorized()
  @Mutation(() => PostResponse)
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Arg("content", () => String, { nullable: true }) content: string,
    @Ctx() { res }: MyContext
  ): Promise<PostResponse> {
    const post = await Post.findOneBy({ id });
    if (!post) {
      return {
        errors: [
          {
            field: "post",
            message: "The post does not exits",
          },
        ],
      };
    }
    if (post?.creatorId !== res.locals.userId) {
      return {
        errors: [
          {
            field: "creator",
            message: "User not authorized",
          },
        ],
      };
    }

    if (title && post?.title) {
      post.title = title;
    }

    if (content && post?.content) {
      post.content = content;
    }

    try {
      await post.save();
    } catch (err) {
      console.log(err);
    }

    return {
      post,
    };
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { res }: MyContext
  ): Promise<Boolean> {
    const post = await Post.findOneBy({ id });
    if (!post) {
      console.log(`post not found`);
      return true;
    }

    if (post.creatorId !== res.locals.userId) {
      console.log(`User not owner`);
      return true;
    }

    await Post.delete({ id });
    return true;
  }

  @Query(() => [Post])
  async postWithIds(): Promise<Post[]> {
    return await Post.find({});
  }
}
