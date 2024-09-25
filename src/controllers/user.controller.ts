import { Request, Response } from 'express';
import User from '../models/user.model';

export const updateUser = async (req: Request, res: Response): Promise<void> => {
   const { mobileNumber } = req.body;

   if (!mobileNumber) {
      res.json({ message: 'Mobile number is required' });
      return;
   }

   try {
      await User.findOneAndUpdate({ mobileNumber }, { ...req.body.user });
      res.status(200).json({ success: true, message: 'Profile updated' });
   } catch (error: any) {
      res.json({ message: error.message });
   }
};
