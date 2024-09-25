import React from 'react';
import { DonationDataType } from '@/components/donor/DonationForm';
import getTimeAndDate from '@/helpers/get-date-time';
import { Text, TouchableOpacity, View } from 'react-native';
import { donationStatusColors, userTypes } from '@/constants/utils';
import store from '@/store';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from '@/constants/colors';

interface DonationItemProps {
   donation: DonationDataType;
   borderBottom?: boolean;
   navigation: any;
}

const DonationItem: React.FC<DonationItemProps> = ({
   donation,
   navigation,
   borderBottom = true
}) => {
   const { date, time } = getTimeAndDate(donation.createdAt ?? '');

   const handleItemPress = (donation: DonationDataType) => {
      navigation.navigate('Donation', { donation });
   };

   return (
      <TouchableOpacity onPress={() => handleItemPress(donation)}>
         <View
            className={`w-full flex flex-col gap-y-1 ${borderBottom && 'border-b border-solid border-grey-2x-light'} py-3`}
         >
            <View className={'flex flex-row justify-between'}>
               <Text className={'text-lg font-bold'}>{donation.typeOfFood}</Text>
               <View className={'flex flex-row items-center gap-x-4'}>
                  {donation?.receiver?.mobileNumber && store.userType === userTypes.Donor && (
                     <View
                        className={`w-3 h-3 rounded-[50px] bg-${donation.status === 'Accepted' ? 'success' : 'error'}`}
                     />
                  )}
                  {store.userType === userTypes.Ngo && donation.status === 'Accepted' && (
                     <View className={'w-3 h-3 rounded-[50px] bg-success'} />
                  )}
                  <View
                     className={'px-1.5 py-0.5 rounded'}
                     style={{ backgroundColor: (store.userType===userTypes.Volunteer && donation.status==="Accepted")?colors.error:donationStatusColors[donation.status as string]  }}
                  >
                     <Text className={`text-base font-bold text-white`}>{(store.userType===userTypes.Volunteer && donation.status==="Accepted")?"Requested":donation.status}</Text>
                  </View>
               </View>
            </View>
            <View className={'flex flex-row'}>
               <Text className={'text-grey text-base'}>Quantity: </Text>
               <Text className={'text-grey text-base'}>{donation.quantity} KG</Text>
            </View>
            {store.userType === userTypes.Donor && donation?.from && (
               <Text className={'text-grey'}>
                  To: {donation.from}
               </Text>
            )}
            <Text className={'text-grey'}>
               Date & Time: {date} & {time}
            </Text>
            {[userTypes.Farmer, userTypes.Ngo].includes(store.userType)?<Text className={'text-grey text-base'}>OTP :{donation?.otp} </Text>:null}


            
            {store.userType === userTypes.Ngo && (
               <Text className={'text-base text-grey'}>Donor number: {donation.mobileNumber}</Text>
            )}
            {store.userType === userTypes.Donor && donation?.receiver?.name && (
               <Text className={'text-grey'}>Receiver: {donation.receiver.name}</Text>
            )}
            {store.userType === userTypes.Donor && donation?.receiver?.mobileNumber && (
               <Text className={'text-grey'}>
                  Receiver number: {donation.receiver.mobileNumber}
               </Text>
            )}


         </View>
      </TouchableOpacity>
      
      


   );
};

export default DonationItem;
