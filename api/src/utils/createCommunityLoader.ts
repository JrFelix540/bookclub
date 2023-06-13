import DataLoader from "dataloader";
import { Community } from "../community/community.entity";

export const createCommunityLoader = () =>
  new DataLoader<number, Community>(async (communityIds) => {
    const communities = await Community.findByIds(communityIds as number[]);
    const communityIdToCommunity: Record<number, Community> = {};
    communities.forEach((comm) => {
      communityIdToCommunity[comm.id] = comm;
    });

    return communityIds.map(
      (communityId) => communityIdToCommunity[communityId]
    );
  });
