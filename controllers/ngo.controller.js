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
exports.ngoWithdrawDonation = exports.ngoAcceptDonation = exports.getNgoData = void 0;
const donor_model_1 = __importDefault(require("../models/donor.model"));
const notifications_model_1 = __importDefault(require("../models/notifications.model"));
const getNgoData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { mobileNumber, latitude, longitude } = req.body; //{ latitude: 52.52, longitude: 13.405 };
    if (!latitude || !longitude) {
        res.json({ message: 'Ngo location is required' });
        return;
    }
    const ngoLocation = { latitude, longitude };
    try {
        const response = yield donor_model_1.default.find({}, '-receiverName -receiverNumber');
        const donations = (_b = (_a = response === null || response === void 0 ? void 0 : response.filter) === null || _a === void 0 ? void 0 : _a.call(response, (donation) => {
            // const { latitude, longitude } = donation.geoLocation?.coords;
            // const donorLocation = { latitude, longitude };
            // const distanceInKm: number = getDistance(ngoLocation, donorLocation) / 1000;
            var _a, _b, _c;
            // if (distanceInKm > 5) {
            //    return false;
            // }
            if (!((_a = donation.receiver) === null || _a === void 0 ? void 0 : _a.mobileNumber)) {
                console.log('Checking for donation without receiver');
                return true;
            }
            return (((_b = donation.receiver) === null || _b === void 0 ? void 0 : _b.mobileNumber) && ((_c = donation.receiver) === null || _c === void 0 ? void 0 : _c.mobileNumber) === mobileNumber);
        })) !== null && _b !== void 0 ? _b : [];
        res.status(200).json({ success: true, donations });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Failed to fetch donations' });
    }
});
exports.getNgoData = getNgoData;
const ngoAcceptDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobileNumber, donationId } = req.body;
    if (!mobileNumber) {
        res.json({ message: 'Ngo mobile number is required' });
        return;
    }
    if (!donationId) {
        res.json({ message: 'Donation id is required' });
        return;
    }
    try {
        yield donor_model_1.default.findByIdAndUpdate(donationId, {
            receiver: {
                name: 'Vinoothna',
                mobileNumber,
                // ngoLocation: req.body.ngoLocation
            }
        });
        yield notifications_model_1.default.create({
            mobileNumber,
            title: 'Donation accepted',
            content: 'Hi',
            read: false
        });
        res.status(200).json({ success: true, message: 'Accepted, notification sent to donor' });
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.ngoAcceptDonation = ngoAcceptDonation;
const ngoWithdrawDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { donationId } = req.body;
    if (!donationId) {
        res.json({ message: 'Donation id is required' });
        return;
    }
    try {
        yield donor_model_1.default.findByIdAndUpdate(donationId, {
            receiver: null,
            status: 'Pending'
        });
        res.status(200).json({ success: true, message: 'Withdrawn, notification sent to donor' });
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.ngoWithdrawDonation = ngoWithdrawDonation;
