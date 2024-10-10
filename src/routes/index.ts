import express from 'express';
import { getStats, getDeviation } from '../controllers/cryptoController';
import { validateCoinParam } from '../middlewares/validation';

const router = express.Router();

router.get('/stats', validateCoinParam, getStats);
router.get('/deviation', validateCoinParam, getDeviation);

export default router;
