export const isUserAuth = (userId: number | null) => {
  if (!userId) {
    return {
      error: [
        {
          field: "User",
          message: "User not authenticated",
        },
      ],
    };
  }
  return;
};
