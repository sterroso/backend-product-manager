const auth = (req, res, next) => {
  if (req.session.loggedIn) {
    req.session.touch();
    next();
  }

  res.status(403).send("User not authenticated.");
};

export default auth;
