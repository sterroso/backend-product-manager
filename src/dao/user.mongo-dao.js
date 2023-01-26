import UserModel from "../models/user.model.js";

export const getUsers = async () => {
  try {
    const allUsers = await UserModel.find();

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
    const user = await UserModel.findOne({ email: userEmail, deleted: false });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createUser = async (userData) => {
  try {
    const newUser = await UserModel.create(userData);

    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUser = async (userId, userData) => {
  try {
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
