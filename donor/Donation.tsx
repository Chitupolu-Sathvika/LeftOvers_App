import React, { useState } from 'react';
import { Pressable, Text, View, StyleSheet, ToastAndroid, StatusBar, ScrollView, TextInput } from 'react-native';
import { DonationDataType } from '@/components/donor/DonationForm';
import DonationItem from '@/components/donor/DonationItem';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { AxiosResponse } from 'axios';
import httpService from '@/services/http-service';
import { userTypes } from '@/constants/utils';
import store from '@/store';
import { Appbar } from 'react-native-paper';


interface DonationProps {
   navigation: any;
   route: {
      params: {
         donation: DonationDataType;
      };
   };
}

const styles = StyleSheet.create({
   maps: {
      width: '100%',
      height: 200
   },
   container: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: StatusBar.currentHeight,
      paddingHorizontal: 20,
      paddingBottom: 20,
   }
});

const Donation: React.FC<DonationProps> = ({ navigation, route }) => {

   const [opt, setOtp] = useState<string>('');
   const { donation } = route?.params;

   const [buttonText, setText] = useState<string>(
         ((donation.status ==="Pending" && [userTypes.Farmer,userTypes.Ngo].includes(store.userType)) ||donation.status === 'Accepted' && store.userType === userTypes.Volunteer)
         ? 'Accept'
         : (donation.status ==="In transit" && store.userType === userTypes.Volunteer)?"Deliver Donation":"Withdraw"
   );

  
   const latitude=40.6892;
   const longitude=-74.0445;
   const donorLocation = { latitude: 40.6892, longitude: -74.0445 };
   const ngoLocation = { latitude: 48.8584, longitude: 2.2945 };

   const minLat = Math.min(donorLocation.latitude, ngoLocation.latitude);
   const maxLat = Math.max(donorLocation.latitude, ngoLocation.latitude);
   const minLng = Math.min(donorLocation.longitude, ngoLocation.longitude);
   const maxLng = Math.max(donorLocation.longitude, ngoLocation.longitude);

   const latitudeDelta = maxLat - minLat + 15;
   const longitudeDelta = maxLng - minLng + 15;

   const region = {
      latitude: (donorLocation.latitude + ngoLocation.latitude) / 2,
      longitude: (donorLocation.longitude + ngoLocation.longitude) / 2,
      latitudeDelta,
      longitudeDelta
   };

   const handleAcceptPress = async (donation: DonationDataType) => {
      try {
         let response: AxiosResponse | null = null;

         if (["Accept","Deliver Donation"].includes(buttonText)) {
            if (store.userType === userTypes.Ngo) {
               response = await httpService.put(`/accept-ngo-request`, {
                  donationId: donation._id,
                  mobileNumber: store.mobileNumber
               });
            } else if (store.userType === userTypes.Donor) {
               response = await httpService.put(`/accept-ngo-request`, {
                  donationId: donation._id,
                  mobileNumber: store.mobileNumber
               });
            }else if  (store.userType === userTypes.Volunteer && donation.status === 'Accepted') {
               response = await httpService.put(`/volunteer-accept-request`, {
                  donationId: donation._id,
                  mobileNumber: store.mobileNumber
               });
            }else if(store.userType === userTypes.Volunteer && donation.status === 'In transit'){

               if(String(donation.otp) === opt){
                  response = await httpService.put(`/volunteer-deliver-request`, {
                     donationId: donation._id,
                     mobileNumber: store.mobileNumber
                  });
               }else{
                  ToastAndroid.show('Invalid OTP', ToastAndroid.LONG);
               }
            } else if (store.userType === userTypes.Farmer) {
               response = await httpService.put(`/accept-ngo-request`, {
                  donationId: donation._id,
                  mobileNumber: store.mobileNumber
               });

            }


            response?.status === 200 && setText('Withdraw');
         } else if (buttonText === 'Withdraw') {
            if (store.userType === userTypes.Ngo || store.userType === userTypes.Farmer) {
               response = await httpService.put(`/ngo-withdraw-donation`, {
                  donationId: donation._id
               });
            } else if (store.userType === userTypes.Donor) {
               response = await httpService.put(`/withdraw-ngo-request`, {
                  donationId: donation._id
               });
            }

            response?.status === 200 && setText('Accept');
         }

         ToastAndroid.show(response?.data?.message, ToastAndroid.LONG);

         navigation.goBack();
      } catch (error: any) {
         console.log(error);
         ToastAndroid.show('Failed to accept', ToastAndroid.LONG);
      }
   };


   return (
      <View style={styles.container}>
      <Appbar>
         <Appbar.BackAction onPress={() => navigation.goBack()} />
         <Appbar.Content title="Donation" />
      </Appbar>
         <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <DonationItem donation={donation} navigation={navigation} borderBottom={false} />
            {store.userType===userTypes.Volunteer && donation.status==="In transit"? <View className={'flex gap-y-3'}>
            <Text className={'text-base'}>Enter the Delivery OTP</Text>
            <TextInput
               className={'bg-grey-4x-light w-full px-5 py-4 rounded-[8px] text-lg'}
               placeholder={'XXXX'}
               onChangeText={(value) => setOtp(value)}
            />
         </View>:null}
            <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 20 }}>
               {(store.userType === userTypes.Farmer || store.userType === userTypes.Ngo ||
                  (store.userType === userTypes.Donor && donation.receiver)) && (
                  <Pressable
                     className={`${buttonText === 'Accept' ? 'bg-success' : ''} ${buttonText === 'Withdraw' ? 'bg-error' : ''} h-12 flex items-center justify-center px-5 rounded-[8px]`}
                     onPress={() => handleAcceptPress(donation)}
                  >
                     <Text className={'text-base text-white'}>{buttonText}</Text>
                  </Pressable>
               )}
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 20 }}>
               {( (store.userType === userTypes.Volunteer)) && (
                  <Pressable
                     className={`${  ['Accept','Deliver Donation'].includes(buttonText) ? 'bg-success' : ''} ${buttonText === 'Withdraw' ? 'bg-error' : ''} h-12 flex items-center justify-center px-5 rounded-[8px]`}
                     onPress={() => handleAcceptPress(donation)}
                  >
                     <Text className={'text-base text-white'}>{buttonText}</Text>
                  </Pressable>
               )}
            </View>
         </ScrollView>
      </View>
   );
};


export default Donation;
