const { validationResult } = require("express-validator");
const ErrorResponse = require("../utils/errorResponse");
const logger = require("../config/logger");
const userService = require("../services/userService");

/**
 * 사용자 생성
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.create = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const [{ msg }] = errors.errors;
    return next(
      new ErrorResponse(400, "ValidationError", req.originalUrl, {
        errorCode: 9400,
        errorMessage: msg,
      })
    );
  }

  try {
    const user = await userService.createUser(req.body);
    return res.sendResponse(201, user);
  } catch (err) {
    next(err);
  }
};
