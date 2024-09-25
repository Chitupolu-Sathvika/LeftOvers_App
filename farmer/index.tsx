// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const Farmer = () => {
//   return (
//     <View style={styles.cardView}>
//       <Text>Farmer</Text>
//     </View>
//   )
// }

// export default Farmer

// const styles = StyleSheet.create({
//   cardView:{
//     borderWidth: 5,
//     borderColor: "red",

//   }
// })

/*import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import Header from '@/components/common/Header';
import Footer, { FooterItemType } from '@/components/common/Footer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamType } from '@/app/_layout';
import RecentDonations from '@/components/donor/RecentDonations';
import FarmerCard from './FarmerCard';

interface FarmerProps {
   navigation: NativeStackNavigationProp<NavigationParamType, 'Farmer'>;
}

const Farmer: React.FC<FarmerProps> = ({ navigation }) => {
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
    <View>
      <ScrollView>
      <View className={'h-full bg-white'} style={styles.cardView}>
      
         <Header navigation={navigation} />
         
         <View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
                  <FarmerCard navigation={navigation} />
         </View>
   <View style={{paddingHorizontal: 20}}>*/
            /* @ts-ignore */
           /* <RecentDonations navigation={navigation} />
         </View>   
      </View>
      <View style={{height: 270, width: '100%'}}>

      </View>
      </ScrollView>
      
        <Footer menu={menu} />
    </View>
   );
};

const styles = StyleSheet.create({
     cardView:{
       padding: 10,
  
  }
})

export default Farmer;*/


/*import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from '@/components/common/Header';
import Footer, { FooterItemType } from '@/components/common/Footer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamType } from '@/app/_layout';
import RecentDonations from '@/components/donor/RecentDonations';
import NgoCard from '@/components/ngo/NgoCard';

interface FarmerProps {
   navigation: NativeStackNavigationProp<NavigationParamType, 'Farmer'>;
}

const Farmer: React.FC<FarmerProps> = ({ navigation }) => {
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

export default Farmer;*/



import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from '@/components/common/Header';
import Footer, { FooterItemType } from '@/components/common/Footer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamType } from '@/app/_layout';
import RecentDonations from '@/components/donor/RecentDonations';
import FarmerCard from '@/components/farmer/FarmerCard'; 

interface FarmerProps {
   navigation: NativeStackNavigationProp<NavigationParamType, 'Farmer'>;
}

const Farmer: React.FC<FarmerProps> = ({ navigation }) => {
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
               <FarmerCard navigation={navigation} /> 
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

export default Farmer;
