import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
   {
      mobileNumber: {
         type: String,
         required: [true, 'Mobile number is required']
      },
      title: {
         type: String,
         required: [true, 'Notification title is required']
      },
      content: {
         type: String,
         required: [true, 'Content is required']
      },
      read: {
         type: Boolean
      }
   },
   { timestamps: true }
);

const Notification = mongoose.model('Notifications', NotificationSchema);

export default Notification;
