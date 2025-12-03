import { pool } from "../../config/db";

const createTodo = async (
  user_id: number,
  title: string,
  description: string
) => {
  const result = await pool.query(
    `INSERT INTO todos(user_id, title  , description ) VALUES($1, $2, $3) RETURNING *`,
    [user_id, title, description]
  );
  return result;
};

const getTodos = async () => {
  const result = await pool.query(`SELECT * FROM todos`);
  return result;
};

const getTodo = async (id: string) => {
  const result = await pool.query(`SELECT * FROM todos WHERE id = $1`, [id]);
  return result;
};

const updatedTodo = async (
  user_id: number,
  title: string,
  description: string,
  id: number
) => {
  const result = await pool.query(
    `UPDATE todos SET user_id=$1,title=$2,description=$3 WHERE id=$4 RETURNING*`,
    [user_id, title, description, id]
  );
  return result;
};

const deleteTodo = async (id: any) => {
  const result = await pool.query(`DELETE FROM todos WHERE id = $1`, [id]);
  return result;
};

const deleteTodos = async () => {
  const result = await pool.query(`DELETE FROM todos`);
  return result;
};

export const todoService = {
  createTodo,
  getTodos,
  getTodo,
  updatedTodo,
  deleteTodo,
  deleteTodos,
};
