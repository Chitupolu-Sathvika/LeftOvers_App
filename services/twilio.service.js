"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = __importDefault(require("twilio"));
class TwilioClient {
    constructor() {
        this.client = null;
        this.initTwilio = () => {
            this.client = (0, twilio_1.default)(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
        };
    }
    getClient() {
        return this.client;
    }
}
const twilioClient = new TwilioClient();
exports.default = twilioClient;
