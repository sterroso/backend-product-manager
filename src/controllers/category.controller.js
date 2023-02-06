import * as CategoryProvider from "../dao/category.mongo-dao.js";
import { StatusString, StatusCode } from "../constants/constants.js";

const formatSingleRecord = (record) => {
  return {
    id: record._id,
    name: record.name,
    related: record.related,
  };
};

const formatRecordArray = (array) =>
  array.map((record) => formatSingleRecord(record));

export const getCategories = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  try {
    const categories = await CategoryProvider.getCategories();

    if (categories.length === 0) {
      returnStatus = StatusCode.CLIENT_ERROR.NOT_FOUND;
      returnObject.status = StatusString.EMPTY_RESULTSET;
    } else {
      returnObject.status = StatusString.SUCCESS;
      returnObject.payload = formatRecordArray(categories);
    }
  } catch (error) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;

    returnObject.status = StatusString.FAIL;

    returnObject.error = error.message || "Could not get categories.";
  }

  res.status(returnStatus).json(returnObject).end();
};

export const getCategory = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  const { categoryId } = req.params;

  try {
    const category = await CategoryProvider.getCategory(categoryId);

    if (!category) {
      returnStatus = StatusCode.CLIENT_ERROR.NOT_FOUND;
      returnObject.status = StatusString.EMPTY_RESULTSET;
    } else {
      returnObject.status = StatusString.SUCCESS;
      returnObject.payload = formatSingleRecord(category);
    }
  } catch (error) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;

    returnObject.status = StatusString.FAIL;

    returnObject.error = error.message || "Could not get category.";
  }

  res.status(returnStatus).json(returnObject);
};

export const createCategory = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.CREATED;

  const { body } = req;

  try {
    const deletedCategoryWithMatchingName =
      await CategoryProvider.getDeletedCategory({ name: body.name });

    if (!deletedCategoryWithMatchingName) {
      const newCategory = await CategoryProvider.createCategory(body);

      returnObject.payload = formatSingleRecord(newCategory);
    } else {
      const restoredCategory = await CategoryProvider.restoreCategory(
        deletedCategoryWithMatchingName._id
      );

      returnObject.payload = formatSingleRecord(restoredCategory);
    }

    returnObject.status = StatusString.SUCCESS;
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
    const updatedCategory = await CategoryProvider.updateCategory(
      categoryId,
      body
    );

    returnObject.status = StatusString.SUCCESS;
    returnObject.payload = formatSingleRecord(updatedCategory);
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
    const deleteResult = await CategoryProvider.deleteCategory(categoryId);

    returnObject.status = StatusString.DELETED;
    returnObject.result = deleteResult;
  } catch (error) {
    returnStatus = StatusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR;

    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message || "Could not delete category.";
  }

  res.status(returnStatus).json(returnObject);
};
