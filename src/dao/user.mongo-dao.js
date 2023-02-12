import bcrypt from "bcrypt";
import UserModel from "../models/user.model.js";
import { BCRYPT_PASSWORD_HASH_ROUNDS } from "../constants/constants.js";

const getPasswordHash = async (plain) => {
  return await bcrypt.hash(
    plain,
    await bcrypt.genSalt(BCRYPT_PASSWORD_HASH_ROUNDS)
  );
};

export const getUsers = async () => {
  try {
    const allUsers = await UserModel.find({ deleted: false });

    return allUsers;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserById = async (userId) => {
  try {
    const user = await UserModel.findById(userId);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserByEmail = async (userEmail) => {
  try {
    const user = await UserModel.findOne({
      email: userEmail,
      deleted: false,
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createUser = async (userData) => {
  try {
    const userExists = await getUserByEmail(userData.email);

    if (userExists) {
      throw new Error("User already exists.");
    }

    const hashedPassword = await getPasswordHash(userData.password);

    userData = {
      ...userData,
      password: hashedPassword,
    };

    const newUser = await UserModel.create(userData);

    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUser = async (userId, userData, updatePassword = false) => {
  try {
    if (updatePassword) {
      if (userData.password) {
        const hashedPassword = await getPasswordHash(userData.password);

        userData = { ...userData, password: hashedPassword };
      } else {
        throw new Error("Password not provided");
      }
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, userData, {
      new: true,
    });

    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteUser = async (userId) => {
  try {
    const deletedMessage = await UserModel.delete({ _id: userId });

    return deletedMessage;
  } catch (error) {
    throw new Error(error.message);
  }
};
