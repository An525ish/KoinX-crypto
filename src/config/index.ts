import dotenv from 'dotenv';
import { Config } from '../types';

dotenv.config();

const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017',
  coinGeckoBaseUrl: 'https://api.coingecko.com/api/v3',
  supportedCoins: ['bitcoin', 'matic-network', 'ethereum'],
  jobInterval: process.env.JOB_INTERVAL || '0 */2 * * *', // Every 2 hours
};

export default config;
