import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
   {
      mobileNumber: {
         type: String,
         required: [true, 'Mobile number is required']
      },
      firstName: {
         type: String
      },
      lastName: {
         type: String
      },
      pinCode: {
         type: String
      },
      street: {
         type: String
      },
      city: {
         type: String
      },
      geoLocation: {
         type: String
      },
      userType: {
         type: String,
         required: [true, 'User type is required']
      }
   },
   { timestamps: true }
);

const User = mongoose.model('Users', UserSchema);

export default User;
