import logger from "../utils/logger.js";
import Clock from "../utils/datetime.js";

export default (req, res, next) => {
  logger.info(
    `${Clock.date({ style: "medium" })} ${Clock.time()}, Method: ${req.method}, URL: ${req.url}`
  );
  next();
};
