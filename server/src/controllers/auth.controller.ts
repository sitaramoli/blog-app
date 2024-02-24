import {StatusCodes} from "http-status-codes";
import bcryptjs from "bcryptjs";
import User from "../models/user.model";
import CustomError from "../middlewares/errorHandler";
import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import * as process from "process";


export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const {username, email, password} = req.body;

  if (!username || !email || !password) {
    return next(new CustomError('All fields are required', StatusCodes.BAD_REQUEST));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return res.json('Signup successful');
  } catch (error) {
    next(new CustomError(error.message, StatusCodes.CONFLICT));
  }
};

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return next(new CustomError('All fields are required', StatusCodes.NOT_FOUND))
  }
  try {
    const user = await User.findOne({email})
    if (!user) {
      return next(new CustomError("Invalid email or password", StatusCodes.NOT_FOUND))
    }
    const passwordValid = bcryptjs.compareSync(password, user.password)
    if (!passwordValid) {
      return next(new CustomError("Invalid email or password", StatusCodes.NOT_FOUND))
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY)
    return res.status(StatusCodes.OK).cookie("token", token, {httpOnly: true})
      .json({
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture
      })

  } catch (err) {
    next(new CustomError(err.message, StatusCodes.NOT_FOUND))
  }
}

export const google = async (req: Request, res: Response, next: NextFunction) => {
  const {name, email, photoUrl} = req.body;
  try {
    const user = await User.findOne({email})
    if (user) {
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY);
      return res.status(StatusCodes.OK).cookie("token", token, {httpOnly: true})
        .json({
          id: user._id,
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture
        });
    } else {
      const username = name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4);
      const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashPassword = bcryptjs.hashSync(password, 10)
      const newUser = new User({username, email, password: hashPassword, profilePicture: photoUrl})
      await newUser.save()
      const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET_KEY);
      return res.status(StatusCodes.OK).cookie("token", token, {httpOnly: true})
        .json({
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          profilePicture: photoUrl
        });
    }
  } catch (err) {
    next(err);
  }
}