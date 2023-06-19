import DataLoader from "dataloader";
import { PostUpvote } from "../post-upvote/post-upvote.entity";

export const createUpvoteLoader = () =>
  new DataLoader<{ postId: number; creatorId: number }, PostUpvote | null>(
    async (keys) => {
      const upvotes = await PostUpvote.findByIds(keys as any);
      const upvoteIdsToUpvotes: Record<string, PostUpvote> = {};
      upvotes.forEach((upvote) => {
        upvoteIdsToUpvotes[`${upvote.creatorId}/${upvote.postId}`] = upvote;
      });

      return keys.map(
        (key) => upvoteIdsToUpvotes[`${key.creatorId}/${key.postId}`]
      );
    }
  );
