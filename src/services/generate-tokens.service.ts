import jwt from 'jsonwebtoken';

export const generateAccessToken = (username: string): string => {
   return jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: process.env.ACCESS_TOKEN_LIFE
   });
};

export const generateRefreshToken = (username: string): string => {
   return jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: process.env.REFRESH_TOKEN_LIFE
   });
};
