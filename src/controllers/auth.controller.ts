import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../services/generate-tokens.service';
import User from '../models/user.model';

export const signUp = async (req: Request, res: Response): Promise<void> => {
   const { mobileNumber } = req.body;

   console.log("sign up");

   if (!mobileNumber) {
      console.log("mobile number");
      res.status(400).json({ message: 'Mobile number is required' });
      return;
   }

   const isUserAlreadyExisted: boolean = (await User.findOne({ mobileNumber })) !== null;

   if (isUserAlreadyExisted) {
      console.log("user already exists");
      res.status(400).json({ message: 'User already exists' });
      return;
   }

   try {
      console.log("try");
      await User.create({ mobileNumber });
      res.status(201).json({ message: 'User registered successfully' });
   } catch (error: any) {
      console.log("catch");
      res.status(500).json({ message: error.message });
   }
};

export const refreshToken = (req: Request, res: Response): void => {
   const { token } = req.body;

   if (!token) {
      res.status(401).json({ message: 'Refresh Token is required' });
      return;
   }

   jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!, (err: any, user: any) => {
      if (err) {
         res.status(403).json({ message: 'Invalid Refresh Token' });
         return;
      }

      const newAccessToken = generateAccessToken(user.username);
      const newRefreshToken = generateRefreshToken(user.username);

      res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
   });
};
