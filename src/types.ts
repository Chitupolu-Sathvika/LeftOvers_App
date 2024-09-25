export interface DonationDataType {
   typeOfFood?: string;
   cookedTime?: string;
   quantity?: number;
   geoLocation?: any;
   status?: string;
   createdAt?: string;
   receiver?: {
      name?: string;
      mobileNumber?: string;
      ngoLocation?: string;
   };
   mobileNumber?: string;
}
