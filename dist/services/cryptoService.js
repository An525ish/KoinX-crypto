"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCryptoDeviation = exports.getCryptoStats = exports.fetchCryptoData = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
const cryptoModel_1 = __importDefault(require("../models/cryptoModel"));
const logger_1 = __importDefault(require("../utils/logger"));
const mathUtils_1 = require("../utils/mathUtils");
const customErrors_1 = require("../errors/customErrors");
const fetchCryptoData = async () => {
    const coins = config_1.default.supportedCoins.join(',');
    const url = `${config_1.default.coinGeckoBaseUrl}/simple/price?ids=${coins}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;
    try {
        const { data } = await axios_1.default.get(url);
        const cryptoData = Object.entries(data).map(([coin, details]) => ({
            coin,
            price: details.usd,
            marketCap: details.usd_market_cap,
            change24h: details.usd_24h_change,
        }));
        await cryptoModel_1.default.insertMany(cryptoData);
        logger_1.default.info('Crypto data fetched and stored successfully');
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            logger_1.default.error('Error fetching crypto data from CoinGecko:', error.message);
            throw new customErrors_1.ExternalAPIError('Failed to fetch crypto data from external API');
        }
        else {
            logger_1.default.error('Error storing crypto data:', error);
            throw new customErrors_1.DatabaseError('Failed to store crypto data');
        }
    }
};
exports.fetchCryptoData = fetchCryptoData;
const getCryptoStats = async (coin) => {
    try {
        const latestData = await cryptoModel_1.default.findOne({ coin }).sort({ createdAt: -1 });
        if (!latestData) {
            throw new customErrors_1.NotFoundError(`No data found for the specified coin: ${coin}`);
        }
        return {
            coin: latestData.coin,
            price: latestData.price,
            marketCap: latestData.marketCap,
            change24h: latestData.change24h,
        };
    }
    catch (error) {
        if (error instanceof customErrors_1.NotFoundError) {
            throw error;
        }
        else {
            logger_1.default.error('Error fetching crypto stats:', error);
            throw new customErrors_1.DatabaseError('Failed to fetch crypto stats');
        }
    }
};
exports.getCryptoStats = getCryptoStats;
const getCryptoDeviation = async (coin) => {
    try {
        const lastHundredRecords = await cryptoModel_1.default.find({ coin }).sort({ createdAt: -1 }).limit(100);
        if (lastHundredRecords.length === 0) {
            throw new customErrors_1.NotFoundError(`No data found for the specified coin: ${coin}`);
        }
        const prices = lastHundredRecords.map((record) => record.price);
        return (0, mathUtils_1.calculateStandardDeviation)(prices);
    }
    catch (error) {
        if (error instanceof customErrors_1.NotFoundError) {
            throw error;
        }
        else {
            logger_1.default.error('Error calculating deviation:', error);
            throw new customErrors_1.DatabaseError('Failed to calculate price deviation');
        }
    }
};
exports.getCryptoDeviation = getCryptoDeviation;
