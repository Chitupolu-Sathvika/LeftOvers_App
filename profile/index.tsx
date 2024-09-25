/*import React, { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamType } from '@/app/_layout';
import { Image, Pressable, Text, TextInput, ToastAndroid, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '@/store';
import httpService from '@/services/http-service';

interface ProfileProps {
   navigation: NativeStackNavigationProp<NavigationParamType, 'Profile'>;
}

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
   const [user, setUser] = useState<{
      firstName: string;
      lastName: string;
   }>({
      firstName: '',
      lastName: ''
   });

   const handleLogOutPress = async () => {
      // await AsyncStorage.removeItem('mobileNumber');
      // await AsyncStorage.removeItem('userType');
      await AsyncStorage.removeItem('@authToken');
      navigation.navigate('Home');
   };

   const handleSavePress = async () => {
      try {
         const response = await httpService.put('/update-user', {
            mobileNumber: store.mobileNumber,
            user
         });
         if (response?.data?.success) {
            ToastAndroid.show(response?.data?.message, ToastAndroid.LONG);
         }
      } catch (error) {
         ToastAndroid.show('Failed to update', ToastAndroid.LONG);
      }
   };

   return (
      <View className={'h-full bg-white'}>
         <View className={'px-5 pt-3'}>
            <View className={'flex flex-row justify-center w-full'}>
               <View className={'bg-grey-4x-light p-5 rounded-[50px]'}>
                  /* @ts-ignore */
                 /* <Image source={require('./assets/user.png')} className={'w-16 h-16'} />
               </View>
            </View>
            <View className={'flex flex-col gap-y-4 mt-3'}>
               <Text className={'text-lg font-bold'}>User Profile</Text>
               <TextInput
                  className={'bg-grey-4x-light w-full px-5 py-4 rounded-[8px] text-lg'}
                  placeholder={'First name'}
                  onChangeText={(value) => setUser({ ...user, firstName: value })}
               />
               <TextInput
                  className={'bg-grey-4x-light w-full px-5 py-4 rounded-[8px] text-lg'}
                  placeholder={'Last name'}
                  onChangeText={(value) => setUser({ ...user, lastName: value })}
               />
               <TextInput
                  className={'bg-grey-4x-light w-full px-5 py-4 rounded-[8px] text-lg'}
                  placeholder={'Mobile number'}
                  value={store.mobileNumber}
                  editable={false}
               />
            </View>
         </View>
         <View className={'absolute bottom-0 left-0 w-full p-5'}>
            <View className={'flex flex-row items-center gap-x-3 w-full'}>
               <Pressable
                  className={
                     'bg-success w-[48%] h-12 flex items-center justify-center rounded-[8px]'
                  }
                  onPress={handleSavePress}
               >
                  <Text className={'text-base text-white'}>Save</Text>
               </Pressable>
               <Pressable
                  className={'bg-error w-[48%] h-12 flex items-center justify-center rounded-[8px]'}
                  onPress={handleLogOutPress}
               >
                  <Text className={'text-base text-white'}>Log out</Text>
               </Pressable>
            </View>
         </View>
      </View>
   );
};

export default Profile;*/


import React, { useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamType } from '@/app/_layout';
import { Image, Pressable, Text, TextInput, ToastAndroid, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '@/store';
import httpService from '@/services/http-service';

interface ProfileProps {
   navigation: NativeStackNavigationProp<NavigationParamType, 'Profile'>;
}

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
   const [user, setUser] = useState<{
      firstName: string;
      lastName: string;
   }>({
      firstName: '',
      lastName: ''
   });

   useEffect(() => {
      const loadUserDetails = async () => {
         const storedFirstName = await AsyncStorage.getItem('firstName');
         const storedLastName = await AsyncStorage.getItem('lastName');
         setUser({
            firstName: storedFirstName || '',
            lastName: storedLastName || '',
         });
      };
      loadUserDetails();
   }, []);

   const handleLogOutPress = async () => {
      await AsyncStorage.removeItem('mobileNumber');
      await AsyncStorage.removeItem('firstName');
      await AsyncStorage.removeItem('lastName');
      await AsyncStorage.removeItem('@authToken');
      navigation.navigate('Home');
   };

   const handleSavePress = async () => {
      try {
         const response = await httpService.put('/update-user', {
            mobileNumber: store.mobileNumber,
            user
         });
         if (response?.data?.success) {
            ToastAndroid.show(response?.data?.message, ToastAndroid.LONG);
         }
      } catch (error) {
         ToastAndroid.show('Failed to update', ToastAndroid.LONG);
      }
   };

   return (
      <View className={'h-full bg-white'}>
         <View className={'px-5 pt-3'}>
            <View className={'flex flex-row justify-center w-full'}>
               <View className={'bg-grey-4x-light p-5 rounded-[50px]'}>
                  <Image source={require('./assets/user.png')} style={{ width: 64, height: 64 }} />
               </View>
            </View>
            <View className={'flex flex-col gap-y-4 mt-3'}>
               <Text className={'text-lg font-bold'}>User Profile</Text>
               <TextInput
                  className={'bg-grey-4x-light w-full px-5 py-4 rounded-[8px] text-lg'}
                  placeholder={'First name'}
                  value={user.firstName}
                  onChangeText={(value) => setUser({ ...user, firstName: value })}
               />
               <TextInput
                  className={'bg-grey-4x-light w-full px-5 py-4 rounded-[8px] text-lg'}
                  placeholder={'Last name'}
                  value={user.lastName}
                  onChangeText={(value) => setUser({ ...user, lastName: value })}
               />
               <TextInput
                  className={'bg-grey-4x-light w-full px-5 py-4 rounded-[8px] text-lg'}
                  placeholder={'Mobile number'}
                  value={store.mobileNumber}
                  editable={false}
               />
            </View>
         </View>
         <View className={'absolute bottom-0 left-0 w-full p-5'}>
            <View className={'flex flex-row items-center gap-x-3 w-full'}>
               <Pressable
                  className={
                     'bg-success w-[48%] h-12 flex items-center justify-center rounded-[8px]'
                  }
                  onPress={handleSavePress}
               >
                  <Text className={'text-base text-white'}>Save</Text>
               </Pressable>
               <Pressable
                  className={'bg-error w-[48%] h-12 flex items-center justify-center rounded-[8px]'}
                  onPress={handleLogOutPress}
               >
                  <Text className={'text-base text-white'}>Log out</Text>
               </Pressable>
            </View>
         </View>
      </View>
   );
};

export default Profile;

