import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const responseErrorMiddleware: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Business logic related thrown errors have custom statusCode property
  if (error.statusCode) {
    res.status(error.statusCode).json({
      message: error.message,
    });
  } else {
    // Server errors, MongoDB server errors
    res.status(500).json({ message: "Нещо се обърка! Опитайте по-късно!" });
  }
};

export default responseErrorMiddleware;
