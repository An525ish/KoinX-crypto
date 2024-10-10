import axios from 'axios';
import config from '../config';
import CryptoModel from '../models/cryptoModel';
import logger from '../utils/logger';
import { calculateStandardDeviation } from '../utils/mathUtils';
import { NotFoundError, DatabaseError, ExternalAPIError } from '../errors/customErrors';
import { CoinGeckoResponse, ICryptoData } from '../types';

export const fetchCryptoData = async (): Promise<void> => {
  const coins = config.supportedCoins.join(',');
  const url = `${config.coinGeckoBaseUrl}/simple/price?ids=${coins}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;

  try {
    const { data } = await axios.get<CoinGeckoResponse>(url);

    const cryptoData: ICryptoData[] = Object.entries(data).map(([coin, details]) => ({
      coin,
      price: details.usd,
      marketCap: details.usd_market_cap,
      change24h: details.usd_24h_change,
    }));

    await CryptoModel.insertMany(cryptoData);

    logger.info('Crypto data fetched and stored successfully');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error('Error fetching crypto data from CoinGecko:', error.message);
      throw new ExternalAPIError('Failed to fetch crypto data from external API');
    } else {
      logger.error('Error storing crypto data:', error);
      throw new DatabaseError('Failed to store crypto data');
    }
  }
};

export const getCryptoStats = async (coin: string): Promise<ICryptoData> => {
  try {
    const latestData = await CryptoModel.findOne({ coin }).sort({ createdAt: -1 });

    if (!latestData) {
      throw new NotFoundError(`No data found for the specified coin: ${coin}`);
    }

    return {
      coin: latestData.coin,
      price: latestData.price,
      marketCap: latestData.marketCap,
      change24h: latestData.change24h,
    };
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    } else {
      logger.error('Error fetching crypto stats:', error);
      throw new DatabaseError('Failed to fetch crypto stats');
    }
  }
};

export const getCryptoDeviation = async (coin: string): Promise<number> => {
  try {
    const lastHundredRecords = await CryptoModel.find({ coin }).sort({ createdAt: -1 }).limit(100);

    if (lastHundredRecords.length === 0) {
      throw new NotFoundError(`No data found for the specified coin: ${coin}`);
    }

    const prices = lastHundredRecords.map((record) => record.price);
    return calculateStandardDeviation(prices);
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    } else {
      logger.error('Error calculating deviation:', error);
      throw new DatabaseError('Failed to calculate price deviation');
    }
  }
};
