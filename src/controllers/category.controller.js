import * as CategoryService from "../services/mongodb/mongodb.category.service.js";
import {
  StatusString,
  StatusCode,
  CustomPaginationLabels,
  NoPaginationLabels,
} from "../constants/constants.js";

const formatCategory = (category) => {
  return {
    id: category._id,
    name: category.name,
    description: category.description,
  };
};

const formatCategories = (categories) =>
  categories.map((category) => formatCategory(category));

export const getCategories = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  const options = {};

  const query = {};

  const { limit, page, sort, ...filters } = req.query;

  const limitNumber = Number(limit ?? 0);

  if (!isNaN(limitNumber) && limitNumber > 0 && limitNumber % 1 === 0) {
    options.limit = limitNumber;

    options.customLabels = CustomPaginationLabels;

    const pageNumber = Number(page ?? 0);

    if (!isNaN(pageNumber) && limitNumber > 0 && limitNumber % 1 === 0) {
      options.page = pageNumber;
    } else {
      options.page = 1;
    }
  } else {
    options.pagination = false;
    options.customLabels = NoPaginationLabels;
  }

  if (["asc", "desc"].includes(sort)) {
    options.sort = {
      name: `${sort === "asc" ? 1 : -1}`,
    };
  }

  try {
    const categories = await CategoryService.getCategories(query, options);

    if (categories.length === 0) {
      returnStatus = StatusCode.CLIENT_ERROR.NOT_FOUND;

      returnObject.status = StatusString.EMPTY_RESULTSET;
      returnObject.error = "No categories were found.";
    } else {
      returnObject.status = StatusString.SUCCESS;
      returnObject.payload = formatCategories(categories);
    }
  } catch (error) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;

    returnObject.status = StatusString.FAIL;

    returnObject.error = error.message || "Could not get categories.";
  }

  res.status(returnStatus).json(returnObject);
};

export const getCategory = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  const { categoryId } = req.params;

  try {
    const category = await CategoryService.getCategory(categoryId);

    if (!category) {
      returnStatus = StatusCode.CLIENT_ERROR.NOT_FOUND;
      returnObject.status = StatusString.EMPTY_RESULTSET;
    } else {
      returnObject.status = StatusString.SUCCESS;
      returnObject.payload = formatCategory(category);
    }
  } catch (error) {
    returnStatus = StatusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR;

    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message || "Category not found.";
  }

  res.status(returnStatus).json(returnObject);
};

export const createCategory = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.CREATED;

  const { body } = req;

  try {
    const newCategory = formatCategory(
      await CategoryService.createCategory(body)
    );

    returnObject.status = StatusString.SUCCESS;
    returnObject.payload = {
      category: newCategory,
    };
  } catch (error) {
    returnStatus = StatusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR;

    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message || "Could not create a new category.";
  }

  res.status(returnStatus).json(returnObject);
};

export const updateCategory = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  const { categoryId } = req.params;

  const { body } = req;

  try {
    const updatedCategory = formatCategory(
      await CategoryService.updateCategory(categoryId, body)
    );

    returnObject.status = StatusString.SUCCESS;
    returnObject.payload = updatedCategory;
  } catch (error) {
    returnStatus = StatusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR;

    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message || "Could not update category.";
  }

  res.status(returnStatus).json(returnObject);
};

export const deleteCategory = async (req, res) => {
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;
  const returnObject = {};

  const { categoryId } = req.params;

  try {
    const deleteResult = await CategoryService.deleteCategory(categoryId);

    returnObject.status = StatusString.DELETED;
    returnObject.message = deleteResult;
  } catch (error) {
    returnStatus = StatusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR;

    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message || "Could not delete category.";
  }

  res.status(returnStatus).json(returnObject);
};
