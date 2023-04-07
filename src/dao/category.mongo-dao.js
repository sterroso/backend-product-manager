/* --------------------------------- Imports -------------------------------- */
import CategoryModel from "../models/category.model.js";

/* -------------------------------------------------------------------------- */
/*                               Implementations                              */
/* -------------------------------------------------------------------------- */

/* ----------------------- Get all categories service ----------------------- */
/**
 * Provides all categories, or a filtered subset.
 *
 * @param {Object} query A mongo-style query to filter categories.
 * @param {Object} options A JSON-style object with options to retrieve
 * categories.
 * @returns A collection (array) of MongoDB documents containing the
 * categories filtered by query and options parameters.
 */
export const getAllCateogries = async (query, options) => {
  try {
    return await CategoryModel.paginate(query, options);
  } catch (error) {
    throw new Error(error.message);
  }
};

/* --------------- Get a single category, identified by its Id -------------- */
/**
 * Seeks a Category by its Id (_id).
 *
 * @param {ObjectId} categoryId A valid Category Id (_id).
 * @returns A MongoDB Document contining a category whose Id (_id) matches
 * the categoryId parameter.
 */
export const getCategoryById = async (categoryId) => {
  try {
    return await CategoryModel.findById(categoryId);
  } catch (error) {
    throw new Error(error.message);
  }
};

/* ----------- Get a single categorySchema, identified by its name ---------- */
/**
 * Seeks a Category by its name.
 *
 * @param {String} categoryName The Category's name.
 * @returns A MongoDB Document containing a Category whose name matches the
 * categoryName parameter.
 */
export const getCategoryByName = async (categoryName) => {
  try {
    const categoryNameRegExp = new RegExp(`${categoryName}`, "gi");

    return await CategoryModel.findOne({
      name: categoryNameRegExp,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

/* ------------------------ Finds a deleted category ------------------------ */
/**
 * Searches for a deleted category matching a filter's criteria.
 *
 * @param {Object} filter A Mongo-Style filter: { propertyName1: propertyValue1,
 * ..., propertyNameN: propertyValueN }
 * @returns The first deleted MongoDB Document containing a Category, matching
 * the filter's criteria.
 */
export const getDeletedCategory = async (filter) => {
  try {
    return await CategoryModel.findOne({ ...filter, deleted: true });
  } catch (error) {
    throw new Error(error.message);
  }
};

/* ----------------------- Restores a deleted category ---------------------- */
/**
 * Restored a deleted Category, filtered by it's Id (_id).
 *
 * @param {ObjectId} categoryId the deleted Category's Id (_id)
 * @returns The restored Category (MongoDB DOcument), whose Id matches
 * the categoryId parameter.
 */
export const restoreCategory = async (categoryId) => {
  try {
    return await CategoryModel.findByIdAndUpdate(
      categoryId,
      {
        $unset: ["deletedAt", "deletedBy"],
        $set: { deleted: false },
      },
      { new: true }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

/* ------------------------- Creates a new category ------------------------- */
/**
 * Creates a new Category with the specified properties' values.
 *
 * @param {Object} data An Object containing key-value pairs to define a
 * new Category and it's properties.
 * @returns The newly created Category.
 * @throws {Error} If the provided properties do not match a valid Category
 * schema/model.
 */
export const createCategory = async (data) => {
  try {
    return await CategoryModel.create(data);
  } catch (error) {
    throw new Error(error.message);
  }
};

/* ---------------- Updates a category, identified by its Id ---------------- */
/**
 * Updates a Category, identified by its Id (_id), with the provided properties.
 *
 * @param {ObjectId} categoryId A valid Category Id (_id)
 * @param {Object} data key-value pairs of a Category's properties.
 * @returns The updated Category.
 * @throws {Error} if the provided Id is not found or if the provided data
 * does not match a valid Category schema/model.
 */
export const updateCategory = async (categoryId, data) => {
  try {
    // Must use findOneAndUpdate method for mongoose-delete plugin to work.
    return await CategoryModel.findOneAndUpdate({ _id: categoryId }, data, {
      new: true,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

/* ---------------- Deletes a category, identified by its Id ---------------- */
/**
 * Deletes a Category identified by its Id (_id).
 *
 * @param {ObjectId} categoryId A valid Category Id (_id)
 * @returns An object with the statistics of the documents affected by the operation.
 */
export const deleteCategory = async (categoryId) => {
  try {
    return await CategoryModel.delete({ _id: categoryId });
  } catch (error) {
    throw new Error(error.message);
  }
};
