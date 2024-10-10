import { Request, Response, NextFunction } from 'express';
import {
  NotFoundError,
  ValidationError,
  DatabaseError,
  ExternalAPIError,
} from '../errors/customErrors';
import logger from '../utils/logger';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  logger.error(err);

  if (err instanceof NotFoundError) {
    res.status(err.statusCode).json({ error: err.message });
  } else if (err instanceof ValidationError) {
    res.status(err.statusCode).json({ error: err.message });
  } else if (err instanceof DatabaseError) {
    res.status(err.statusCode).json({ error: 'A database error occurred' });
  } else if (err instanceof ExternalAPIError) {
    res.status(err.statusCode).json({ error: 'An error occurred while fetching external data' });
  } else {
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};
