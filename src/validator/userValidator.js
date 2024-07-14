/**
 * 사용자 Validator
 */
const { body } = require("express-validator");

exports.createUserValidator = [
  body("username")
    .isLength({ min: 3 })
    .withMessage("사용자 이름은 최소 3글자부터 입니다."),
  body("email").isEmail().withMessage("올바른 이메일 형식이 아닙니다."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("비밀번호는 최소 6글자입니다."),
];
