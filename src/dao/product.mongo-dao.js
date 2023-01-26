import ProductModel from "../models/product.model.js";

export const getProducts = async (query, options) => {
  try {
    const allProducts = await ProductModel.paginate(query, options);

    return allProducts;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProduct = async (productId) => {
  try {
    const requestedProduct = await ProductModel.findOne({
      _id: productId,
      deleted: false,
    });

    return requestedProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDeletedProduct = async (deletedCode) => {
  try {
    const deletedProduct = await ProductModel.findOneDeleted({
      code: deletedCode,
    });

    return deletedProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createProduct = async (productObject) => {
  try {
    const newProduct = await ProductModel.create(productObject);

    return newProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProduct = async (productId, productObject) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      productObject,
      { new: true }
    );

    return updatedProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProduct = async (productId) => {
  try {
    const deletedProductMessage = await ProductModel.delete({ _id: productId });

    return deletedProductMessage;
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
