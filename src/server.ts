import express from 'express';
import mongoose from 'mongoose';
import cron from 'node-cron';
import config from './config';
import { fetchCryptoData } from './services/cryptoService';
import routes from './routes';
import logger from './utils/logger';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: 'crypto_stats',
  })
  .then(() => logger.info('Connected to MongoDB'))
  .catch((err: Error) => {
    logger.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

cron.schedule(config.jobInterval, async () => {
  logger.info('Running scheduled job to fetch crypto data');
  try {
    await fetchCryptoData();
    logger.info('Crypto data fetched and stored successfully');
  } catch (error) {
    logger.error('Error in scheduled job:', error);
  }
});

const PORT = config.port;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

export default app;
