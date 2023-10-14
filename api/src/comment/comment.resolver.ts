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
import {
  commentRepository,
  commentUpvoteRepository,
  userRepository,
} from "../database/database";
import { CommentUpvote } from "../comment-upvote/comment-upvote.entity";
import { Post } from "../post/post.entity";
import { User } from "../user/user.entity";
import { Comment } from "./comment.entity";
import type { MyContext } from "../types";
import { CommentUpvoteResponse, UserCommentResponse } from "./comment.type";

@Resolver(Comment)
export class CommentResolver {
  @Authorized()
  @FieldResolver(() => Boolean)
  async hasVoted(@Root() comment: Comment, @Ctx() { res }: MyContext) {
    const upvote = await commentUpvoteRepository.findOne({
      where: { commentId: comment.id, creatorId: res.locals.userId },
    });

    if (upvote) {
      return true;
    } else {
      return false;
    }
  }

  @Authorized()
  @FieldResolver(() => Int, { nullable: true })
  async voteStatus(@Root() comment: Comment, @Ctx() { res }: MyContext) {
    const upvote = await commentUpvoteRepository.findOne({
      where: { commentId: comment.id, creatorId: res.locals.userId },
    });

    if (!upvote) {
      return null;
    }
    return upvote.value === 1 ? upvote.value : -1;
  }

  @Authorized()
  @FieldResolver(() => Boolean)
  async isOwner(@Root() comment: Comment, @Ctx() { res }: MyContext) {
    const searchedComment = await commentRepository.findOne({
      relations: ["creator"],
      where: { id: comment.id },
    });

    if (searchedComment?.creator.id === res.locals.userId) {
      return true;
    } else {
      return false;
    }
  }

  @Authorized()
  @Mutation(() => CommentUpvoteResponse)
  async voteComment(
    @Arg("commentId") commentId: number,
    @Arg("value", () => Int) value: number,
    @Ctx() { res }: MyContext
  ): Promise<CommentUpvoteResponse> {
    const user = await userRepository.findOneBy({ id: res.locals.userId });
    const comment = await commentRepository.findOneBy({ id: commentId });

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
      where: { commentId: commentId, creatorId: res.locals.userId },
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
          await commentRepository.save(comment);
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
      await commentRepository.save(comment);
    } catch (err) {
      console.log(err);
    }

    return {
      commentUpvote: newUpvote,
    };
  }

  @Authorized()
  @Mutation(() => UserCommentResponse)
  async createComment(
    @Arg("content") content: string,
    @Arg("postId") postId: number,
    @Ctx() { res }: MyContext
  ): Promise<UserCommentResponse> {
    const user = await User.findOne({
      where: { id: res.locals.userId },
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

    const comment = new Comment();
    comment.post = post;
    comment.creator = user;
    comment.content = content;

    try {
      await comment.save();
    } catch (err) {
      console.log(err);
    }

    return {
      comment,
    };
  }

  @Query(() => [Comment], { nullable: true })
  async postComments(@Arg("postId") postId: number): Promise<Comment[] | null> {
    const post = await Post.findOneBy({ id: postId });
    if (!post) {
      return null;
    }
    const comments = await commentRepository.find({
      relations: ["post", "creator"],
      where: { post: { id: post.id } },
    });

    return comments;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteComment(
    @Arg("commentId") commentId: number,
    @Ctx() { res }: MyContext
  ) {
    const comment = await commentRepository.findOne({
      where: { id: commentId },
      relations: ["creator"],
    });
    if (!comment) {
      console.log("commentId error");
      return false;
    }

    if (comment.creator.id !== res.locals.userId) {
      console.log(`User not authorized`);
      return false;
    }

    try {
      await commentRepository.delete({ id: commentId });
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }
}
