import {Request, Response, NextFunction} from "express";

class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode
  }
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
}

export default CustomError;