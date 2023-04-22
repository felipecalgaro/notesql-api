import bcrypt from "bcrypt";

export const authService = {
  async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  },

  async hashPassword(password: string, salt = 10) {
    return await bcrypt.hash(password, salt);
  },
};
