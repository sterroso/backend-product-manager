import { Router } from "express";
import GithubPassport from "../utils/passport.util.js";

const router = Router();

router.get("/fail", (req, res) => {
  res.render("internalServerError", { title: "Internal Server Error" });
});

router.get(
  "/login",
  GithubPassport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/callback",
  GithubPassport.authenticate("github", {
    failureRedirect: "/api/github/fail",
  }),
  (req, res) => {
    res.render("userProfile", { title: "User Profile", user: req.user });
  }
);

export default router;
