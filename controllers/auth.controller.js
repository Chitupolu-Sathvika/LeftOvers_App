"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generate_tokens_service_1 = require("../services/generate-tokens.service");
const user_model_1 = __importDefault(require("../models/user.model"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobileNumber } = req.body;
    console.log("sign up");
    if (!mobileNumber) {
        console.log("mobile number");
        res.status(400).json({ message: 'Mobile number is required' });
        return;
    }
    const isUserAlreadyExisted = (yield user_model_1.default.findOne({ mobileNumber })) !== null;
    if (isUserAlreadyExisted) {
        console.log("user already exists");
        res.status(400).json({ message: 'User already exists' });
        return;
    }
    try {
        console.log("try");
        yield user_model_1.default.create({ mobileNumber });
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.log("catch");
        res.status(500).json({ message: error.message });
    }
});
exports.signUp = signUp;
const refreshToken = (req, res) => {
    const { token } = req.body;
    if (!token) {
        res.status(401).json({ message: 'Refresh Token is required' });
        return;
    }
    jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({ message: 'Invalid Refresh Token' });
            return;
        }
        const newAccessToken = (0, generate_tokens_service_1.generateAccessToken)(user.username);
        const newRefreshToken = (0, generate_tokens_service_1.generateRefreshToken)(user.username);
        res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    });
};
exports.refreshToken = refreshToken;
