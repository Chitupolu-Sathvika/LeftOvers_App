import { Request, Response } from 'express';
import Donation, { donationStatus } from '../models/donor.model';

export const takeOrder = async (req: Request, res: Response): Promise<void> => {

    console.log("take Order")

    try {
        const {mobileNumber, donationId} = req.body;
    
        const donation  = await Donation.findById(donationId);
    
        if(!donation){
            res.status(404).json({message: "Donation not found"});
            return;
        }
    
        donation.volunteer!.mobileNumber = mobileNumber;
        donation.status = donationStatus.IN_TRANSIT;
    
        await donation.save();

            res.status(200).json({message: "Order taken successfully"});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error",description:error});
    }
   
}


export const deliverOrder = async (req:Request, res: Response) : Promise<void> =>{
    console.log("Deliver Order")
    try {
        const {donationId} = req.body;

        const donation = await Donation.findById(donationId);

        if(!donation){
            res.status(404).json({message: "Donation not found"});
            return;
        }

        donation.status = donationStatus.DELIVERED;

        await donation.save();

        res.status(200).json({message: "Order delivered successfully"});

    } catch (error) {

        res.status(500).json({message: "Internal Server Error",description:error});
    }
}