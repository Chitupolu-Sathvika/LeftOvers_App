/*import React, { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamType } from '@/app/_layout';
import { Pressable, Text, TextInput, ToastAndroid, View } from 'react-native';
import store from '@/store';
import httpService from '@/services/http-service';
import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userTypes } from '@/constants/utils';

interface SignInPageProps {
   navigation: NativeStackNavigationProp<NavigationParamType, 'Home'>;
}

let sendingOtp: boolean = false;

const SignIn: React.FC<SignInPageProps> = ({ navigation }) => {
   const [mobileNumber, setMobileNumber] = useState<string>('');

   const handleSendOtpPress = async () => {
      /*const value = await 
      AsyncStorage.getItem("@authToken");
      const userType=await AsyncStorage.getItem('userType');*/
      /*if (sendingOtp) {
         return;
      }
      /*if (value == "otp verified") {
         if (userType === userTypes.Donor) {
            navigation.navigate('Donor');
         } else if (userType === userTypes.Ngo) {
            navigation.navigate('Ngo');
         } else if (userType === userTypes.Farmer) {
            navigation.navigate('Farmer');
         }
      } */
      /*try {
         sendingOtp = true;
         const response: AxiosResponse = await httpService.post(`/send-otp`, {
            mobileNumber
         });

         if (response?.data?.success) {
            await AsyncStorage.setItem('mobileNumber', mobileNumber);
            navigation.navigate('Otp');
            ToastAndroid.show('OTP sent successfully', ToastAndroid.SHORT);
         } else {
            throw new Error(response?.data?.message);
         }

         store.mobileNumber = mobileNumber;
         // @ts-ignore
         store.firstName = response.user.firstName;
         // @ts-ignore
         store.lastName = response.user.lastName;
         navigation.navigate('Otp');
      } catch (error: any) {
         ToastAndroid.show(error.message, ToastAndroid.LONG);
      } finally {
         sendingOtp = false;
      }
   };

   return (
      <View className={'h-full flex flex-col justify-between p-8'}>
         <View>
            <Text className={'text-3xl font-bold'}>Welcome</Text>
            <Text className={'text-base'}>Start your helping journey</Text>
         </View>
         <View className={'h-[30%] flex flex-col justify-end gap-y-4'}>
            <View className={'flex flex-col gap-y-6 w-full'}>
               <Text className={'text-xl font-bold'}>Please sign in to continue</Text>
               <TextInput
                  className={'bg-grey-4x-light w-full px-5 py-4 rounded-[8px] text-lg'}
                  placeholder={'Mobile Number'}
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                  keyboardType={'numeric'}
               />
               <Pressable
                  className={'bg-primary h-12 flex items-center justify-center rounded-[8px]'}
                  onPress={handleSendOtpPress}
               >
                  <Text className={'text-white text-base'}>Send OTP</Text>
               </Pressable>
            </View>
         </View>
      </View>
   );
};

export default SignIn;*/

import React, { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamType } from '@/app/_layout';
import { Pressable, Text, TextInput, ToastAndroid, View } from 'react-native';
import store from '@/store';
import httpService from '@/services/http-service';
import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SignInPageProps {
   navigation: NativeStackNavigationProp<NavigationParamType, 'Home'>;
}

let sendingOtp: boolean = false;

const SignIn: React.FC<SignInPageProps> = ({ navigation }) => {
   const [mobileNumber, setMobileNumber] = useState<string>('');
   const [firstName, setFirstName] = useState<string>('');
   const [lastName, setLastName] = useState<string>('');

   const handleSendOtpPress = async () => {
      if (sendingOtp) {
         return;
      }
      try {
         console.log("Inside try block")
         sendingOtp = true;
         const response: AxiosResponse = await httpService.post(`/send-otp`, {
            mobileNumber
         });


         if (response?.data?.success) {
            await AsyncStorage.setItem('mobileNumber', mobileNumber);
            await AsyncStorage.setItem('firstName', firstName);
            await AsyncStorage.setItem('lastName', lastName);
            navigation.navigate('Otp');
            ToastAndroid.show('OTP sent successfully', ToastAndroid.SHORT);
         } else {
            throw new Error(response?.data?.message);
         }

         store.mobileNumber = mobileNumber;
         store.firstName = firstName;
         store.lastName = lastName;
         navigation.navigate('Otp');
      } catch (error: any) {
         console.log("Error occured " + error.message)
         ToastAndroid.show(error.message, ToastAndroid.LONG);
      } finally {
         sendingOtp = false;
      }
   };

   return (
      <View className={'h-full flex flex-col justify-between p-8'}>
         <View>
            <Text className={'text-3xl font-bold'}>Welcome</Text>
            <Text className={'text-base'}>Start your helping journey</Text>
         </View>
         <View className={'h-[30%] flex flex-col justify-end gap-y-4'}>
            <View className={'flex flex-col gap-y-6 w-full'}>
               <Text className={'text-xl font-bold'}>Please sign in to continue</Text>
               <TextInput
                  className={'bg-grey-4x-light w-full px-5 py-4 rounded-[8px] text-lg'}
                  placeholder={'First Name'}
                  value={firstName}
                  onChangeText={setFirstName}
               />
               <TextInput
                  className={'bg-grey-4x-light w-full px-5 py-4 rounded-[8px] text-lg'}
                  placeholder={'Last Name'}
                  value={lastName}
                  onChangeText={setLastName}
               />
               <TextInput
                  className={'bg-grey-4x-light w-full px-5 py-4 rounded-[8px] text-lg'}
                  placeholder={'Mobile Number'}
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                  keyboardType={'numeric'}
               />
               <Pressable
                  className={'bg-primary h-12 flex items-center justify-center rounded-[8px]'}
                  onPress={handleSendOtpPress}
               >
                  <Text className={'text-white text-base'}>Send OTP</Text>
               </Pressable>
            </View>
         </View>
      </View>
   );
};

export default SignIn;

