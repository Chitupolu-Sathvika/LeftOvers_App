import { Request, Response } from 'express';
import Notification from '../models/notifications.model';

export const addNotification = async (req: Request, res: Response): Promise<void> => {
   const { mobileNumber } = req.body;

   if (!mobileNumber) {
      res.status(400).json({ message: 'Mobile number is required' });
      return;
   }

   const { title, content } = req.body.notification;

   try {
      await Notification.create({
         mobileNumber,
         title,
         content,
         read: false
      });

      res.status(200).json({ success: true, message: 'Notification added' });
   } catch (error: any) {
      res.status(500).json({ message: error.message });
   }
};

export const getNotifications = async (req: Request, res: Response): Promise<void> => {
   const { mobileNumber } = req.body;

   if (!mobileNumber) {
      res.status(400).json({ message: 'Mobile number is required' });
      return;
   }

   try {
      const response = await Notification.find({ mobileNumber });
      res.status(200).json({ success: true, notifications: response });
   } catch (error: any) {
      res.status(500).json({ message: error.message });
   }
};

export const removeNotification = async (req: Request, res: Response): Promise<void> => {};
