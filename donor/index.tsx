import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import Header from '@/components/common/Header';
import DonateCard from '@/components/donor/DonateCard';
import Footer, { FooterItemType } from '@/components/common/Footer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamType } from '@/app/_layout';
import RecentDonations from '@/components/donor/RecentDonations';
import FarmerCard from '@/components/donor/Farmer-Card';

interface DonorProps {
   navigation: NativeStackNavigationProp<NavigationParamType, 'Donor'>;
}

const Donor: React.FC<DonorProps> = ({ navigation }) => {
   const menu: FooterItemType[] = [
      {
         icon: 'home'
      },
      {
         icon: 'notifications',
         onClick: () => {
            navigation.navigate('Notifications');
         },
         showBadge: true
      }
   ];

   return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
         <Header navigation={navigation} />
         <ScrollView contentContainerStyle={{ flexGrow: 0 }}>
            <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
               <View style={{ marginBottom: 10 }}>
                  <DonateCard navigation={navigation} />
               </View>
               <View style={{ marginBottom: 10 }}>
                  <FarmerCard navigation={navigation} />
               </View>
               <RecentDonations navigation={navigation} />
            </View>
            <View style={{height: 150, width: '100%'}}>
            </View>
         </ScrollView>
         <Footer menu={menu} />
      </View>
   );
};


export default Donor;

