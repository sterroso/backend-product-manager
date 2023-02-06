import * as UserProvider from "../dao/user.mongo-dao.js";
import { StatusCode, StatusString } from "../constants/constants.js";

const formatSingleRecord = (record) => {
  return {
    id: record._id,
    email: record.email,
    firstName: record.firstName,
    middleName: record.middleName,
    lastName: record.lastName,
    gender: record.gender,
    age: record.age,
    role: record.isAdmin ? "admin" : "user",
  };
};

const formatRecordsArray = (array) =>
  array.map((record) => formatSingleRecord(record));

export const getUsers = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  try {
    const allUsers = await UserProvider.getUsers();

    if (allUsers.length > 0) {
      returnObject.status = StatusString.SUCCESS;
      returnObject.payload = formatRecordsArray(allUsers);
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
    const user = await UserProvider.getUserById(userId);

    if (!user) {
      returnStatus = StatusCode.CLIENT_ERROR.NOT_FOUND;

      returnObject.status = StatusString.NOT_FOUND;
      returnObject.error = "User not found.";
    } else {
      returnObject.status = StatusString.SUCCESS;
      returnObject.payload = formatSingleRecord(user);
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
  const returnStatus = StatusCode.SUCCESSFUL.ACCEPTED;

  const { userEmail, userPassword } = req.body;

  try {
    const user = await UserProvider.getUserByEmail(userEmail);

    if (user) {
      if (user.password === userPassword) {
        returnObject.status = StatusString.SUCCESS;
        returnObject.payload = formatSingleRecord(user);
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
};

export const createUser = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  const { body } = req;

  try {
    const newUser = await UserProvider.createUser(body);

    returnObject.status = StatusString.SUCCESS;
    returnObject.payload = formatSingleRecord(newUser);
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
    const updatedUser = await UserProvider.updateUser(userId, body);

    returnObject.status = StatusString.SUCCESS;
    returnObject.payload = formatSingleRecord(updatedUser);
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
    const deletedMessage = await UserProvider.deleteUser(userId);

    returnObject.status = StatusString.DELETED;
    returnObject.message = deletedMessage;
  } catch (error) {
    returnStatus = StatusCode.CLIENT_ERROR.BAD_REQUEST;

    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject).end();
};
