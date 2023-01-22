import * as DataProvider from "../dao/product.mongo-dao.js";
import { StatusString, StatusCode } from "../constants/constants.js";

export const getProducts = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  try {
    const allProducts = await DataProvider.getProducts();

    if (allProducts.length === 0) {
      returnStatus = StatusCode.CLIENT_ERROR.NOT_FOUND;
      returnObject.status = StatusString.EMPTY_RESULTSET;
    } else {
      returnObject.status = StatusString.SUCCESS;
      returnObject.products = allProducts;
    }
  } catch (error) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;

    returnObject.status = StatusString.FAIL;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};

export const getProduct = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  const { productId } = req.params;

  try {
    const product = await DataProvider.getProduct(productId);

    if (!product) {
      returnStatus = StatusCode.CLIENT_ERROR.NOT_FOUND;
      returnObject.status = StatusString.EMPTY_RESULTSET;
    } else {
      returnObject.status = StatusString.SUCCESS;
      returnObject.product = product;
    }
  } catch (error) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;
    returnObject.status = StatusString.FAIL;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};

export const createProduct = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.CREATED;

  const { body } = req;

  try {
    const deletedProductWithMatchingCode = await DataProvider.getDeletedProduct(
      body.code
    );

    if (!deletedProductWithMatchingCode) {
      const newProduct = await DataProvider.createProduct(body);

      returnObject.product = newProduct;
    } else {
      const restoredProduct = await DataProvider.restoreProduct(body.code);

      returnObject.product = restoredProduct;
    }
  } catch (error) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;

    returnObject.status = StatusString.FAIL;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};

export const updateProduct = async (req, res) => {
  const returnObject = {};
  const returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  const { productId } = req.params;
  const { body } = req;

  try {
    const updatedProduct = await DataProvider.updateProduct(productId, body);

    returnObject.status = StatusString.SUCCESS;
    returnObject.product = updatedProduct;
  } catch (error) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;

    returnObject.status = StatusString.FAIL;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};

export const deleteProduct = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  const { productId } = req.params;

  try {
    const deletedProductResult = await DataProvider.deleteProduct(productId);

    returnObject.status = StatusString.DELETED;
    returnObject.result = deletedProductResult;
  } catch (error) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;

    returnObject.status = StatusString.FAIL;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};
