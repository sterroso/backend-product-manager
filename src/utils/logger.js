import { createLogger, transports, format } from "winston";

export const httpLogger = createLogger({
  transports: [
    new transports.Console({
      level: "http",
      format: format.simple(),
    }),
    new transports.File({
      level: "warn",
      filename: "./logs/http.warn.log",
    }),
  ],
});

export const errorLogger = createLogger({
  transports: [
    new transports.File({
      level: "error",
      filename: "./logs/error.log",
    }),
  ],
});

const infoLogger = createLogger({
  transports: [
    new transports.Console({
      level: "info",
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

export default infoLogger;
