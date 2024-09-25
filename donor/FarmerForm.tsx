import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, ToastAndroid, View } from 'react-native';
import { AxiosResponse } from 'axios';
import httpService from '@/services/http-service';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamType } from '@/app/_layout';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import store from '@/store';
import { getCurrentLocation } from '@/helpers/map-utils';
import { userTypes } from '@/constants/utils';

interface FarmerFormProps {
   navigation: NativeStackNavigationProp<NavigationParamType, 'NewFarmerForm'>;
}

export interface FarmerDataType {
   _id?: string;
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

let hours: number, minutes: number;

const FarmerForm: React.FC<FarmerFormProps> = ({ navigation }) => {
   const [userData, setUserData] = useState<FarmerDataType>({
      typeOfFood: '',
      cookedTime: '',
      quantity: 0,
      geoLocation: ''
   });

   const handleLocationClick = async () => {
      const currentLocation: LocationObject | undefined = await getCurrentLocation();

      if (currentLocation) {
         setUserData({ ...userData, geoLocation: currentLocation });
      }
   };

   const handleProceedPress = async () => {
      try {
         const response: AxiosResponse = await httpService.post(`/new-donation`, {
            mobileNumber: store.mobileNumber,
            donation: {
               ...userData,
               cookedTime: `${hours}:${minutes}`
            },
            from: userTypes.Farmer,
         });

         ToastAndroid.show(response?.data?.message, ToastAndroid.LONG);

         if (response?.data?.success) {
            navigation.goBack();
         }
      } catch (error: any) {
         ToastAndroid.show('Failed to add donation', ToastAndroid.LONG);
      }
   };

   return (
      <ScrollView className={'bg-white flex flex-col gap-y-6 px-5'}>
         <View className={'flex gap-y-3'}>
            <Text className={'text-base'}>What type of food it is</Text>
            <TextInput
               className={'bg-grey-4x-light w-full px-5 py-4 rounded-[8px] text-lg'}
               placeholder={'Chicken, fish, etc...'}
               onChangeText={(value) => setUserData({ ...userData, typeOfFood: value })}
            />
         </View>
         <View className={'w-[45%]'}>
               <Text className={'text-base'}>Quantity</Text>
               <View className={'flex flex-row items-center justify-between'}>
                  <TextInput
                     className={'bg-grey-4x-light w-[73%] px-5 py-4 rounded-[8px] text-lg mt-3'}
                     placeholder={'0'}
                     onChangeText={(value) =>
                        setUserData({
                           ...userData,
                           quantity: !isNaN(parseInt(value)) ? parseInt(value) : userData.quantity
                        })
                     }
                     keyboardType={'numeric'}
                  />
                  <Text className={'text-xl mt-3'}>KG</Text>
               </View>
         </View>
         <TextInput
            className={'bg-grey-4x-light w-full px-5 py-4 rounded-[8px] text-lg'}
            placeholder={'Use my current location'}
            value={userData.geoLocation ? JSON.stringify(userData.geoLocation) : ''}
            onPress={handleLocationClick}
         />
         <View className={'pt-3 mb-5 flex flex-row justify-center'}>
            <Pressable
               className={
                  'bg-primary w-[50%] h-[52px] flex items-center justify-center rounded-[8px] px-6 mb-2'
               }
               onPress={handleProceedPress}
            >
               <Text className={'text-white text-base'}>Proceed</Text>
            </Pressable>
         </View>
      </ScrollView>
   );
};

export default FarmerForm;
