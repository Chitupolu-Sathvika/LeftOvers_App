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
exports.removeNotification = exports.getNotifications = exports.addNotification = void 0;
const notifications_model_1 = __importDefault(require("../models/notifications.model"));
const addNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobileNumber } = req.body;
    if (!mobileNumber) {
        res.status(400).json({ message: 'Mobile number is required' });
        return;
    }
    const { title, content } = req.body.notification;
    try {
        yield notifications_model_1.default.create({
            mobileNumber,
            title,
            content,
            read: false
        });
        res.status(200).json({ success: true, message: 'Notification added' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.addNotification = addNotification;
const getNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobileNumber } = req.body;
    if (!mobileNumber) {
        res.status(400).json({ message: 'Mobile number is required' });
        return;
    }
    try {
        const response = yield notifications_model_1.default.find({ mobileNumber });
        res.status(200).json({ success: true, notifications: response });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getNotifications = getNotifications;
const removeNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.removeNotification = removeNotification;
