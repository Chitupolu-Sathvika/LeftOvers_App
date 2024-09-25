import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const dbUserName: string = process.env.MONGO_DB_USERNAME ?? '';
const dbPassword: string = process.env.MONGO_DB_PASSWORD ?? '';
const dbName: string = process.env.MONGO_DB_NAME ?? '';


const string = "mongodb+srv://chsathvika:qEVjHQQGqigKOiyY@cluster-leftovers.exqofa5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-LeftOvers";

export const initMongoDb = () => {
   console.log("connecting to db");
   return mongoose.connect(
      `${string}`
   );
};
