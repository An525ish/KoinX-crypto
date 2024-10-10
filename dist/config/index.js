"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    port: parseInt(process.env.PORT || '3000', 10),
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017',
    coinGeckoBaseUrl: 'https://api.coingecko.com/api/v3',
    supportedCoins: ['bitcoin', 'matic-network', 'ethereum'],
    jobInterval: process.env.JOB_INTERVAL || '0 */2 * * *', // Every 2 hours
};
exports.default = config;
