import { Router } from "express";
import { StatusCode, StatusString } from "../constants/constants.js";
import * as UserProvider from "../dao/user.mongo-dao.js";
import PassportLocal from "../utils/passport.util.js";

const router = Router();

router.get("/fail", (req, res) => {
  const returnObject = {
    status: StatusString.ERROR,
    error: "Failed to authenticate user.",
  };
  let returnStatus = StatusCode.CLIENT_ERROR.UNAUTHORIZED;

  res.status(returnStatus).json(returnObject).end();
});

router.post(
  "/signup",
  PassportLocal.authenticate("signup", {
    failureRedirect: "/api/passportLocal/fail",
  }),
  (req, res) => {
    const returnObject = {
      status: StatusString.SUCCESS,
      user: req.user,
    };
    let returnStatus = StatusCode.SUCCESSFUL.CREATED;

    req.session.logged = true;
    req.session.user = req.user;

    res.status(returnStatus).json(returnObject).end();
  }
);

router.post(
  "/login",
  PassportLocal.authenticate("login", {
    failureRedirect: "/api/passportLocal/fail",
  }),
  (req, res) => {
    const returnObject = {
      status: StatusString.SUCCESS,
      user: req.user,
    };
    let returnStatus = StatusCode.SUCCESSFUL.SUCCESS;

    req.session.logged = true;
    req.session.user = req.user;

    res.status(returnStatus).json(returnObject).end();
  }
);

export default router;
