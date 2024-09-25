"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NotificationSchema = new mongoose_1.default.Schema({
    mobileNumber: {
        type: String,
        required: [true, 'Mobile number is required']
    },
    title: {
        type: String,
        required: [true, 'Notification title is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    read: {
        type: Boolean
    }
}, { timestamps: true });
const Notification = mongoose_1.default.model('Notifications', NotificationSchema);
exports.default = Notification;
