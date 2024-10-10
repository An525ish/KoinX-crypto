import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../errors/customErrors';
import config from '../config';

export const validateCoinParam = (req: Request, res: Response, next: NextFunction): void => {
  const { coin } = req.query;

  if (!coin || typeof coin !== 'string') {
    throw new ValidationError('Coin parameter is required and must be a string');
  }

  if (!config.supportedCoins.includes(coin)) {
    throw new ValidationError('Invalid coin specified');
  }

  next();
};
