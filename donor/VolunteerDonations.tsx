import React, { useEffect, useState } from 'react';
import { Image, Text, ToastAndroid, View } from 'react-native';
import { AxiosResponse } from 'axios';
import httpService from '@/services/http-service';
import Donations from '@/components/donor/Donations';
import { Dropdown } from 'react-native-element-dropdown';
import { DonationDataType } from '@/components/donor/DonationForm';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamType } from '@/app/_layout';
import { userTypes } from '@/constants/utils';
import store from '@/store';
import { getCurrentLocation } from '@/helpers/map-utils';
import { LocationObject } from 'expo-location';
import { useIsFocused } from '@react-navigation/core';

interface VolunteerDonationsProps {
   navigation: NativeStackNavigationProp<NavigationParamType, 'Volunteer'>;
}

const VolunteerDonations: React.FC<VolunteerDonationsProps> = ({ navigation }) => {
   const [donations, setDonations] = useState<any>([]);
   const [filterValue, setFilterValue] = useState<string>('All');
   const isFocused = useIsFocused();
   console.log("In Recent Donations");
   const filterMenu = [
    { label: 'All', value: 'All' },
    { label: 'Requested', value: 'Accepted' },
    { label: 'In transit', value: 'In transit' },
   ];

   useEffect(() => {
      if (isFocused) {
         (async () => {
            let response: AxiosResponse | null = null;
            console.log("Usertype", userTypes)
            switch (store.userType) {
               case userTypes.Donor:
                  try {
                     response = await httpService.get(
                        `/get-donations?mobileNumber=${store.mobileNumber}`
                     );
                  } catch (error: any) {
                     ToastAndroid.show('Failed to fetch recent donations', ToastAndroid.LONG);
                  }
                  break;
               case userTypes.Ngo: {
                  const ngoLocation: LocationObject | undefined = await getCurrentLocation();

                  if (!ngoLocation) {
                     return;
                  }

                  try {
                     response = await httpService.post(`/get-ngo-data`, {
                        mobileNumber: store.mobileNumber,
                        latitude: ngoLocation.coords.latitude,
                        longitude: ngoLocation.coords.longitude
                     });
                  } catch (error: any) {
                     ToastAndroid.show('Failed to fetch recent donations', ToastAndroid.LONG);
                  }
                  break;
               }
               case userTypes.Farmer: {
                  const ngoLocation: LocationObject | undefined = await getCurrentLocation();

                  if (!ngoLocation) {
                     return;
                  }

                  try {
                     response = await httpService.post(`/get-ngo-data`, {
                        mobileNumber: store.mobileNumber,
                        latitude: ngoLocation.coords.latitude,
                        longitude: ngoLocation.coords.longitude
                     });
                  } catch (error: any) {
                     ToastAndroid.show('Failed to fetch recent donations', ToastAndroid.LONG);
                  }
                  break;
               }
               case userTypes.Volunteer: {
                const ngoLocation: LocationObject | undefined = await getCurrentLocation();

                if (!ngoLocation) {
                   return;
                }

                try {
                   response = await httpService.post(`/get-ngo-data`, {
                      mobileNumber: store.mobileNumber,
                      latitude: ngoLocation.coords.latitude,
                      longitude: ngoLocation.coords.longitude
                   });
                } catch (error: any) {
                   ToastAndroid.show('Failed to fetch recent donations', ToastAndroid.LONG);
                }
                break;
             }
            }

            if (response) {
               if (response?.data?.success) {
                  response.data?.donations?.length && setDonations(response.data.donations);
               } else {
                  ToastAndroid.show(response?.data?.message, ToastAndroid.LONG);
               }
            }
         })();
      }
   }, [isFocused]);

   const filteredDonations =
      filterValue === 'All'
         ? donations
         : donations?.filter?.((donation: DonationDataType) => donation.status === filterValue);

            console.log("In Volunteer");
            var filteredDonations1:DonationDataType[] = filteredDonations?.filter?.((donation: DonationDataType) => donation.status === 'Accepted' || donation.status === 'In transit');

            filteredDonations1.reverse();

   return (
      <>
         <View className={'bg-white'}>
            <Text className={'text-lg font-bold mb-2'}>Recent Donations</Text>
            <Dropdown
               // @ts-ignore
               className={'h-12 p-4 border border-solid border-grey-x-light rounded'}
               data={filterMenu}
               labelField={'label'}
               valueField={'value'}
               value={filterValue}
               onChange={(item: any) => setFilterValue(item.value)}
            />
         </View>
         {filteredDonations.length ? (
            <Donations donations={filteredDonations1} navigation={navigation} />
         ) : (
            <View className={'h-full px-5 bg-white flex flex-col justify-center items-center'}>
               <Image source={require('./assets/empty.png')} />
               <Text className={'text-lg mt-3 font-bold text-grey-x-light'}>
                  No recent donations
               </Text>
            </View>
         )}
      </>
   );
};

export default VolunteerDonations;
