/**
 * 404 Not Found 처리
 */
const logger = require("../config/logger");

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  logger.warn(`404 - Route not found - ${req.method} ${req.originalUrl}`);

  res.status(404);

  // Accept 헤더에 따라 JSON 또는 HTML 응답 선택
  if (req.accepts("json")) {
    res.json({
      error: "Not found",
      message: `The requested URL ${req.originalUrl} was not found on this server.`,
    });
  } else {
    res.type("txt").send("Not found");
  }
};

module.exports = notFoundHandler;
