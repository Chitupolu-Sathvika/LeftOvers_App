"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
const generateOTP = () => {
    return (Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000).toString();
};
exports.generateOTP = generateOTP;
