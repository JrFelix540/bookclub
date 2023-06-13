import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { FieldError } from "../auth/auth.types";
import { TokenType, getUserIdFromToken } from "../auth/token";
import {
  commentUpvoteRepository,
  userCommentRepository,
  userRepository,
} from "../database/database";
import { CommentUpvote, Post, User, UserComment } from "../entities";
import { MyContext } from "../types";

@ObjectType()
export class UserCommentResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => UserComment, { nullable: true })
  comment?: UserComment;
}

@ObjectType()
export class CommentUpvoteResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => CommentUpvote, { nullable: true })
  commentUpvote?: CommentUpvote;
}

@Resolver(UserComment)
export default class UserCommentResolver {
  @FieldResolver(() => Boolean)
  async hasVoted(
    @Root() userComment: UserComment,
    @Ctx() { token }: MyContext
  ) {
    const userId = getUserIdFromToken(token, TokenType.Auth);

    const upvote = await commentUpvoteRepository.findOne({
      where: { commentId: userComment.id, creatorId: userId },
    });

    if (upvote) {
      return true;
    } else {
      return false;
    }
  }

  @FieldResolver(() => Int, { nullable: true })
  async voteStatus(
    @Root() userComment: UserComment,
    @Ctx() { token }: MyContext
  ) {
    const userId = getUserIdFromToken(token, TokenType.Auth);
    const upvote = await commentUpvoteRepository.findOne({
      where: { commentId: userComment.id, creatorId: userId },
    });

    if (!upvote) {
      return null;
    }
    return upvote.value === 1 ? upvote.value : -1;
  }

  @FieldResolver(() => Boolean)
  async isOwner(@Root() userComment: UserComment, @Ctx() { token }: MyContext) {
    const userId = getUserIdFromToken(token, TokenType.Auth);

    const comment = await userCommentRepository.findOne({
      relations: ["creator"],
      where: { id: userComment.id },
    });

    if (comment?.creator.id === userId) {
      return true;
    } else {
      return false;
    }
  }

  @Mutation(() => CommentUpvoteResponse)
  async voteComment(
    @Arg("commentId") commentId: number,
    @Arg("value", () => Int) value: number,
    @Ctx() { token }: MyContext
  ): Promise<CommentUpvoteResponse> {
    const userId = getUserIdFromToken(token, TokenType.Auth);

    if (!userId) {
      return {
        errors: [
          {
            field: "User",
            message: "User not authenticated",
          },
        ],
      };
    }
    const user = await userRepository.findOneBy({ id: userId });
    const comment = await userCommentRepository.findOneBy({ id: commentId });

    if (!comment) {
      return {
        errors: [
          {
            field: "commentId",
            message: "The comment id is incorrect",
          },
        ],
      };
    }
    if (!user) {
      return {
        errors: [
          {
            field: "user",
            message: "Error in userId",
          },
        ],
      };
    }

    if (!(value === 1 || value === -1)) {
      return {
        errors: [
          {
            field: "value",
            message: "incorrect value",
          },
        ],
      };
    }

    const upvote = await commentUpvoteRepository.findOne({
      where: { commentId: commentId, creatorId: userId },
    });

    if (upvote) {
      if (upvote.value === value) {
        return {
          errors: [
            {
              field: "user",
              message: "user has already voted",
            },
          ],
        };
      } else {
        upvote.value = value;

        try {
          await commentUpvoteRepository.save(upvote);
        } catch (err) {
          console.log(err);
        }

        comment.points = comment.points + value * 2;

        try {
          await userCommentRepository.save(comment);
        } catch (err) {
          console.log(err);
        }

        return {
          commentUpvote: upvote,
        };
      }
    }

    const newUpvote = new CommentUpvote();

    newUpvote.creator = user;
    newUpvote.creatorId = user.id;
    newUpvote.comment = comment;
    newUpvote.commentId = commentId;
    newUpvote.value = value;

    try {
      await commentUpvoteRepository.save(newUpvote);
    } catch (err) {
      console.log(`Voting error`, err);
    }

    comment.points = comment.points + value;

    try {
      await userCommentRepository.save(comment);
    } catch (err) {
      console.log(err);
    }

    return {
      commentUpvote: newUpvote,
    };
  }

  @Mutation(() => UserCommentResponse)
  async createComment(
    @Arg("content") content: string,
    @Arg("postId") postId: number,
    @Ctx() { token }: MyContext
  ): Promise<UserCommentResponse> {
    let userId = getUserIdFromToken(token, TokenType.Auth);

    if (!userId) {
      return {
        errors: [
          {
            field: "User",
            message: "User not authenticated",
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
            field: "user",
            message: "user not found",
          },
        ],
      };
    }

    const post = await Post.findOne({ where: { id: postId } });

    if (!post) {
      return {
        errors: [
          {
            field: "post",
            message: "Post not found",
          },
        ],
      };
    }

    const userComment = new UserComment();
    userComment.post = post;
    userComment.creator = user;
    userComment.content = content;

    try {
      await userComment.save();
    } catch (err) {
      console.log(err);
    }

    return {
      comment: userComment,
    };
  }

  @Query(() => [UserComment], { nullable: true })
  async postComments(
    @Arg("postId") postId: number
  ): Promise<UserComment[] | null> {
    const post = await Post.findOneBy({ id: postId });
    if (!post) {
      return null;
    }
    const comments = await userCommentRepository.find({
      relations: ["post", "creator"],
      where: { post: { id: post.id } },
    });

    return comments;
  }

  @Mutation(() => Boolean)
  async deleteComment(
    @Arg("commentId") commentId: number,
    @Ctx() { token }: MyContext
  ) {
    const userId = getUserIdFromToken(token, TokenType.Auth);

    if (!userId) {
      return false;
    }
    const comment = await userCommentRepository.findOne({
      where: { id: commentId },
      relations: ["creator"],
    });
    if (!comment) {
      console.log("commentId error");
      return false;
    }

    if (comment.creator.id !== userId) {
      console.log(`User not authorized`);
      return false;
    }

    try {
      await userCommentRepository.delete({ id: commentId });
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }
}
