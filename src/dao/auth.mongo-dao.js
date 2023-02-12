import bcrypt from "bcrypt";
import * as UserProvider from "./user.mongo-dao.js";

export const login = async (email, password) => {
  try {
    const existingUser = await UserProvider.getUserByEmail(email);

    if (!existingUser) {
      throw new Error("User does not exist.");
    }

    return await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    throw new Error(error.message);
  }
};
