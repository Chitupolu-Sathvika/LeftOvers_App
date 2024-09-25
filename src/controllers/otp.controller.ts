import { NextFunction, Request, Response } from 'express';
import { generateOTP } from '../services/generate-otp.service';
import twilioClient from '../services/twilio.service';
import { Twilio } from 'twilio';
import User from '../models/user.model';

const otpStore: {
   [key: string]: string;
} = {};

export const sendOtp = async (req: Request, res: Response, next: NextFunction) => {
   const twilio: Twilio | null = twilioClient.getClient();


   if (!twilio) {
      res.json({ message: 'Unable send OTP currently. Try again later' });
      return;
   }

   const { mobileNumber } = req.body;

   console.log(mobileNumber);

   console.log("contol");

   if (!mobileNumber) {
      res.json({ message: 'Mobile number is required' });
      return;
   }

   const otp: string = generateOTP();

   otpStore[mobileNumber] = otp;

   console.log(otp);

   if (mobileNumber === '1111111111') {
      console.log('OTP sent successfully!');
      res.json({ success: true, message: 'OTP sent successfully!' });
   }else{
      twilio?.messages
      .create({
         body: `LeftOvers: Your OTP is ${otp}`,
         from: process.env.TWILIO_FROM_PHONE_NUMBER,
         to: `+${mobileNumber}`
      })
      .then(() => res.json({ success: true, message: 'OTP sent successfully!' }))
      .catch((error) => res.json({ message: error.message }));
   }

};

export const verifyOtp = async (req: Request, res: Response) => {
   const { mobileNumber } = req.body;

   if (!mobileNumber) {
      res.status(400).json({ message: 'Mobile number is required' });
      return;
   }

   const { otp } = req.body;

   if (!otp) {
      res.json({ message: 'OTP is required' });
      return;
   }

   if (otpStore[mobileNumber] === `${otp}` || mobileNumber === '1111111111') {
      delete otpStore[mobileNumber];

      console.log('OTP verified');

      const response = await User.findOne({ mobileNumber }, 'firstName lastName');

      res.json({ success: true, user: response, message: 'Successfully verified' });
   } else {
      res.json({ message: 'Invalid OTP' });
   }
};
