import { Document } from 'mongoose';

export interface Config {
  port: number;
  mongoURI: string;
  coinGeckoBaseUrl: string;
  supportedCoins: string[];
  jobInterval: string;
}

export interface ICryptoData {
  coin: string;
  price: number;
  marketCap: number;
  change24h: number;
}

export interface ICrypto extends ICryptoData, Document {}

export interface CoinGeckoResponse {
  [key: string]: {
    usd: number;
    usd_market_cap: number;
    usd_24h_change: number;
  };
}
