import { httpLogger as log } from "../utils/logger.js";

export default (req, res, next) => {
  req.logger = log;
  req.logger.info(
    `${new Date().toLocaleString("es-MX", {
      dateStyle: "short",
      timeStyle: "medium",
    })} ${req.method} @ ${req.path}; ?${req?.query || "NO QUERY"}`
  );
  next();
};
