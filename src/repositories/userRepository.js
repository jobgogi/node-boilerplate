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

exports.findAll = async () => {
  const [rows] = await db.execute(
    "SELECT id, username, email, created_at FROM users"
  );

  return rows;
};

/**
 * 업데이트
 *
 * @param {*} id
 * @param {*} data
 * @returns
 */
exports.update = async (id, data) => {
  try {
    const [result] = await db.execute(
      "UPDATE users SET username = ? WHERE id = ?",
      [data.username, id]
    );

    if (result.affectedRows === 0) {
      throw new Error("User not found");
    }

    return true;
  } catch (err) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new Error("Username already exists");
    }
    throw error;
  }
};

exports.remove = async (id) => {
  try {
    const [result] = await db.execute("DELETE FROM users WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      throw new Error("User not found");
    }

    return true;
  } catch (err) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new Error("Username already exists");
    }
    throw error;
  }
};
