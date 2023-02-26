import CategoryModel from "../../models/mongodb/mongodb.category.model.js";

export const getCategories = async (query, options) => {
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

export const createCategory = async (data) => {
  try {
    return await CategoryModel.create(data);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateCategory = async (categoryId, query) => {
  try {
    return await CategoryModel.findByIdAndUpdate(categoryId, query, {
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
