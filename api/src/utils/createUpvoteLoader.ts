import DataLoader from "dataloader";
import { Upvote } from "../entities/";

export const createUpvoteLoader = () =>
  new DataLoader<
    { postId: number; creatorId: number },
    Upvote | null
  >(async (keys) => {
    const upvotes = await Upvote.findByIds(keys as any);
    const upvoteIdsToUpvotes: Record<string, Upvote> = {};
    upvotes.forEach((upvote) => {
      upvoteIdsToUpvotes[
        `${upvote.creatorId}/${upvote.postId}`
      ] = upvote;
    });

    return keys.map(
      (key) => upvoteIdsToUpvotes[`${key.creatorId}/${key.postId}`],
    );
  });
