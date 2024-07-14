const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/userRepository");
const ErrorResponse = require("../utils/errorResponse");

/**
 * 사용자 생성
 *
 * @param {*} data
 * @returns
 */
exports.createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const prevUser = await userRepository.findByEmail(data.email);

  if (prevUser) {
    throw new ErrorResponse(400, "Not found user", "", {
      errorCode: 1100,
      errorMessage: "이미 존재하는 아이디입니다.",
    });
  }

  const user = {
    username: data.username,
    email: data.email,
    password: hashedPassword,
  };

  const userId = await userRepository.create(user);
  return await this.getUserById(userId);
};

/**
 * id로 사용자 정보를 가져온다.
 *
 * @param {*} id
 */
exports.getUserById = async (id) => {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new ErrorResponse(400, "Not found userId", "", {
      errorCode: 1110,
      errorMessage: "존재하지 않는 아이디입니다.",
    });
  }
  return user;
};

/**
 * 사용자 전체 목록
 *
 * @returns
 */
exports.getUsers = async () => {
  const users = await userRepository.findAll();
  return users;
};

/**
 *
 * @param {*} id
 * @param {*} data
 * @returns
 */
exports.update = async (id, data) => {
  try {
    await userRepository.update(id, data);
    const user = await this.getUserById(id);
    return user;
  } catch (err) {
    throw err;
  }
};
