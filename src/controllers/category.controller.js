import * as CategoryService from "../dao/category.mongo-dao.js";
import { HttpStatus, PaginateCustomLabels } from "../config/app.constants.js";
import * as constants from "../config/app.constants.js";
import ResponseObject from "../common/ResponseObject.ts";

const isValidNumericParam = (param, includesZero = false) => {
  const numParam = Number(param ?? 0);

  return !isNaN(numParam) && // paramter IS a number,
    numParam > includesZero
    ? -1
    : 0 && // greater than / greater than or equal to zero,
        numParam % 1 === 0; // and it is an integer.
};

export const getCategories = async (req, res) => {
  const responseObject = new ResponseObject(HttpStatus.OK);

  const { limit = 10, page = 1, offset, sortByName = "asc", name } = req.query;

  const options = {};

  options.customLabels = PaginateCustomLabels;

  options.limit = isValidNumericParam(limit) ? Number(limit) : 10;

  options.page = isValidNumericParam(page) ? Number(page) : 1;

  if (isValidNumericParam(offset, true)) {
    options.offset = Number(offset);
  }

  if (["asc", "desc"].includes(sortByName)) {
    options.sort = { name: sortByName === "asc" ? 1 : -1 };
  }

  const query = { deleted: false };

  if (name) {
    query.name = new RegExp(`${name}`, "gi");
  }

  try {
    const categories = await CategoryService.getAllCateogries(query, options);

    if ((categories?.totalRecords || 0) > 0) {
      responseObject.payload = categories?.payload || [];
      responseObject.limit = categories?.limit;
      responseObject.page = categories?.page;
      responseObject.offset = categories?.offset;
      responseObject.pagingCounter = categories?.pagingCounter;
      responseObject.hasNextPage = categories?.hasNextPage || false;
      responseObject.hasPrevPage = categories?.hasPrevPage || false;
      responseObject.nextPage = categories?.nextPage || null;
      responseObject.prevPage = categories?.prevPage || null;
      responseObject.nextPageLink = responseObject.getNextPageLink(
        req.baseUrl,
        req.path,
        options,
        query
      );
      responseObject.prevPageLink = responseObject.getPrevPageLink(
        req.baseUrl,
        req.path,
        options,
        query
      );
      responseObject.meta = categories?.meta || null;
    } else {
      responseObject.status = HttpStatus.NOT_FOUND;
    }
  } catch (error) {
    responseObject.status = HttpStatus.INTERNAL_SERVER_ERROR;
    responseObject.error = error;
  }

  res.status(responseObject.statusCode).json(responseObject.toJSON()).end();
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
