import * as constants from "../config/app.constants.js";
import * as CategoryService from "../dao/category.mongo-dao.js";
import * as ProductService from "../dao/product.mongo-dao.js";

const isValidNumberParam = (param, includesZero = false) => {
  const numParam = Number(param ?? 0);

  return !isNaN(numParam) && // param IS a number,
    numParam > includesZero
    ? -1
    : 0 && // grater than zero (or greather than or equal to zero),
        numParam % 1 === 0; // and it is an integer.
};

export const getAllProducts = async (req, res) => {
  let returnObject = {};
  let returnStatus = constants.Status200.OK.code;

  const {
    limit = 10,
    page = 1,
    offset = 0,
    sortByPrice = "desc",
    category,
    title,
  } = req.query;

  const options = {};

  if (isValidNumberParam(limit)) {
    options.customLabels = constants.PaginateCustomLabels;
    options.limit = Number(limit);

    options.page = isValidNumberParam(page) ? Number(page) : 1;

    if (isValidNumberParam(offset, true)) {
      options.offset = Number(offset);
    }
  } else {
    options.pagination = false;
    options.customLabels = constants.PaginateNoLabels;
  }

  if (["asc", "desc"].includes(sortByPrice)) {
    options.sort = { price: sortByPrice === "asc" ? 1 : -1 };
  }

  const query = {};

  if (category) {
    query.category = new RegExp(`${category}`, "gi");
  }

  if (title) {
    query.title = new RegExp(`${title}`, "gi");
  }

  try {
    const products = await ProductService.getAllProducts(query, options);

    if (products?.totalRecords > 0) {
      let baseUrl = `${req.baseUrl}${req.path}`;

      if (products?.limit) {
        baseUrl += `?limit=${products.limit}`;

        baseUrl += options?.offset > 0 ? `&offset=${options.offset}` : "";

        if (options?.sort) {
          Object.getOwnPropertyNames(options.sort).forEach((property) => {
            const sortByParameterName = `sortBy${property
              .charAt(0)
              .toUpperCase()}${property.substring(1)}`;

            baseUrl += `&${sortByParameterName}=${
              options.sort[property] === 1 ? "asc" : "desc"
            }`;
          });
        }

        if (query?.category) {
          baseUrl += `&category=${category}`;
        }

        if (query?.title) {
          baseUrl += `&title=${title}`;
        }
      }

      returnObject = {
        ...products,
        status: constants.Status200.OK.name,
        prevLink: products.hasPrevPage
          ? `${baseUrl}&page=${products.prevPage}`
          : null,
        nextLink: products.hasNextPage
          ? `${baseUrl}&page=${products.nextPage}`
          : null,
      };
    } else {
      returnStatus = constants.Status400.NOT_FOUND.code;

      returnObject.status = constants.Status400.NOT_FOUND.name;
    }
  } catch (error) {
    returnStatus = constants.Status500.INTERNAL_SERVER_ERROR.code;

    returnObject.status = constants.Status500.INTERNAL_SERVER_ERROR.name;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject);
};

export const getProductById = async (req, res) => {
  const returnObject = {};
  let returnStatus = constants.Status200.OK.code;

  const { productId } = req.params;

  try {
    const product = await ProductService.getProductById(productId);

    if (!product) {
      returnStatus = constants.Status400.NOT_FOUND.code;

      returnObject.status = constants.Status400.NOT_FOUND.name;
    } else {
      returnObject.status = constants.Status200.OK.name;
      returnObject.payload = product;
    }
  } catch (error) {
    returnStatus = constants.Status500.INTERNAL_SERVER_ERROR.code;
    returnObject.status = constants.Status500.INTERNAL_SERVER_ERROR.name;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject);
};

export const createProduct = async (req, res) => {
  const returnObject = {};
  let returnStatus = constants.Status200.CREATED.code;

  const { body } = req;

  try {
    const deletedProductWithMatchingCode =
      await ProductService.getDeletedProductByCode(body.code);

    if (!deletedProductWithMatchingCode) {
      const newProduct = await ProductService.createProduct(body);

      returnObject.status = constants.Status200.CREATED.name;
      returnObject.payload = newProduct;
    } else {
      const restoredProduct = await ProductService.restoreProduct(body.code);

      returnObject.status = constants.Status200.CREATED.name;
      returnObject.payload = restoredProduct;
    }
  } catch (error) {
    returnStatus = constants.Status500.INTERNAL_SERVER_ERROR.code;

    returnObject.status = constants.Status500.INTERNAL_SERVER_ERROR.name;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject);
};

export const updateProductById = async (req, res) => {
  const returnObject = {};
  let returnStatus = constants.Status200.OK.code;

  const { productId } = req.params;
  const { body } = req;

  try {
    const updatedProduct = await ProductService.updateProductById(
      productId,
      body
    );

    returnObject.status = constants.Status200.OK.name;
    returnObject.payload = updatedProduct;
  } catch (error) {
    returnStatus = constants.Status500.INTERNAL_SERVER_ERROR.code;

    returnObject.status = constants.Status500.INTERNAL_SERVER_ERROR.name;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject);
};

export const addCategoryToProduct = async (req, res) => {
  const returnObject = {};
  let returnStatus = constants.Status200.OK.code;

  const { productId, categoryId } = req.params;

  try {
    const existingCategory = await CategoryService.getCategoryById(categoryId);

    if (!existingCategory) {
      returnStatus = constants.Status400.NOT_FOUND.code;

      returnObject.status = constants.Status400.NOT_FOUND.code;
      returnObject.error = "No category was found with the provided categoryId";
    } else {
      const updatedProduct = await ProductService.addCategoryToProduct(
        productId,
        categoryId
      );

      returnObject.status = constants.Status200.OK.name;
      returnObject.payload = updatedProduct;
    }
  } catch (error) {
    returnStatus = constants.Status500.INTERNAL_SERVER_ERROR.code;

    returnObject.status = constants.Status500.INTERNAL_SERVER_ERROR.name;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject);
};

export const updateProductCategories = async (req, res) => {
  const returnObject = {};
  let returnStatus = constants.Status200.OK.code;

  const { productId } = req.params;

  const { categories } = req.query;

  try {
    const updatedProduct = await ProductService.updateProductCategories(
      productId,
      categories
    );

    if (!updatedProduct) {
      returnStatus = constants.Status400.NOT_FOUND.code;

      returnObject.status = constants.Status400.NOT_FOUND.name;
      returnObject.error = `No product was foudn with id ${productId}.`;
    } else {
      returnObject.status = constants.Status200.OK.name;
      returnObject.payload = updatedProduct;
    }
  } catch (error) {
    returnStatus = constants.Status500.INTERNAL_SERVER_ERROR.code;

    returnObject.status = constants.Status500.INTERNAL_SERVER_ERROR.name;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject);
};

export const removeCategoryFromProduct = async (req, res) => {
  const returnObject = {};
  let returnStatus = constants.Status200.OK.code;

  const { productId, categoryId } = req.params;

  try {
    const updatedProduct = await ProductService.removeCategoryFromProduct(
      productId,
      categoryId
    );

    if (!updatedProduct) {
      returnStatus = constants.Status400.NOT_FOUND.code;

      returnObject.status = constants.Status400.NOT_FOUND.name;
      returnObject.error = "Product and/or category not found.";
    } else {
      returnObject.status = constants.Status200.OK.name;
      returnObject.payload = updatedProduct;
    }
  } catch (error) {
    returnStatus = constants.Status500.INTERNAL_SERVER_ERROR.code;

    returnObject.status = constants.Status500.INTERNAL_SERVER_ERROR.name;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject);
};

export const deleteProductById = async (req, res) => {
  const returnObject = {};
  let returnStatus = constants.Status200.OK.code;

  const { productId } = req.params;

  try {
    const deletedProductResult = await ProductService.deleteProductById(
      productId
    );

    returnObject.status = constants.Status200.OK.name;
    returnObject.payload = deletedProductResult;
  } catch (error) {
    returnStatus = constants.Status500.INTERNAL_SERVER_ERROR.code;

    returnObject.status = constants.Status500.INTERNAL_SERVER_ERROR.name;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject);
};
