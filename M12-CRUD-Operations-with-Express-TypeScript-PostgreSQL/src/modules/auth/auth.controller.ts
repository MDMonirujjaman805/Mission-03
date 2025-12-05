import { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await authServices.loginUser(email, password);

    res.status(201).json({
      success: true,
      message: "Login Successfully.",
      data: result,
    });

    console.log("Login Successfully:", result);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const authGetUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.authGetUser();
    if (result.rows.length === 0) {
      res.status(404).json({
        success: true,
        message: "User Not Found.",
      });
    } else {
      res.status(202).json({
        success: true,
        length: result.rows.length,
        message: "Auth fetched successfully.",
        data: result,
      });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: error.message, details: error });
  }
};

const authGetSingleUser = async (req: Request, res: Response) => {
  // console.log(req.params);
  // res.send({ message: "APi is cool" });
  try {
    const result = await authServices.authGetSingleUser(
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

const authDeletedUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.authDeletedUser(req.params.id as string);
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
export const authControllers = {
  loginUser,
  authGetUser,
  authGetSingleUser,
  authDeletedUser,
};
