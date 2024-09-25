import colors from '@/constants/colors';

export const donationStatusColors: { [key: string]: string } = {
   Pending: colors.warning,
   Accepted: colors.secondary,
   Rejected: colors.error,
   "In transit": colors.info,
   Delivered: colors.success
};

export const userTypes = {
   Donor: 'Doner',
   Ngo: 'Ngo',
   Farmer: 'Farmer',
   Volunteer: 'Volunteer'
};
