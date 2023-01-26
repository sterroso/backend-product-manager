import sanitize from "mongo-sanitize";
import * as ProductProvider from "../dao/product.mongo-dao.js";
import {
  StatusString,
  StatusCode,
  CustomPaginationLabels,
} from "../constants/constants.js";

export const getProducts = async (req, res) => {
  let returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  const query = {};

  const options = {};

  options.customLabels = CustomPaginationLabels;

  const { limit, page, sort, category, status } = req.query;

  const limitNumber = Number(limit ?? 0);

  if (!isNaN(limitNumber) && limitNumber > 0 && limitNumber % 1 === 0) {
    options.limit = limitNumber;

    const pageNumber = Number(page ?? 0);

    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber % 1 === 0) {
      options.page = pageNumber;
    } else {
      options.page = 1;
    }
  } else {
    options.pagination = false;
  }

  let priceSortParam = sanitize(sort);

  if (["asc", "desc"].includes(priceSortParam)) {
    options.sort = `{ price: ${priceSortParam === "asc" ? "1" : "-1"} }`;
  }

  let categoryFilter = sanitize(category);

  if (categoryFilter) {
    query.category = categoryFilter;
  }

  let statusFilter = sanitize(status);

  if (["true", "false"].includes(statusFilter)) {
    query.status = statusFilter;
  }

  try {
    const result = await ProductProvider.getProducts(query, options);

    if (result.payload.length > 0) {
      const { hasPrevPage, hasNextPage } = result;
      const { baseUrl, path } = req;

      let linkBuilder = "";

      if (options.sort) {
        linkBuilder = `&sort=${options.sort === 1 ? "asc" : "desc"}`;
      }

      if (query.category) {
        linkBuilder = `${linkBuilder}&category=${query.category}`;
      }

      if (query.status) {
        linkBuilder = `${linkBuilder}&status=${query.status}`;
      }

      returnObject = { ...result };
      returnObject.status = StatusString.SUCCESS;
      returnObject.prevLink = hasPrevPage
        ? `${baseUrl}${path}?limit=${options.limit}&page=${result.prevPage}${linkBuilder}`
        : null;
      returnObject.nextLink = hasNextPage
        ? `${baseUrl}${path}?limit=${options.limit}&page=${result.nextPage}${linkBuilder}`
        : null;
    } else {
      returnStatus = StatusCode.CLIENT_ERROR.NOT_FOUND;
      returnObject.status = StatusString.ERROR;
    }
  } catch (error) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;

    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};

export const getProduct = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  const { productId } = req.params;

  try {
    const product = await ProductProvider.getProduct(productId);

    if (!product) {
      returnStatus = StatusCode.CLIENT_ERROR.NOT_FOUND;
      returnObject.status = StatusString.ERROR;
      returnObject.error = "Product not found.";
    } else {
      returnObject.status = StatusString.SUCCESS;
      returnObject.payload = product;
    }
  } catch (error) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;
    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};

export const createProduct = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.CREATED;

  const { body } = req;

  try {
    const deletedProductWithMatchingCode =
      await ProductProvider.getDeletedProduct(body.code);

    if (!deletedProductWithMatchingCode) {
      const newProduct = await ProductProvider.createProduct(body);

      returnObject.payload = newProduct;
    } else {
      const restoredProduct = await ProductProvider.restoreProduct(body.code);

      returnObject.payload = restoredProduct;
    }
  } catch (error) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;

    returnObject.status = StatusString.ERROR;
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
    const updatedProduct = await ProductProvider.updateProduct(productId, body);

    returnObject.status = StatusString.SUCCESS;
    returnObject.payload = updatedProduct;
  } catch (error) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;

    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};

export const deleteProduct = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  const { productId } = req.params;

  try {
    const deletedProductResult = await ProductProvider.deleteProduct(productId);

    returnObject.status = StatusString.DELETED;
    returnObject.payload = deletedProductResult;
  } catch (error) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;

    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};
