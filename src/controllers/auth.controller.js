import * as constants from "../config/app.constants.js";
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
  let returnStatus = constants.Status200.OK.code;

  const { email, password } = req.body;

  try {
    const userLogin = await AuthProvider.login(email, password);

    if (userLogin) {
      const loggedUser = await UserProvider.getUserByEmail(email);
      req.session.logged = true;
      req.session.user = formatUser(loggedUser);

      returnObject.status = constants.Status200.OK.name;
      returnObject.payload = formatUser(loggedUser);
    } else {
      returnStatus = constants.Status400.UNAUTHORIZED.code;

      returnObject.status = constants.Status400.UNAUTHORIZED.name;
      returnObject.error = "User could not be logged-in.";
    }
  } catch (error) {
    returnStatus = constants.Status500.INTERNAL_SERVER_ERROR.code;

    returnObject.status = constants.Status500.INTERNAL_SERVER_ERROR.name;
    returnObject.error = error.message;
  }

  res.status(returnStatus).json(returnObject);
};

export const logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res
        .status(constants.Status500.INTERNAL_SERVER_ERROR.code)
        .json({
          status: constants.Status500.INTERNAL_SERVER_ERROR.name,
          error: error.message,
        })
        .end();
    } else {
      res
        .status(constants.Status200.OK.code)
        .json({
          status: constants.Status200.OK.name,
          message: "User logged out successfully.",
        })
        .end();
    }
  });
};
