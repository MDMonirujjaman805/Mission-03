import { Request, Response } from "express";
import { todoService } from "./todo.service";

const createTodo = async (req: Request, res: Response) => {
  const { user_id, title, description } = req.body;
  try {
    const result = await todoService.createTodo(user_id, title, description);
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
};

const getTodos = async (req: Request, res: Response) => {
  // const { name, age, email } = req.body;
  try {
    const result = await todoService.getTodos();
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
};

const getTodo = async (req: Request, res: Response) => {
  // console.log(req.params);
  // res.send({ message: "APi is cool" });
  try {
    // const id = req.params.id;
    const result = await todoService.getTodo(req.params.id!);
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
};

const updatedTodo = async (req: Request, res: Response) => {
  const { user_id, title, description, id } = req.body;
  try {
    const result = await todoService.updatedTodo(
      user_id,
      title,
      description,
      id
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
};

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoService.deleteTodo(req.params.id);
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
};

const deleteTodos = async (req: Request, res: Response) => {
  try {
    const result = await todoService.deleteTodos();
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
};

export const todoControllers = {
  createTodo,
  getTodos,
  getTodo,
  updatedTodo,
  deleteTodo,
  deleteTodos,
};
