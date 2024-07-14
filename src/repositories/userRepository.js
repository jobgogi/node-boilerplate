const db = require("../config/database");

/**
 * 사용자 생성
 * @param {*} user
 */
exports.create = async (user) => {
  const [result] = await db.execute(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [user.username, user.email, user.password]
  );

  return result.insertId;
};

/**
 * 사용자 아이디로 사용자 정보를 가져온다.
 * @param {*} id
 * @returns
 */
exports.findById = async (id) => {
  const [rows] = await db.execute(
    "SELECT id, username, email, created_at FROM users WHERE id = ?",
    [id]
  );
  return rows[0];
};

/**
 * 이메일로 사용자 정보를 찾는다.
 *
 * @param {*} email
 * @returns
 */
exports.findByEmail = async (email) => {
  const [rows] = await db.execute(
    "SELECT id, username, email, password, created_at FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
};
