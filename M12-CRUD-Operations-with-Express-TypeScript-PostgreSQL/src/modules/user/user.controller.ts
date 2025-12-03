import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  const { name, age, email } = req.body;
  try {
    const result = await userServices.createUser(name, age, email);
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

const getUsers = async (req: Request, res: Response) => {
  //   const { name, age, email } = req.body;
  try {
    const result = await userServices.getUsers();
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
};

const getUser = async (req: Request, res: Response) => {
  // console.log(req.params);
  // res.send({ message: "APi is cool" });
  try {
    const result = await userServices.getUser(req.params.id as string);
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
};

const updatedUser = async (req: Request, res: Response) => {
  const { name, age, email, id } = req.body;
  try {
    const result = await userServices.updatedUser(
      name,
      age,
      email,
      req.params.id as string
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
};

const deletedUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.deletedUsers();
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
};

const deletedUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.deletedUser(req.params.id as string);
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
};

export const userControllers = {
  createUser,
  getUsers,
  getUser,
  updatedUser,
  deletedUser,
  deletedUsers,
};
