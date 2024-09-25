import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1];

   if (token == null) {
      res.sendStatus(401);
      return;
   }

   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
      if (err) {
         res.sendStatus(403);
         return;
      }
      // @ts-ignore
      req.user = user;
      next();
   });
};
