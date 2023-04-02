import CategoryModel from "../models/category.model.js";
import ProductModel from "../models/product.model.js";

export const getAllProducts = async (query, options) => {
  try {
    return await ProductModel.paginate(query, options);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductById = async (productId) => {
  try {
    return await ProductModel.findById(productId);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductByCode = async (productCode) => {
  try {
    return await ProductModel.findOne({ code: productCode });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDeletedProductById = async (productId) => {
  try {
    return await ProductModel.findOne({ deleted: true, _id: productId });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const restoreProductById = async (productId) => {
  try {
    await ProductModel.restore({ _id: productId });
    return await ProductModel.findByIdAndUpdate(
      productId,
      { $unset: { deteledAt: 1 } },
      { new: true }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDeletedProductByCode = async (productCode) => {
  try {
    return await ProductModel.findOne({ deleted: true, code: productCode });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const restoreProduct = async (productCode) => {
  try {
    await ProductModel.restore({ code: productCode });
    const restoredProduct = await ProductModel.findOneAndUpdate(
      { code: productCode },
      { $unset: { deletedAt: 1 } },
      { new: true }
    );

    return restoredProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createProduct = async (data) => {
  try {
    return await ProductModel.create(data);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProductById = async (productId, data) => {
  try {
    return await ProductModel.findByIdAndUpdate(productId, data, { new: true });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addCategoryToProduct = async (productId, categoryId) => {
  try {
    const existingProduct = await ProductModel.findById(productId);

    if (!existingProduct) {
      throw new Error(`No product was found with id ${productId}`);
    }

    const existsCategory = await CategoryModel.exists({ _id: categoryId });

    if (!existsCategory) {
      throw new Error(`No category was found with id ${categoryId}`);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProductCategories = async (productId, categories) => {};

export const removeCategoryFromProduct = async (productId, categoryId) => {};

export const deleteProductById = async (productId) => {
  try {
    return await ProductModel.findByIdAndDelete(productId);
  } catch (error) {
    throw new Error(error.message);
  }
};
