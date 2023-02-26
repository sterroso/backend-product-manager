import { StatusCode, StatusString } from "../constants/constants.js";
import * as AuthProvider from "../dao/auth.mongo-dao.js";
import * as UserProvider from "../dao/user.mongo-dao.js";

const formatUser = (user) => {
  return {
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    middleName: user.middleName,
    lastName: user.lastName,
    gender: user.gender,
    age: user.age,
    role: user.isAdmin ? "admin" : "user",
  };
};

export const login = async (req, res) => {
  const returnObject = {};
  let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

  const { email, password } = req.body;

  try {
    const userLogin = await AuthProvider.login(email, password);

    if (userLogin) {
      const loggedUser = await UserProvider.getUserByEmail(email);
      req.session.logged = true;
      req.session.user = formatUser(loggedUser);
      returnObject.user = formatUser(loggedUser);
    } else {
      returnStatus = StatusCode.CLIENT_ERROR.UNAUTHORIZED;
      returnObject.status = StatusString.ERROR;
      returnObject.error = "User could not be logged-in.";
    }
  } catch (error) {
    returnStatus = StatusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR;

    returnObject.status = StatusString.ERROR;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject);
};

export const logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res
        .status(StatusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR)
        .json({ status: StatusString.ERROR, error: error.message })
        .end();
    } else {
      res
        .status(StatusCode.SUCCESSFUL.SUCCESS)
        .json({
          status: StatusString.SUCCESS,
          message: "User logged out successfully.",
        })
        .end();
    }
  });
};
