import * as UserService from "../services/mongodb/mongodb.user.service.js";
import {
  StatusCode,
  StatusString,
  CustomPaginationLabels,
  NoPaginationLabels,
} from "../constants/constants.js";

const formatUser = (record) => {
  return {
    id: record._id,
    email: record.email,
    firstName: record.firstName,
    middleName: record.middleName,
    lastName: record.lastName,
    gender: record.gender,
    age: record.age,
    role: record.role ?? "none",
  };
};

const formatUsers = (array) => array.map((record) => formatUser(record));

export const getUsers = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  const query = {};

  const options = {};

  const { limit, page, sort, ...filters } = req.query;

  try {
    const allUsers = await UserService.getUsers(query, options);

    if (allUsers.length > 0) {
      returnObject.status = StatusString.SUCCESS;
      returnObject.payload = formatUsers(allUsers);
    } else {
      returnStatus = StatusCode.CLIENT_ERROR.NOT_FOUND;
      returnObject.status = StatusString.NOT_FOUND;
    }
  } catch (error) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;

    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};

export const getUser = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  const { userId } = req.params;

  try {
    const user = await UserService.getUserById(userId);

    if (!user) {
      returnStatus = StatusCode.CLIENT_ERROR.NOT_FOUND;

      returnObject.status = StatusString.NOT_FOUND;
      returnObject.error = "User not found.";
    } else {
      returnObject.status = StatusString.SUCCESS;
      returnObject.payload = formatUser(user);
    }
  } catch (error) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;

    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};

export const getUserByEmail = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.ACCEPTED;

  const { userEmail, userPassword } = req.body;

  try {
    const user = await UserService.getUserByEmail(userEmail);

    if (user) {
      if (user.password === userPassword) {
        returnObject.status = StatusString.SUCCESS;
        returnObject.payload = formatUser(user);
      } else {
        returnStatus = StatusCode.CLIENT_ERROR.UNAUTHORIZED;
        returnObject.status = StatusString.ERROR;
        returnObject.error = "User not found.";
      }
    }
  } catch (error) {
    returnStatus = StatusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR;
    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject);
};

export const createUser = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  const { body } = req;

  try {
    const newUser = await UserService.createUser(body);

    returnObject.status = StatusString.SUCCESS;
    returnObject.payload = formatUser(newUser);
  } catch (error) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;

    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};

export const updateUser = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  const { userId } = req.params;
  const { body } = req;

  try {
    const updatedUser = await UserService.updateUser(
      userId,
      body,
      body.updatePassword
    );

    returnObject.status = StatusString.SUCCESS;
    returnObject.payload = formatUser(updatedUser);
  } catch (error) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;

    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};

export const deleteUser = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  const { userId } = req.params;

  try {
    const deletedMessage = await UserService.deleteUser(userId);

    returnObject.status = StatusString.DELETED;
    returnObject.message = deletedMessage;
  } catch (error) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;

    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};
