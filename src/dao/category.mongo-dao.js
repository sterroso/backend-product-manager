import CategoryModel from "../models/category.model.js";

export const getCategories = async () => {
  try {
    const categories = await CategoryModel.find({ deleted: false });

    return categories;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCategory = async (categoryId) => {
  try {
    const category = await CategoryModel.findOne({
      _id: categoryId,
      deleted: false,
    });

    return category;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDeletedCategory = async (filter) => {
  try {
    const deletedCategory = await CategoryModel.findOneDeleted(filter);

    return deletedCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const restoreCategory = async (categoryId) => {
  try {
    await CategoryModel.restore({ _id: categoryId });
    const restoredCategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
      { $unset: { deletedAt: 1 } },
      { new: true }
    );

    return restoredCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createCategory = async (categoryObject) => {
  try {
    const newCategory = await CategoryModel.create(categoryObject);

    return newCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateCategory = async (categoryId, categoryObject) => {
  try {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
      categoryObject,
      { new: true }
    );

    return updatedCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const deletedCategory = await CategoryModel.delete({ _id: categoryId });

    return deletedCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};
