"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCoinParam = void 0;
const customErrors_1 = require("../errors/customErrors");
const config_1 = __importDefault(require("../config"));
const validateCoinParam = (req, res, next) => {
    const { coin } = req.query;
    if (!coin || typeof coin !== 'string') {
        throw new customErrors_1.ValidationError('Coin parameter is required and must be a string');
    }
    if (!config_1.default.supportedCoins.includes(coin)) {
        throw new customErrors_1.ValidationError('Invalid coin specified');
    }
    next();
};
exports.validateCoinParam = validateCoinParam;
