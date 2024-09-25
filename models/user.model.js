"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    mobileNumber: {
        type: String,
        required: [true, 'Mobile number is required']
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    pinCode: {
        type: String
    },
    street: {
        type: String
    },
    city: {
        type: String
    },
    geoLocation: {
        type: String
    },
    userType: {
        type: String,
        required: [true, 'User type is required']
    }
}, { timestamps: true });
const User = mongoose_1.default.model('Users', UserSchema);
exports.default = User;
