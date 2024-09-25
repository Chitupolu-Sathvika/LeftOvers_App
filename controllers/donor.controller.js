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
exports.withdrawNgoRequest = exports.acceptNgoRequest = exports.getDonations = exports.newDonation = void 0;
const donor_model_1 = __importDefault(require("../models/donor.model"));
const crypto_1 = require("crypto");
const newDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobileNumber, from } = req.body;
    if (!mobileNumber) {
        res.json({ message: 'Mobile number is required' });
        return;
    }
    const { donation } = req.body;
    if (!donation) {
        res.json({ message: 'Donation data is required' });
        return;
    }
    try {
        yield donor_model_1.default.create(Object.assign(Object.assign({ mobileNumber,
            from }, donation), { status: 'Pending', otp: (0, crypto_1.randomInt)(1000, 9999) }));
        res.status(201).json({ success: true, message: 'Donation added' });
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.newDonation = newDonation;
const getDonations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobileNumber } = req.query;
    if (!mobileNumber) {
        res.json({ message: 'Mobile number is required' });
        return;
    }
    try {
        const response = yield donor_model_1.default.find({ mobileNumber }, '-mobileNumber');
        res.status(200).json({ success: true, donations: response });
    }
    catch (error) {
        console.log(error);
        res.json({ message: error.message });
    }
});
exports.getDonations = getDonations;
const acceptNgoRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Accept Ngo Request');
    const { donationId } = req.body;
    if (!donationId) {
        res.json({ message: 'Mobile number is required' });
        return;
    }
    try {
        yield donor_model_1.default.findByIdAndUpdate(donationId, { status: 'Accepted' });
        res.status(200).json({ success: true, message: 'Accepted, notification sent to receiver' });
    }
    catch (error) {
        console.log(error);
        res.json({ message: error.message });
    }
});
exports.acceptNgoRequest = acceptNgoRequest;
const withdrawNgoRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { donationId } = req.body;
    if (!donationId) {
        res.json({ message: 'Donation id is required' });
        return;
    }
    try {
        yield donor_model_1.default.findByIdAndUpdate(donationId, {
            status: 'Pending'
        });
        res.status(200).json({ success: true, message: 'Withdrawn, notification sent to receiver' });
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.withdrawNgoRequest = withdrawNgoRequest;
