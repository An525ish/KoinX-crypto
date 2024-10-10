import { NextFunction, Request, Response } from 'express';
import { getCryptoDeviation, getCryptoStats } from '../services/cryptoService';

export const getStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { coin } = req.query as { coin: string };
    const stats = await getCryptoStats(coin);
    res.json(stats);
  } catch (error) {
    next(error);
  }
};

export const getDeviation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { coin } = req.query as { coin: string };
    const deviation = await getCryptoDeviation(coin);
    res.json({ deviation });
  } catch (error) {
    next(error);
  }
};
