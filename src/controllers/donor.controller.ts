import { Request, Response } from 'express';
import Donation from '../models/donor.model';
import { randomInt } from 'crypto';

export const newDonation = async (req: Request, res: Response): Promise<void> => {
   
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
      await Donation.create({
         mobileNumber, 
         from,
         ...donation,
         status: 'Pending',
         otp: randomInt( 1000,9999)
      });
      res.status(201).json({ success: true, message: 'Donation added' });
   } catch (error: any) {
      res.json({ message: error.message });
   }
};

export const getDonations = async (req: Request, res: Response): Promise<void> => {
   const { mobileNumber } = req.query;

   if (!mobileNumber) {
      res.json({ message: 'Mobile number is required' });
      return;
   }

   try {
      const response = await Donation.find({ mobileNumber }, '-mobileNumber');
      res.status(200).json({ success: true, donations: response });
   } catch (error: any) {
      console.log(error);
      res.json({ message: error.message });
   }
};

export const acceptNgoRequest = async (req: Request, res: Response): Promise<void> => {

   console.log('Accept Ngo Request');

   const { donationId } = req.body;

   if (!donationId) {
      res.json({ message: 'Mobile number is required' });
      return;
   }

   try {
      await Donation.findByIdAndUpdate(donationId, { status: 'Accepted' });

      res.status(200).json({ success: true, message: 'Accepted, notification sent to receiver' });

   } catch (error: any) {
      console.log(error);
      res.json({ message: error.message });
   }

};

export const withdrawNgoRequest = async (req: Request, res: Response): Promise<void> => {
   const { donationId } = req.body;

   if (!donationId) {
      res.json({ message: 'Donation id is required' });
      return;
   }

   try {
      await Donation.findByIdAndUpdate(donationId, {
         status: 'Pending'
      });

      res.status(200).json({ success: true, message: 'Withdrawn, notification sent to receiver' });
   } catch (error: any) {
      res.json({ message: error.message });
   }
};
