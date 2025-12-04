import { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authServices.loginUser(email, password);
  return res.status(200).json({
    data:result
  })
};


export const authControllers = { loginUser };
