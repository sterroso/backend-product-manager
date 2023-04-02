import * as CategoryService from "../dao/category.mongo-dao.js";
import * as constants from "../config/app.constants.js";

const isValidNumericParam = (param, includesZero = false) => {
  const numParam = Number(param ?? 0);

  return !isNaN(numParam) && // paramter IS a number,
    numParam > includesZero
    ? -1
    : 0 && // greater than / greater than or equal to zero,
        numParam % 1 === 0; // and it is an integer.
};

export const getCategories = async (req, res) => {
  let returnObject = {};
  let returnStatus = constants.Status200.OK.code;

  const { limit = 10, page = 1, offset, sortByName = "asc", name } = req.query;

  const options = {};

  if (isValidNumericParam(limit)) {
    options.customLabels = constants.PaginateCustomLabels;

    options.limit = Number(limit);

    if (isValidNumericParam(offset, true)) {
      options.offset = Number(offset);
    }

    options.page = isValidNumericParam(page) ? Number(page) : 1;
  } else {
    options.pagination = false;
    options.customLabels = constants.PaginateNoLabels;
  }

  if (["asc", "desc"].includes(sortByName)) {
    options.sort = { name: sortByName === "asc" ? 1 : -1 };
  }

  const query = {};

  if (name) {
    query.name = new RegExp(`${name}`, "gi");
  }

  try {
    const categories = await CategoryService.getAllCateogries(query, options);

    if ((categories?.totalRecords || 0) > 0) {
      // If the resuls contain a "limit" property ...
      if (categories?.limit) {
        let baseUrl = `${req.baseUrl}${req.path}`;

        baseUrl += `?limit=${categories.limit}`;

        baseUrl += categories?.offset ? `&offset=${categories.offset}` : "";

        if (query?.name) {
          baseUrl += `&name=${name}`;
        }

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

        categories.prevPageUrl = categories?.hasPrevPage
          ? `${baseUrl}&page=${categories.prevPage}`
          : null;

        categories.nextPageUrl = categories?.hasNextPage
          ? `${baseUrl}&page=${categories.nextPage}`
          : null;
      }

      returnObject = {
        ...categories,
        status: constants.Status200.OK.name,
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

  res.status(returnStatus).json(returnObject).end();
};

export const getCategoryById = async (req, res) => {
  const returnObject = {};
  let returnStatus = constants.Status200.OK.code;

  const { categoryId } = req.params;

  try {
    const category = await CategoryService.getCategoryById(categoryId);

    if (!category) {
      returnStatus = constants.Status400.NOT_FOUND.code;
      returnObject.status = constants.Status400.NOT_FOUND.name;
    } else {
      returnObject.status = constants.Status200.OK.name;
      returnObject.payload = category;
    }
  } catch (error) {
    returnStatus = constants.Status500.INTERNAL_SERVER_ERROR.code;

    returnObject.status = constants.Status500.INTERNAL_SERVER_ERROR.code;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject);
};

export const createCategory = async (req, res) => {
  const returnObject = {};
  let returnStatus = constants.Status200.CREATED.code;

  const { body } = req;

  try {
    const deletedCategoryWithMatchingName =
      await CategoryService.getDeletedCategory({ name: body.name });

    if (!deletedCategoryWithMatchingName) {
      const newCategory = await CategoryService.createCategory(body);

      returnObject.payload = newCategory;
    } else {
      const restoredCategory = await CategoryService.restoreCategory(
        deletedCategoryWithMatchingName._id
      );

      returnObject.payload = restoredCategory;
    }

    returnObject.status = constants.Status200.CREATED.name;
  } catch (error) {
    returnStatus = constants.Status500.INTERNAL_SERVER_ERROR.code;

    returnObject.status = constants.Status500.INTERNAL_SERVER_ERROR.name;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject);
};

export const updateCategory = async (req, res) => {
  const returnObject = {};
  let returnStatus = constants.Status200.OK.code;

  const { categoryId } = req.params;

  const { body } = req;

  try {
    const updatedCategory = await CategoryService.updateCategory(
      categoryId,
      body
    );

    returnObject.status = constants.Status200.OK.name;
    returnObject.payload = updatedCategory;
  } catch (error) {
    returnStatus = constants.Status500.INTERNAL_SERVER_ERROR.code;

    returnObject.status = constants.Status500.INTERNAL_SERVER_ERROR.name;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject);
};

export const deleteCategory = async (req, res) => {
  let returnStatus = constants.Status200.OK.code;
  const returnObject = {};

  const { categoryId } = req.params;

  try {
    const deleteResult = await CategoryService.deleteCategory(categoryId);

    returnObject.status = constants.Status200.OK.name;
    returnObject.payload = deleteResult;
  } catch (error) {
    returnStatus = constants.Status500.INTERNAL_SERVER_ERROR.code;

    returnObject.status = constants.Status500.INTERNAL_SERVER_ERROR.name;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject);
};
