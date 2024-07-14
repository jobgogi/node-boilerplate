/**
 * 사용자 Validator
 */
const { body, param } = require("express-validator");

exports.createUserValidator = [
  body("username")
    .notEmpty()
    .withMessage("사용자 이름은 필수 항목입니다.")
    .isLength({ min: 3 })
    .withMessage("사용자 이름은 최소 3글자부터 입니다.")
    .trim()
    .escape(),
  body("email")
    .notEmpty()
    .withMessage("이메일은 필수 항목입니다.")
    .isEmail()
    .withMessage("올바른 이메일 형식이 아닙니다."),
  body("password")
    .notEmpty()
    .withMessage("비밀번호는 필수 항목입니다.")
    .isLength({ min: 6 })
    .withMessage("비밀번호는 최소 6글자입니다."),
];

exports.getUserByIdValidator = [
  param("id").isInt().withMessage("사용자 아이디는 숫자만 가능합니다."),
];

/**
 * 업데이트 validator
 */
exports.updateValidator = [
  param("id").isInt().withMessage("사용자 아이디는 숫자만 가능합니다."),
  body("username")
    .notEmpty()
    .withMessage("사용자 이름은 필수입니다.")
    .isLength({ min: 3 })
    .withMessage("사용자 이름은 최소 3글자부터 입니다."),
];
