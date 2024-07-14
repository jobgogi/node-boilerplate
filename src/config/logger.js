/**
 * winston 로그 설정
 *
 */
const winston = require("winston");
const path = require("path");
require("winston-daily-rotate-file");

const logDir = "logs";

/**
 * 로그 포맷 지정
 */
const customFormat = winston.format.printf(
  ({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level}] : ${message} `;
    if (metadata.req) {
      msg += `${metadata.req.method} ${metadata.req.originalUrl} `;
      if (metadata.res) {
        msg += `${metadata.res.statusCode} ${metadata.responseTime}ms`;
      }
    }
    if (metadata.error) {
      msg += `\n${metadata.error.stack}`;
    }
    return msg;
  }
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    customFormat
  ),
  defaultMeta: { service: "SERVICE_NAME" },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), customFormat),
    }),
  ],
});

// Production일 때 파일 로깅 추가 (로그 로테이션 포함)
if (process.env.NODE_ENV === "production") {
  logger.add(
    new winston.transports.DailyRotateFile({
      filename: path.join(logDir, "error-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      level: "error",
    })
  );
  logger.add(
    new winston.transports.File({
      filename: path.join(logDir, "combined-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    })
  );
}

module.exports = logger;
