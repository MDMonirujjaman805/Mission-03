import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
const loginUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  console.log({ email });
  console.log({ result });
  if (result.rows.length === 0) {
    return null;
  }
  const user = result.rows[0];
  console.log({ user });
  const matched = await bcrypt.compare(password, user.password);
  console.log({ matched });
  if (!matched) {
    return false;
  }
  const token = jwt.sign(
    { name: user.name, email: user.email, role: user.role },
    config.jwt_secret!,
    {
      expiresIn: "7d",
    }
  );
  console.log({ toke: token });
  return { token, user };
};

const authGetUser = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};


const authGetSingleUser = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result;
};

const authDeletedUser = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  return result;
};

export const authServices = {
  loginUser,
  authGetUser,
  authGetSingleUser,
  authDeletedUser,
};
