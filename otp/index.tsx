import React, { useEffect, useRef, useState } from 'react';
import { Pressable, Text, TextInput, ToastAndroid, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamType } from '@/app/_layout';
import { AxiosResponse } from 'axios';
import httpService from '@/services/http-service';
import { MaterialIcons } from '@expo/vector-icons';
import { userTypes } from '@/constants/utils';
import store from '@/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OtpProps {
   navigation: NativeStackNavigationProp<NavigationParamType, 'Otp'>;
}

let currentActiveIndex: number = 0;

const inputClassName: string = 'bg-grey-4x-light w-14 p-4 pl-6 rounded-[8px] text-xl';

const Otp: React.FC<OtpProps> = ({ navigation }) => {
   const [otp, setOtp] = useState<string[]>(['', '', '', '']);
   const inputRefs = [useRef<any>(), useRef<any>(), useRef<any>(), useRef<any>()];
   const [disableResend, setResend] = useState<boolean>(false);

   const verifyOtp = async () => {
      const userOtp: string = otp.join('');

      if (userOtp.length < 4) {
         return;
      }

      try {
         const response: AxiosResponse = await httpService.post(`/verify-otp`, {
            mobileNumber: store.mobileNumber,
            otp: userOtp
         });

         ToastAndroid.show(response?.data?.message, ToastAndroid.LONG);

         if (response?.data?.success) {
            await AsyncStorage.setItem("@authToken",'otp verified')
            
            navigation.navigate('Home');
         }

         if (store.userType === userTypes.Donor) {
            navigation.navigate('Donor');
         } else if (store.userType === userTypes.Ngo) {
            navigation.navigate('Ngo');
         } else if (store.userType === userTypes.Farmer) {
            navigation.navigate('Farmer');
         }
         else if (store.userType === userTypes.Volunteer) {
            navigation.navigate('Volunteer');
         }
      } catch (error: any) {
         ToastAndroid.show(error.message, ToastAndroid.LONG);
      }
   };

   const handleInputChange = (index: number, value: string) => {
      if ((value && isNaN(parseInt(value))) || value.length > 1) {
         return;
      }

      const updated: string[] = [...otp];

      updated[index] = value;

      setOtp(updated);

      if (value && index + 1 < 4) {
         currentActiveIndex = index + 1;
         inputRefs[currentActiveIndex]?.current?.focus();
      } else if (index + 1 === 4) {
         verifyOtp();
      }
   };

   const handleResendPress = async () => {
      if (disableResend) {
         return;
      }

      try {
         const response: AxiosResponse = await httpService.post(`/send-otp`, {
            mobileNumber: store.mobileNumber
         });
         if (response?.data?.success) {
            ToastAndroid.show('OTP sent successfully', ToastAndroid.LONG);
         } else {
            throw new Error(response?.data?.message);
         }
      } catch (error: any) {
         ToastAndroid.show(error.message, ToastAndroid.LONG);
      }
   };

   useEffect(() => {
      currentActiveIndex = 0;
   }, [navigation]);

   const inputs = [
      <TextInput
         className={inputClassName}
         ref={inputRefs[0]}
         onChangeText={(value: string) => handleInputChange(0, value)}
         value={otp[0]}
         keyboardType={'numeric'}
      />,
      <TextInput
         className={inputClassName}
         ref={inputRefs[1]}
         onChangeText={(value: string) => handleInputChange(1, value)}
         value={otp[1]}
         keyboardType={'numeric'}
      />,
      <TextInput
         className={inputClassName}
         ref={inputRefs[2]}
         onChangeText={(value: string) => handleInputChange(2, value)}
         value={otp[2]}
         keyboardType={'numeric'}
      />,
      <TextInput
         className={inputClassName}
         ref={inputRefs[3]}
         onChangeText={(value: string) => handleInputChange(3, value)}
         value={otp[3]}
         keyboardType={'numeric'}
      />
   ];

   return (
      <>
         <View className={'h-full flex flex-col justify-center items-center px-8 gap-y-5'}>
            <View className={'w-full flex flex-row'}>
               <Text className={'text-lg font-bold'}>Enter OTP here</Text>
               <View className={'ml-3'}>
                  <MaterialIcons name={'lock'} size={24} color={'black'} />
               </View>
            </View>
            <View className={'w-full flex flex-row justify-between'}>
               {inputs.map((input, index: number) => (
                  <View key={index} className={'inline-block'}>
                     {input}
                  </View>
               ))}
            </View>
            <Text
               className={`text-lg underline text-info font-bold ${disableResend ? 'opacity-50' : ''}`}
               onPress={handleResendPress}
            >
               Resend OTP
            </Text>
         </View>
         <View className={'absolute bottom-10 px-8 left-0 flex flex-row justify-center w-full'}>
            <Pressable
               className={'bg-primary h-12 flex items-center justify-center rounded-[8px] w-full'}
               onPress={() => verifyOtp()}
            >
               <Text className={'text-white text-base'}>Verify</Text>
            </Pressable>
         </View>
      </>
   );
};

export default Otp;
