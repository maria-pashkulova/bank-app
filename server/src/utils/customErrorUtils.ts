interface CustomError extends Error {
  statusCode?: number;
}

export const createError = (
  message: string,
  statusCode: number
): CustomError => {
  const error = new Error(message) as CustomError;
  error.statusCode = statusCode;
  return error;
};
