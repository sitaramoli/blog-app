import {StatusCodes} from "http-status-codes";
import bcryptjs from "bcryptjs";
import User from "../models/user.model";
import CustomError from "../middlewares/errorHandler";
import {NextFunction, Request, Response} from "express";


export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const {username, email, password} = req.body;

  if (!username || !email || !password || username === '' || email === '' || password === '') {
    next(new CustomError('All fields are required', StatusCodes.BAD_REQUEST));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json('Signup successful');
  } catch (error) {
    next(new CustomError(error.message, StatusCodes.CONFLICT));
  }
};

export const signin = async (req: Request, res: Response, next: NextFunction) => {

}