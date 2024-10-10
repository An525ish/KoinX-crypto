"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeviation = exports.getStats = void 0;
const cryptoService_1 = require("../services/cryptoService");
const getStats = async (req, res, next) => {
    try {
        const { coin } = req.query;
        const stats = await (0, cryptoService_1.getCryptoStats)(coin);
        res.json(stats);
    }
    catch (error) {
        next(error);
    }
};
exports.getStats = getStats;
const getDeviation = async (req, res, next) => {
    try {
        const { coin } = req.query;
        const deviation = await (0, cryptoService_1.getCryptoDeviation)(coin);
        res.json({ deviation });
    }
    catch (error) {
        next(error);
    }
};
exports.getDeviation = getDeviation;
