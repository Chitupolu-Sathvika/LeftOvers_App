import { randomInt } from 'crypto';
import mongoose from 'mongoose';

export enum donationStatus {
   PENDING = 'Pending',
   ACCEPTED = 'Accepted',
   REJECTED = 'Rejected',
   IN_TRANSIT = 'In transit',
   DELIVERED = 'Delivered'
}

const DonationSchema = new mongoose.Schema(
   {
      otp:{
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
         mobileNumber:{
            type:String,
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
   },
   { timestamps: true }
);

const Donation = mongoose.model('Donations', DonationSchema);

export default Donation;
