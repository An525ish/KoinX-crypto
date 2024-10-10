import mongoose, { Schema } from 'mongoose';
import config from '../config';
import { ICrypto } from '../types';

const cryptoSchema = new Schema<ICrypto>(
  {
    coin: {
      type: String,
      required: true,
      enum: config.supportedCoins,
    },
    price: {
      type: Number,
      required: true,
    },
    marketCap: {
      type: Number,
      required: true,
    },
    change24h: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<ICrypto>('Crypto', cryptoSchema);
