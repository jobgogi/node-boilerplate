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

/**
 * 사용자 전체 목록을 가져온다.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.list = async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    return res.sendResponse(200, users);
  } catch (err) {
    next(err);
  }
};

/**
 * 사용자 입력
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.getUserById = async (req, res, next) => {
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
    const { id } = req.params;
    const user = await userService.getUserById(id);
    return res.sendResponse(200, user);
  } catch (err) {
    next(err);
  }
};

/**
 * 사용자 업데이트
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.update = async (req, res, next) => {
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
    const { id } = req.params;
    const user = await userService.update(id, req.body);
    return res.sendResponse(200, user);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
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
    const { id } = req.params;
    await userService.remove(id);
    return res.sendResponse(204);
  } catch (err) {
    next(err);
  }
};
