import * as React from 'react';
import { useFonts } from 'expo-font';
import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '@/components/home';
import Donor from '@/components/donor';
import DonationForm, { DonationDataType } from '@/components/donor/DonationForm';
import Otp from '@/components/otp';
import RecentDonations from '@/components/donor/RecentDonations';
import Ngo from '../components/ngo';
import SignIn from '@/components/sign-in';
import Profile from '@/components/profile';
import Donation from '@/components/donor/Donation';
import Farmer from '@/components/farmer';
import FarmerForm from '@/components/donor/FarmerForm';
import Volunteer from '@/components/volunteer';
import Notification from '@/components/notifications';
import DeliveryOtp from '@/components/delivery-otp';

export type NavigationParamType = {
   Home: undefined;
   Otp: undefined;
   Notifications: undefined;
   Donor: undefined;
   DeliveryOtp: { donation: DonationDataType };
   NewDonationForm: undefined;
   NewFarmerForm: undefined;
   RecentDonations: undefined;
   Donation: undefined;
   Ngo: undefined;
   SignIn: undefined;
   Profile: undefined;
   Farmer: undefined;
   Volunteer: undefined;
};

const Stack = createStackNavigator<NavigationParamType>();

export default function RootLayout() {
   const [loaded] = useFonts({
      SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
   });

   if (!loaded) {
      return null;
   }

   return (
      <>
         <NavigationContainer independent>
            <Stack.Navigator initialRouteName={'SignIn'}>
               <Stack.Screen name={'Home'} component={HomePage} options={{ headerShown: false }} />
               <Stack.Screen name={'Otp'} component={Otp} options={{ headerTitle: '' }} />
               <Stack.Screen
                  name={'DeliveryOtp'}
                  component={DeliveryOtp}
                  options={{ headerShown: false }}
               />
               <Stack.Screen name={'Donor'} component={Donor} options={{ headerShown: false }} />
               <Stack.Screen
                  name={'NewDonationForm'}
                  component={DonationForm}
                  options={{ headerTitle: 'Donate' }}
               />
               <Stack.Screen
                  name={'RecentDonations'}
                  component={RecentDonations}
                  options={{ headerTitle: 'Recent Donations' }}
               />
               <Stack.Screen name={'Ngo'} component={Ngo} options={{ headerShown: false }} />
               <Stack.Screen name={'SignIn'} component={SignIn} options={{ headerTitle: '' }} />
               <Stack.Screen name={'Profile'} component={Profile} />
               {/* @ts-ignore */}
               <Stack.Screen name={'Donation'} component={Donation} options={{ headerShown: false }} />
               <Stack.Screen name={'Farmer'} component={Farmer} options={{ headerShown: false }} />
               <Stack.Screen
                  name={'NewFarmerForm'}
                  component={FarmerForm}
                  options={{ headerTitle: 'Donate' }}
               />
               <Stack.Screen name={'Notifications'} component={Notification} options={{ headerShown: false }} />
               <Stack.Screen name={'Volunteer'} component={Volunteer} options={{ headerShown: false }} />
            </Stack.Navigator>
         </NavigationContainer>
      </>
   );
}
