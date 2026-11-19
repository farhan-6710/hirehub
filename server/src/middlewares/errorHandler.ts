import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

export interface AppError extends Error {
  status?: number;
}

const MULTER_MESSAGES: Partial<Record<multer.ErrorCode, string>> = {
  LIMIT_FILE_SIZE: 'Resume file must be 5 MB or smaller',
  LIMIT_FILE_COUNT: 'Upload one resume file',
  LIMIT_UNEXPECTED_FILE: 'Unexpected file field; use resumeFile',
};

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: MULTER_MESSAGES[err.code] ?? err.message });
    return;
  }

  const status = err.status ?? 500;
  if (status >= 500) {
    console.error(err);
  }

  res.status(status).json({
    error: status >= 500 ? 'internal server error' : err.message,
  });
};
