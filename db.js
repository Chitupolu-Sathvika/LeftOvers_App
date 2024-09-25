"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMongoDb = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const dbUserName = (_a = process.env.MONGO_DB_USERNAME) !== null && _a !== void 0 ? _a : '';
const dbPassword = (_b = process.env.MONGO_DB_PASSWORD) !== null && _b !== void 0 ? _b : '';
const dbName = (_c = process.env.MONGO_DB_NAME) !== null && _c !== void 0 ? _c : '';
const string = "mongodb+srv://chsathvika:qEVjHQQGqigKOiyY@cluster-leftovers.exqofa5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-LeftOvers";
const initMongoDb = () => {
    console.log("connecting to db");
    return mongoose_1.default.connect(`${string}`);
};
exports.initMongoDb = initMongoDb;
