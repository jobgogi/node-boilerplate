const ErrorResponse = require("../utils/errorResponse");
const logger = require("../config/logger");

/**
 * 서버의 각종 오류를 처리할 핸들러
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  logger.error(err);

  res.status(error.status || 500).json({
    status: error.status || 500,
    error: error.error || "Internal Server Error",
    path: error.path || req.originalUrl,
    timestamp: error.timestamp || new Date().toISOString(),
    details: error.details || {
      errorCode: 1000,
      errorMessage: error.message || "Something went wrong",
    },
  });
};

module.exports = errorHandler;
