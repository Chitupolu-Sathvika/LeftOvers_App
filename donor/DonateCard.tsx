import React from 'react';
import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamType } from '@/app/_layout';

interface DonateCardProps {
   navigation: NativeStackNavigationProp<NavigationParamType, 'Donor'>;
}

const DonateCard: React.FC<DonateCardProps> = ({ navigation }) => {
   const handleDonatePress = () => {
      navigation.navigate('NewDonationForm');
   };

   return (
      <View className={'p-5 rounded-[24px] bg-secondary flex flex-row justify-between'}>
         <View className={'w-[48%]'}>
            <View className={'flex flex-col items-center gap-y-5'}>
               <Text className={'text-white font-bold text-xl text-center'}>
                  Share Your Love With Donation
               </Text>
               <Pressable
                  className={
                     'bg-white h-10 flex items-center justify-center rounded-[8px] px-6 mb-2'
                  }
                  onPress={handleDonatePress}
               >
                  <Text className={'text-base'}>To NGO</Text>
               </Pressable>
            </View>
         </View>
         <View className={'w-[48%] flex flex-row-reverse'}>
            <Image source={require('./assets/food-donation.png')} style={styles.image} />
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   image: {
      width: 120,
      height: 120
   }
});

export default DonateCard;
