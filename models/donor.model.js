"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.donationStatus = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var donationStatus;
(function (donationStatus) {
    donationStatus["PENDING"] = "Pending";
    donationStatus["ACCEPTED"] = "Accepted";
    donationStatus["REJECTED"] = "Rejected";
    donationStatus["IN_TRANSIT"] = "In transit";
    donationStatus["DELIVERED"] = "Delivered";
})(donationStatus || (exports.donationStatus = donationStatus = {}));
const DonationSchema = new mongoose_1.default.Schema({
    otp: {
        type: Number,
    },
    typeOfFood: {
        type: String
    },
    cookedTime: {
        type: String
    },
    quantity: {
        type: Number
    },
    houseNumber: {
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
        type: Object
    },
    status: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    from: {
        type: String
    },
    volunteer: {
        mobileNumber: {
            type: String,
            default: null
        }
    },
    receiver: {
        name: {
            type: String
        },
        mobileNumber: {
            type: String
        },
        ngoLocation: {
            type: Object
        }
    }
}, { timestamps: true });
const Donation = mongoose_1.default.model('Donations', DonationSchema);
exports.default = Donation;
