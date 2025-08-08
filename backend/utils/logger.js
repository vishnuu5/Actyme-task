const { createLogger, transports, format } = require("winston");
const path = require("path");

const logsDir = path.join(__dirname, "../logs");

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(logsDir, "app.log") }),
    new transports.File({
      filename: path.join(logsDir, "errors.log"),
      level: "error",
    }),
  ],
});

module.exports = logger;
