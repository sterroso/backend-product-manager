import ProductModel from "../../models/mongodb/mongodb.product.model.js";

export const getProducts = async (query, options) => {
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

export const createProduct = async (data) => {
  try {
    return await ProductModel.create(data);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProduct = async (productId, query) => {
  try {
    return await ProductModel.findByIdAndUpdate(productId, query, {
      new: true,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProduct = async (productId) => {
  try {
    return await ProductModel.findByIdAndDelete(productId);
  } catch (error) {
    throw new Error(error.message);
  }
};
