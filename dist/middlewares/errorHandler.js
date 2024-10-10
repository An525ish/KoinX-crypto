"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const customErrors_1 = require("../errors/customErrors");
const logger_1 = __importDefault(require("../utils/logger"));
const errorHandler = (err, req, res, next) => {
    logger_1.default.error(err);
    if (err instanceof customErrors_1.NotFoundError) {
        res.status(err.statusCode).json({ error: err.message });
    }
    else if (err instanceof customErrors_1.ValidationError) {
        res.status(err.statusCode).json({ error: err.message });
    }
    else if (err instanceof customErrors_1.DatabaseError) {
        res.status(err.statusCode).json({ error: 'A database error occurred' });
    }
    else if (err instanceof customErrors_1.ExternalAPIError) {
        res.status(err.statusCode).json({ error: 'An error occurred while fetching external data' });
    }
    else {
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};
exports.errorHandler = errorHandler;
