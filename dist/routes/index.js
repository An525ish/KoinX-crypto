"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cryptoController_1 = require("../controllers/cryptoController");
const validation_1 = require("../middlewares/validation");
const router = express_1.default.Router();
router.get('/stats', validation_1.validateCoinParam, cryptoController_1.getStats);
router.get('/deviation', validation_1.validateCoinParam, cryptoController_1.getDeviation);
exports.default = router;
