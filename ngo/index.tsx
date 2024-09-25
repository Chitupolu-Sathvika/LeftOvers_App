/*import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from '@/components/common/Header';
import Footer, { FooterItemType } from '@/components/common/Footer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamType } from '@/app/_layout';
import RecentDonations from '@/components/donor/RecentDonations';
import NgoCard from '@/components/ngo/NgoCard';

interface NgoProps {
   navigation: NativeStackNavigationProp<NavigationParamType, 'Ngo'>;
}

const Ngo: React.FC<NgoProps> = ({ navigation }) => {
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
         <ScrollView>
         <View style={{ marginTop: 10 }}>
            <Header navigation={navigation}/>
         </View>   
         <View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
                  <NgoCard navigation={navigation} />
         </View>
         <View style={{paddingHorizontal: 20}}>
            {/* @ts-ignore */
            /*<RecentDonations navigation={navigation} />
         </View> 
         <View style={{height: 150, width: '100%'}}>

         </View>
         </ScrollView>  
         <Footer menu={menu} />
      </View>
   );
};

export default Ngo;*/


/*Prevvious Code 21st*/
/*import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from '@/components/common/Header';
import Footer, { FooterItemType } from '@/components/common/Footer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamType } from '@/app/_layout';
import RecentDonations from '@/components/donor/RecentDonations';
import NgoCard from '@/components/ngo/NgoCard';

interface NgoProps {
   navigation: NativeStackNavigationProp<NavigationParamType, 'Ngo'>;
}

const Ngo: React.FC<NgoProps> = ({ navigation }) => {
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
         <ScrollView>
            <View style={{ marginTop: 10 }}>
               <Header navigation={navigation} />
            </View>
            <View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
               <NgoCard navigation={navigation} />
            </View>
            <View style={{ paddingHorizontal: 20 }}>
               /* @ts-ignore */
               /*<RecentDonations navigation={navigation} />
            </View>
            <View style={{ height: 150, width: '100%' }} />
         </ScrollView>
         <Footer menu={menu} />
      </View>
   );
};

export default Ngo;

*/




import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from '@/components/common/Header';
import Footer, { FooterItemType } from '@/components/common/Footer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamType } from '@/app/_layout';
import RecentDonations from '@/components/donor/RecentDonations';
import NgoCard from '@/components/ngo/NgoCard';

interface NgoProps {
   navigation: NativeStackNavigationProp<NavigationParamType, 'Ngo'>;
}

const Ngo: React.FC<NgoProps> = ({ navigation }) => {
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
         <ScrollView>
            <View style={{ marginTop: 10 }}>
               <Header navigation={navigation} />
            </View>
            <View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
               <NgoCard navigation={navigation} />
            </View>
            <View style={{ paddingHorizontal: 20 }}>
               {/* @ts-ignore */}
               <RecentDonations navigation={navigation} />
            </View>
            <View style={{ height: 150, width: '100%' }} />
         </ScrollView>
         <Footer menu={menu} />
      </View>
   );
};

export default Ngo;
