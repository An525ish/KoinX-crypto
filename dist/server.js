"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const node_cron_1 = __importDefault(require("node-cron"));
const config_1 = __importDefault(require("./config"));
const cryptoService_1 = require("./services/cryptoService");
const routes_1 = __importDefault(require("./routes"));
const logger_1 = __importDefault(require("./utils/logger"));
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
mongoose_1.default
    .connect(config_1.default.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: 'crypto_stats',
})
    .then(() => logger_1.default.info('Connected to MongoDB'))
    .catch((err) => {
    logger_1.default.error('MongoDB connection error:', err);
    process.exit(1);
});
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.use(errorHandler_1.errorHandler);
node_cron_1.default.schedule(config_1.default.jobInterval, async () => {
    logger_1.default.info('Running scheduled job to fetch crypto data');
    try {
        await (0, cryptoService_1.fetchCryptoData)();
        logger_1.default.info('Crypto data fetched and stored successfully');
    }
    catch (error) {
        logger_1.default.error('Error in scheduled job:', error);
    }
});
const PORT = config_1.default.port;
app.listen(PORT, () => logger_1.default.info(`Server running on port ${PORT}`));
exports.default = app;
