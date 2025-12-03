import { pool } from "../../config/db";

const createUser = async (name: string, age: number, email: string) => {
  const result = await pool.query(
    `INSERT INTO users(name,age,email)VALUES($1, $2, $3) RETURNING *`,
    [name, age, email]
  );
  return result;
};

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
