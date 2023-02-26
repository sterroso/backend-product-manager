import { StatusCode } from "../constants/constants.js";

const auth = (req, res, next) => {
  if (req.session.logged) {
    req.session.touch();
    next();
  } else {
    res
      .status(StatusCode.CLIENT_ERROR.UNAUTHORIZED)
      .send("User not authenticated.");
  }
};

export default auth;
