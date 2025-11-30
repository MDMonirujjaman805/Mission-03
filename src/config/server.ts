import express, { json, Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const app = express();
const port = 5000;

// parser
app.use(express.json());

// DataBase
const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STRING}`,
});

const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        age INT,
        email VARCHAR(150) UNIQUE NOT NULL,
        phone VARCHAR(15),
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);
  await pool.query(`
        CREATE TABLE IF NOT EXISTS todos(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT false,
        due_date DATE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);
};
initDB();

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello World! My name is Monir.");
//   console.log(req.method);
//   console.log(req.path);
// });

// Users Post CRUD
app.post("/users", async (req: Request, res: Response) => {
  const { name, age, email } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users(name,age,email)VALUES($1, $2, $3) RETURNING *`,
      [name, age, email]
    );
    // console.log(result.rows[0]);
    res.status(201).json({
      success: false,
      message: "Data Inserted Successfully.",
      data: result.rows[0],
    });

    console.log("Data Inserted Successfully in:", result.rows[0]); //optional
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: error.message, details: error });
  }
});

// users Get CRUD
app.get("/users", async (req: Request, res: Response) => {
  //   const { name, age, email } = req.body;
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.status(202).json({
      success: true,
      message: "Users Retrieved Successfully.",
      length: result.rows.length,
      data: result.rows,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: error.message, details: error });
  }
});

// single user Get CRUD
app.get("/users/:id", async (req: Request, res: Response) => {
  // console.log(req.params);
  // res.send({ message: "APi is cool" });
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: true,
        message: "User Not Found.",
      });
    } else {
      res.status(202).json({
        success: true,
        message: "User fetched successfully.",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: error.message, details: error });
  }
});

// single user Put CRUD
app.put("/users/:id", async (req: Request, res: Response) => {
  const { name, age, email } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET name=$1,age=$2,email=$3 WHERE id=$4 RETURNING*`,
      [name, age, email, req.params.id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: true,
        message: "User Not Found.",
      });
    } else {
      res.status(202).json({
        success: true,
        message: "User updated successfully.",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: error.message, details: error });
  }
});

// single user Delete CRUD
app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [
      req.params.id,
    ]);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: true,
        message: "User Not Found.",
      });
    } else {
      res.status(202).json({
        success: true,
        message: "User Deleted successfully.",
        // data1: result.rows[0],
        // data2: result.rows,
        data3: null,
      });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: error.message, details: error });
  }
});

// Users Delete CRUD
app.delete("/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`DELETE FROM users`);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: true,
        message: "User Not Found.",
      });
    } else {
      res.status(202).json({
        success: true,
        message: "All Users Deleted successfully.",
        // data1: result.rows[0],
        // data2: result.rows,
        data3: null,
      });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: error.message, details: error });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
