import { ObjectId } from "mongoose";
import CartModel from "../../models/mongodb/mongodb.cart.model.js";
import UserModel from "../../models/mongodb/mongodb.user.model.js";

/**
 * Returns a page of the user's collection, or the whole collection,
 * depending on the options passed through the *options* parameter.
 *
 * Results can be filtered using the *query* parameter to pass a
 * MongoDB-style query.
 *
 * @param {Object} query A MongoDB-style query to search the users
 * by their properties: *email*, *firstName*, *lastName*, *dateOfBirth*,
 * *gender*.
 * @param {Object} options An object with the *sort*, *limit* and *page*
 * options.
 * @returns A page of the user's collection.
 */
export const getUsers = async (query, options) => {
  try {
    return await UserModel.paginate(query, options);
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Returns a user identified by its id (_id).
 *
 * @param {ObjectId} userId The user's id (_id).
 * @returns A user whose *id* (*_id*) matches the value of th *userId*
 * parameter provided.
 */
export const getUserById = async (userId) => {
  try {
    return await UserModel.findById(userId);
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Returns a user identified by its e-mail.
 *
 * @param {String} email The user's e-mail.
 * @returns A user whose e-mail matches the value of the *email*
 * parameter provided.
 */
export const getUserByEmail = async (email) => {
  try {
    return await UserModel.findOne({ email });
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Creates a new user in the database.
 *
 * @param {Object} data An object containing the properties and values
 * of the new user: *email*, *firstName*, *middleName?*, *lastName*,
 * *password*, *gender*, *dateOfBirh*, *role*, and *cart?*.
 * @returns The recentrly created user.
 * @throws Error if a user with the same e-mail is found already in
 * the database.
 */
export const createUser = async (data) => {
  try {
    const userExists = await UserModel.exists({ email: data.email });

    if (userExists) throw new Error("User already exists.");

    const newUser = await UserModel.create(data);

    const newCart = await CartModel.create({ items: [] });

    return await newUser.update({ $set: { cart: newCart._id } }, { new: true });
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Updates a user identified by its id.
 *
 * @param {ObjectId} userId Id of the uset to be updated.
 * @param {Object} query An object containing the properties and values
 * to be updated: *email*, *firstName*, *middleName*, *lastName*, *gender*,
 * *dateOfBirth*, *role*, *cart*.
 * @returns The updated user.
 * @throws Error if the user is not found.
 */
export const updateUser = async (userId, query) => {
  try {
    const userExists = await UserModel.exists({ _id: userId, deletec: false });

    if (!userExists) throw new Error("User not found.");

    return await UserModel.findByIdAndUpdate(userId, query, { new: true });
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Updates a user's password.
 *
 * @param {ObjectId} userId Id of the user whose password is to be updated.
 * @param {String} newPassword A hased password.
 * @returns The updated user.
 * @throws Error if the user is not found.
 */
export const updateUserPassword = async (userId, newPassword) => {
  try {
    const userExists = await UserModel.exists({ _id: userId, deleted: false });

    if (!userExists) throw new Error("User not found.");

    return await UserModel.findByIdAndUpdate(
      userId,
      { password: newPassword },
      { new: true }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Deletes a user identified by its id.
 *
 * @param {ObjectId} userId Id of the user to be deleted.
 * @returns an object with the elete operation statistics.
 * @throws Error if the user is not found.
 */
export const deleteUser = async (userId) => {
  try {
    const userExists = await UserModel.exists({ _id: userId, deleted: false });

    if (!userExists) throw new Error("User not found.");

    return await UserModel.findByIdAndDelete(userId);
  } catch (error) {
    throw new Error(error.message);
  }
};
