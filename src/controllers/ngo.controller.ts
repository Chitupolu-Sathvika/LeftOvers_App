import { Request, Response } from 'express';
import Donation from '../models/donor.model';
import { DonationDataType } from '../types';
import { getDistance } from 'geolib';
import Notification from '../models/notifications.model';

export const getNgoData = async (req: Request, res: Response): Promise<void> => {
   const { mobileNumber, latitude, longitude } = req.body; //{ latitude: 52.52, longitude: 13.405 };

   if (!latitude || !longitude) {
      res.json({ message: 'Ngo location is required' });
      return;
   }

   const ngoLocation = { latitude, longitude };

   try {
      const response: DonationDataType[] = await Donation.find({}, '-receiverName -receiverNumber');

      const donations =
         response?.filter?.((donation: DonationDataType) => {
            // const { latitude, longitude } = donation.geoLocation?.coords;
            // const donorLocation = { latitude, longitude };
            // const distanceInKm: number = getDistance(ngoLocation, donorLocation) / 1000;

            // if (distanceInKm > 5) {
            //    return false;
            // }

            if (!donation.receiver?.mobileNumber) {
               console.log('Checking for donation without receiver');
               return true;
            }

            return (
               donation.receiver?.mobileNumber && donation.receiver?.mobileNumber === mobileNumber
            );
         }) ?? [];



      res.status(200).json({ success: true, donations });
   } catch (error: any) {
      console.log(error);
      res.status(404).json({ message: 'Failed to fetch donations' });
   }
   
};

export const ngoAcceptDonation = async (req: Request, res: Response): Promise<void> => {
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
      await Donation.findByIdAndUpdate(donationId, {
         receiver: {
            name: 'Vinoothna',
            mobileNumber,
            // ngoLocation: req.body.ngoLocation
         }
      });

      await Notification.create({
         mobileNumber,
         title: 'Donation accepted',
         content: 'Hi',
         read: false
      });

      res.status(200).json({ success: true, message: 'Accepted, notification sent to donor' });
   } catch (error: any) {
      res.json({ message: error.message });
   }
};

export const ngoWithdrawDonation = async (req: Request, res: Response): Promise<void> => {
   const { donationId } = req.body;

   if (!donationId) {
      res.json({ message: 'Donation id is required' });
      return;
   }

   try {
      await Donation.findByIdAndUpdate(donationId, {
         receiver: null,
         status: 'Pending'
      });

      res.status(200).json({ success: true, message: 'Withdrawn, notification sent to donor' });
   } catch (error: any) {
      res.json({ message: error.message });
   }
};
