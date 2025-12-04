import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const createUser = async (payload: Record<string, unknown>) => {
  const { name, role, email, password } = payload;

  const hashPassword = await bcrypt.hash(password as string, 12);

  const result = await pool.query(
    `INSERT INTO users (name,role, email, password) VALUES ($1, $2, $3,$4) RETURNING *`,
    [name, role, email, hashPassword]
  );

  return result;
};

// export const userServices = { createUser };

const getUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const getUser = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result;
};

const updatedUser = async (
  name: string,
  age: number,
  email: string,
  id: string
) => {
  const result = await pool.query(
    `UPDATE users SET name=$1,age=$2,email=$3 WHERE id=$4 RETURNING*`,
    [name, age, email, id]
  );
  return result;
};

const deletedUsers = async () => {
  const result = await pool.query(`DELETE FROM users`);
  return result;
};

const deletedUser = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  return result;
};

export const userServices = {
  createUser,
  getUsers,
  getUser,
  updatedUser,
  deletedUser,
  deletedUsers,
};
