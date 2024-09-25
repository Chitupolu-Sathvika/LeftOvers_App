import React from 'react';
import { View } from 'react-native';
import Header from '@/components/common/Header';
import Footer, { FooterItemType } from '@/components/common/Footer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamType } from '@/app/_layout';
import VolunteerCard from '@/components/volunteer/VolunteerCard';
import VolunteerDonations from '@/components/donor/VolunteerDonations'
import { ScrollView } from 'react-native-gesture-handler';

interface VolunteerProps {
   navigation: NativeStackNavigationProp<NavigationParamType, 'Volunteer'>;
}

const Volunteer: React.FC<VolunteerProps> = ({ navigation }) => {
   const menu: FooterItemType[] = [
      {
         icon: 'home'
      },
      {
         icon: 'notifications',
         showBadge: true
      }
   ];

   return (
      <View className={'flex-5 h-full bg-white'}>
         <View style={{ marginTop: 10 }}>
            <Header navigation={navigation}/>
         </View>   
         <ScrollView>
         <View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
                  <VolunteerCard navigation={navigation} />
         </View>
         <View style={{paddingHorizontal: 20}}>
            {/* @ts-ignore */}
            <VolunteerDonations navigation={navigation} />
         </View>   
         <View style={{ height: 150, width: '100%' }} />
         </ScrollView>
         <Footer menu={menu} />
      </View>
   );
};

export default Volunteer;