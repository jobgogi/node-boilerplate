const OkResponse = require("../utils/okResponse");

const responseHandler = (req, res, next) => {
  res.sendResponse = (statusCode, data) => {
    const okResponse = new OkResponse(res);
    return okResponse.send(statusCode, data);
  };

  next();
};

module.exports = responseHandler;
