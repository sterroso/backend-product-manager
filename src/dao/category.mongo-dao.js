import CategoryModel from "../models/category.model.js";

export const getAllCateogries = async (query, options) => {
  try {
    return await CategoryModel.paginate(query, options);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCategory = async (categoryId) => {
  try {
    return await CategoryModel.findById(categoryId);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDeletedCategory = async (filter) => {
  try {
    return await CategoryModel.findOne({ ...filter, deleted: true });
  } catch (error) {
    throw new Error(error.message);
  }
};

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

export const createCategory = async (data) => {
  try {
    return await CategoryModel.create(data);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateCategory = async (categoryId, data) => {
  try {
    return await CategoryModel.findByIdAndUpdate(categoryId, data, {
      new: true,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    return await CategoryModel.findByIdAndDelete(categoryId);
  } catch (error) {
    throw new Error(error.message);
  }
};
