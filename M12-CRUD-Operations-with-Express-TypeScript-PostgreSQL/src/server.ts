import express, { Request, Response } from "express";
import config from "./config";
import { initDB, pool } from "./config/db";
import logger from "./middleware/logger";

const app = express();
const port = config.port;

// parser
app.use(express.json());

// initializing
initDB();

// logger middleware
app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello World! My name is Monir.");
  console.log(req.method);
  console.log(req.path);
});

// * Users CRUD Operations........
// Users Post CRUD
app.post("/users", logger, async (req: Request, res: Response) => {
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
app.get("/users", logger, async (req: Request, res: Response) => {
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
app.get("/users/:id", logger, async (req: Request, res: Response) => {
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
app.put("/users/:id", logger, async (req: Request, res: Response) => {
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
app.delete("/users/:id", logger, async (req: Request, res: Response) => {
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
app.delete("/users", logger, async (req: Request, res: Response) => {
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

// Todos CRUD Operations........
// Todos Post CRUD
app.post("/todos", logger, async (req: Request, res: Response) => {
  const { user_id, title, description } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO todos(user_id, title  , description ) VALUES($1, $2, $3) RETURNING *`,
      [user_id, title, description]
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

// Todos Get CRUD
app.get("/todos", logger, async (req: Request, res: Response) => {
  //   const { name, age, email } = req.body;
  try {
    const result = await pool.query(`SELECT * FROM todos`);
    res.status(202).json({
      success: true,
      message: "Todos Retrieved Successfully.",
      length: result.rows.length,
      data: result.rows,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: error.message, details: error });
  }
});

// single todo Get CRUD
app.get("/todos/:id", logger, async (req: Request, res: Response) => {
  // console.log(req.params);
  // res.send({ message: "APi is cool" });
  try {
    const result = await pool.query(`SELECT * FROM todos WHERE id = $1`, [
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
        message: "Todos fetched successfully.",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: error.message, details: error });
  }
});

// single Todo Put CRUD
app.put("/todos/:id", logger, async (req: Request, res: Response) => {
  const { user_id, title, description } = req.body;
  try {
    const result = await pool.query(
      `UPDATE todos SET user_id=$1,title=$2,description=$3 WHERE id=$4 RETURNING*`,
      [user_id, title, description, req.params.id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: true,
        message: "Todo Not Found.",
      });
    } else {
      res.status(202).json({
        success: true,
        message: "Todo updated successfully.",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: error.message, details: error });
  }
});

// single Todo Delete CRUD
app.delete("/todos/:id", logger, async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`DELETE FROM todos WHERE id = $1`, [
      req.params.id,
    ]);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: true,
        message: "Todo Not Found.",
      });
    } else {
      res.status(202).json({
        success: true,
        message: "Todo Deleted successfully.",
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

// Todos Delete CRUD
app.delete("/todos", logger, async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`DELETE FROM todos`);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: true,
        message: "Todo Not Found.",
      });
    } else {
      res.status(202).json({
        success: true,
        message: "All Todos Deleted successfully.",
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

// // Handle Not found Root
// app.use((req,res,next)=>{
// res.status(404).send("Sorry, can't find that!")
// })

// The catch-all 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "The requested resource was not found.",
    path: req.originalUrl,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// const pool2 = new Pool({
//   connectionString: `${process.env.CONNECTION_STRING2}`,
// });
// const testDB = async () => {
//   await pool2.query(`CREATE TABLE cars (
//   brand VARCHAR(255),
//   model VARCHAR(255),
//   year INT
// );`);
// };
// testDB();




// git subtree add --prefix=https://github.com/MDMonirujjaman805/M05-Basic-TypeScript.git main


// git subtree add \ --prefix=M05-Basic-TypeScript \ https://github.com/MDMonirujjaman805/M05-Basic-TypeScript.git \ main


// https://github.com/MDMonirujjaman805/M06-Advance-TypeScript.git


// git subtree add --prefix=M12-CRUD-Operations-with-Express-TypeScript-PostgreSQL https://github.com/MDMonirujjaman805/M12-CRUD-Operations-with-Express-TypeScript-PostgreSQL.git main

// 
// https://github.com/MDMonirujjaman805/M10-Deep-Dive-in-NodeJs.git

// M07 - Object - Oriented - TypeScript;

// M07-Object-Oriented-TypeScript
// https://github.com/MDMonirujjaman805/M12-CRUD-Operations-with-Express-TypeScript-PostgreSQL.git

// 

//  ~/Developer/Level-02/Mission-02  main >7  git subtree add --prefix=M07-Object-Oriented-TypeScript https://github.com/MDMonirujjaman805/M07-Object-Oriented-TypeScript.git main
// fatal: working tree has modifications.  Cannot add.
//  ~/Dev/Level-02/Mission-02  main >7 !1  git status                                                     1 err  12:45:36 

// On branch main
// Your branch is ahead of 'origin/main' by 7 commits.
//   (use "git push" to publish your local commits)

// Changes not staged for commit:
//   (use "git add <file>..." to update what will be committed)
//   (use "git restore <file>..." to discard changes in working directory)
// 	modified:   M06-Advance-TypeScript/.DS_Store

// no changes added to commit (use "git add" and/or "git commit -a")
//  ~/Dev/Level-02/Mission-02  main >7 !1  git add .                                                         ok  12:46:50 
// git commit -m "Prepare repo before adding subtree for Marge 3"

// [main 6650adb] Prepare repo before adding subtree for Marge 3
//  1 file changed, 0 insertions(+), 0 deletions(-)
//  ~/Developer/Level-02/Mission-02  main >8  git status                                                     ok  12:47:48 

// On branch main
// Your branch is ahead of 'origin/main' by 8 commits.
//   (use "git push" to publish your local commits)

// nothing to commit, working tree clean
//  ~/Developer/Level-02/Mission-02  main >8  echo ".DS_Store" >> .gitignore                                 ok  12:48:16 
// git add .gitignore
// git commit -m "Add .DS_Store to gitignore"
// [main 951da15] Add .DS_Store to gitignore
//  1 file changed, 1 insertion(+)
//  ~/Developer/Level-02/Mission-02  main >9  git status                                                     ok  12:49:19 

// On branch main
// Your branch is ahead of 'origin/main' by 9 commits.
//   (use "git push" to publish your local commits)

// nothing to commit, working tree clean
//  ~/Developer/Level-02/Mission-02  main >9  git subtree add --prefix=M07-Object-Oriented-TypeScript https://github.com/MDMonirujjaman805/M07-Object-Oriented-TypeScript.git main
// git fetch https://github.com/MDMonirujjaman805/M07-Object-Oriented-TypeScript.git main
// remote: Enumerating objects: 31, done.
// remote: Counting objects: 100% (31/31), done.
// remote: Compressing objects: 100% (25/25), done.
// remote: Total 31 (delta 8), reused 26 (delta 3), pack-reused 0 (from 0)
// Unpacking objects: 100% (31/31), 5.61 KiB | 221.00 KiB/s, done.
// From https://github.com/MDMonirujjaman805/M07-Object-Oriented-TypeScript
//  * branch            main       -> FETCH_HEAD
// Added dir 'M07-Object-Oriented-TypeScript'
//  ~/Developer/Level-02/Mission-02  main >15  git add .                                                     ok  12:50:12 
// git commit -m "Prepare repo before adding subtree for Marge 3"

// On branch main
// Your branch is ahead of 'origin/main' by 15 commits.
//   (use "git push" to publish your local commits)

// nothing to commit, working tree clean
//  ~/Dev/Level-02/Mission-02  main >15  git add .                                                        1 err  12:50:19 
//  ~/Developer/Level-02/Mission-02  main >15  git commit -m "Marge complete"                                ok  12:50:40 
// On branch main
// Your branch is ahead of 'origin/main' by 15 commits.
//   (use "git push" to publish your local commits)

// nothing to commit, working tree clean
//  ~/Dev/Level-02/Mission-02  main >15  git push                                                         1 err  12:50:58 
// Enumerating objects: 98, done.
// Counting objects: 100% (98/98), done.
// Delta compression using up to 10 threads
// Compressing objects: 100% (88/88), done.
// Writing objects: 100% (96/96), 21.94 KiB | 5.49 MiB/s, done.
// Total 96 (delta 27), reused 0 (delta 0), pack-reused 0 (from 0)
// remote: Resolving deltas: 100% (27/27), completed with 1 local object.
// To https://github.com/MDMonirujjaman805/Mission-02.git
//    c26b578..49c196a  main -> main
//  ~/Developer/Level-02/Mission-02  main                                                                    ok  12:51:18 


