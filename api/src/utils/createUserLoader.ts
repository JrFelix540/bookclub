import DataLoader from "dataloader";
import { User } from "../entities/";

export const createUserLoader = () =>
  new DataLoader<number, User>(async (userIds) => {
    const users = await User.findByIds(userIds as number[]);
    const userIdtoUser: Record<number, User> = {};
    users.forEach((u) => {
      userIdtoUser[u.id] = u;
    });

    console.log(userIds);
    return userIds.map((userId) => userIdtoUser[userId]);
  });
