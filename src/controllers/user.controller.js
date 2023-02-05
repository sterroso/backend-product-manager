import * as UserProvider from "../dao/user.mongo-dao.js";
import { StatusCode, StatusString } from "../constants/constants.js";

export const getUsers = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  try {
    const allUsers = await UserProvider.getUsers();

    if (allUsers.length > 0) {
      returnObject.status = StatusString.SUCCESS;
      returnObject.payload = allUsers;
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
      returnObject.payload = user;
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
        returnObject.payload = {
          user: {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
          },
        };
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
    returnObject.payload = newUser;
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
    returnObject.payload = updatedUser;
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