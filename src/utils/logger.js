import { createLogger, transports, format } from "winston";

const logger = createLogger({
  transports: [
    new transports.Console({
      level: "silly",
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

export default logger;
