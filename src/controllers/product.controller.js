import * as ProductService from "../services/mongodb/mongodb.product.service.js";
import * as ProductProvider from "../dao/product.mongo-dao.js";
import {
  StatusString,
  StatusCode,
  CustomPaginationLabels,
  NoPaginationLabels,
} from "../constants/constants.js";

const formatProduct = (product) => {
  return {
    id: product._id,
    code: product.code,
    title: product.title,
    description: product.description,
    category: product.category,
    price: Number(product.price),
    stock: product.stock,
    status: product.status,
    thumbnails: product.thumbnails,
  };
};

const formatProducts = (products) =>
  products.map((product) => formatProduct(product));

export const getProducts = async (req, res) => {
  let returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  const query = {};

  const options = {};

  const { limit, page, sortByPrice, minPrice, maxPrice, category, search } =
    req.query;

  // If limit parameter is passed, converts it to a number, otherwise turns it to 0.
  const limitNumber = Number(limit ?? 0);

  // If converted parameter is an integer number greater than 0 ...
  if (!isNaN(limitNumber) && limitNumber > 0 && limitNumber % 1 === 0) {
    // ... sets custom labels options,
    options.customLabels = CustomPaginationLabels;

    // sets a limit,
    options.limit = limitNumber;

    // If page parameter is passed, converts it to a number, otherwise turns it to 0.
    const pageNumber = Number(page ?? 0);

    // If converted parameter is an integer number grater than 0 ...
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber % 1 === 0) {
      // ... sets the page option.
      options.page = pageNumber;
    } else {
      // ... otherwise page is 1
      options.page = 1;
    }
  } else {
    // ... otherwise sets no paging labels options,
    options.customLabels = NoPaginationLabels;
    // and no pagination to find
    options.pagination = false;
  }

  // If sortByPrice parameter is "asc" or "desc" ...
  if (["asc", "desc"].includes(sortByPrice)) {
    // ... sets sorting options
    options.sort = {
      price: sortByPrice === "asc" ? 1 : -1,
    };
  }

  // by default searches only undeleted products.
  query.deleted = false;

  // and only available products (stock > 0)
  query.stock = {
    $gt: 0,
  };

  // If minPrice parameter is passed, convertis it to a number, otherwise sets it to 0
  const minPriceNumber = Number(minPrice ?? 0);

  // If converted parameter is a number greater than 0...
  if (!isNaN(minPriceNumber) && minPriceNumber >= 0) {
    // ... sets query filter for minimum price.
    query.price = { $gte: minPriceNumber };
  }

  // If maxPrice parameter is passed, converts it to a number,
  // otherwise sets it to 0.
  const maxPriceNumber = Number(maxPrice ?? 0);

  // If converted parameter is a number greater than minPriceNumber ...
  if (!isNaN(maxPriceNumber) && maxPriceNumber > minPriceNumber) {
    // ... sets query filter for maximun price.
    query.price.$lte = maxPriceNumber;
  }

  // If category parameter is passed ...
  if (category) {
    // ... sets category query filter.
    query.category = category;
  }

  // If the search parameter is passed ...
  if (search) {
    // ... sets text search query filter,
    query.$text = { $search: search };
    // and returns a score
    query.score = { $meta: "textScore" };
    // to sort results by relevance
    options.sort.score = { $meta: "textScore" };
  }

  try {
    const result = await ProductService.getProducts(query, options);

    if (result.payload.length > 0) {
      const { hasPrevPage, hasNextPage } = result;
      const { baseUrl, path } = req;

      let linkBuilder = "";

      if (options.sort) {
        linkBuilder = `&sortByPrice=${options.sort === 1 ? "asc" : "desc"}`;
      }

      if (query.price.$gte) {
        linkBuilder += `&minPrice=${minPriceNumber}`;
      }

      if (query.price.$lte) {
        linkBuilder += `&maxPrice=${maxPriceNumber}`;
      }

      if (query.category) {
        linkBuilder += `&category=${category}`;
      }

      if (query.$text) {
        linkBuilder += `&search=${search}`;
      }

      returnObject = { ...result };
      returnObject.status = StatusString.SUCCESS;
      returnObject.payload = formatProducts(result.payload);
      returnObject.prevLink = hasPrevPage
        ? `${baseUrl}${path}?limit=${options.limit}&page=${result.prevPage}${linkBuilder}`
        : null;
      returnObject.nextLink = hasNextPage
        ? `${baseUrl}${path}?limit=${options.limit}&page=${result.nextPage}${linkBuilder}`
        : null;
    } else {
      returnStatus = StatusCode.CLIENT_ERROR.NOT_FOUND;

      returnObject.status = StatusString.ERROR;
      returnObject.error = "No products were found.";
    }
  } catch (error) {
    returnStatus = StatusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR;

    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject);
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
      returnObject.payload = formatProduct(product);
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

  const { user } = req.session.cookie;

  try {
    const deletedProductWithMatchingCode =
      await ProductProvider.getDeletedProduct(body.code);

    if (!deletedProductWithMatchingCode) {
      const newProduct = await ProductProvider.createProduct(body);

      returnObject.payload = formatProduct(newProduct);
    } else {
      const restoredProduct = await ProductProvider.restoreProduct(body.code);

      returnObject.status = StatusString.SUCCESS;
      returnObject.payload = formatProduct(restoredProduct);
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
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  const { productId } = req.params;
  const { body } = req;

  try {
    const updatedProduct = await ProductProvider.updateProduct(productId, body);

    returnObject.status = StatusString.SUCCESS;
    returnObject.payload = formatProduct(updatedProduct);
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

    returnObject.status = StatusString.SUCCESS;
    returnObject.payload = deletedProductResult;
  } catch (error) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;

    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};
