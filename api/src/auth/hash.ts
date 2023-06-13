import bcrypt from "bcryptjs";

const PASSWORD_SALT_LENGTH = 10;

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, PASSWORD_SALT_LENGTH);
};
