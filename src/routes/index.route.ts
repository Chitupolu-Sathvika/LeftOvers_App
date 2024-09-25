import { Router } from 'express';
import { signUp, refreshToken } from '../controllers/auth.controller';
import {
   acceptNgoRequest,
   getDonations,
   newDonation,
   withdrawNgoRequest
} from '../controllers/donor.controller';
import { sendOtp, verifyOtp } from '../controllers/otp.controller';
import { getNgoData, ngoAcceptDonation, ngoWithdrawDonation } from '../controllers/ngo.controller';
import {
   addNotification,
   getNotifications,
   removeNotification
} from '../controllers/notifications.controller';
import { updateUser } from '../controllers/user.controller';
import { deliverOrder, takeOrder } from '../controllers/volunteer.controller';

const router = Router();


router.put('/update-user', updateUser);

router.post('/register', signUp);
router.post('/refresh-token', refreshToken);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

router.get('/get-donations', getDonations);
router.post('/new-donation', newDonation);
router.put('/accept-ngo-request', acceptNgoRequest);
router.put('/withdraw-ngo-request', withdrawNgoRequest);

router.post('/get-ngo-data', getNgoData);
router.put('/ngo-accept-donation', ngoAcceptDonation);
router.put('/ngo-withdraw-donation', ngoWithdrawDonation);

router.get('/get-notifications', getNotifications);
router.post('/add-notification', addNotification);
router.delete('/remove-notification', removeNotification);

router.put("/volunteer-accept-request",takeOrder );
router.put("/volunteer-deliver-request",deliverOrder );

export default router;
