import React from 'react';
import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamType } from '@/app/_layout';

interface FarmerCardProps {
   navigation: NativeStackNavigationProp<NavigationParamType, 'Farmer'>;
}

const FarmerCard: React.FC<FarmerCardProps> = ({ navigation }) => {

   return (
      <View className={'p-5 rounded-[24px] flex flex-row justify-between'} style={{backgroundColor: '#71A342'}}>
         <View className={'w-[48%]'}>
            <View className={'flex flex-col items-center gap-y-5'}>
               <Text className={'text-white font-bold text-xl text-center'}>
                  Step towards Eco-Friendly Farming{'\n'}
                  Let's go Organic!
               </Text>
            </View>
         </View>
         <View className={'w-[48%] flex flex-row-reverse'}>
            <Image source={require('./assets/Farmer-Compost.jpg')} style={styles.image} />
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

export default FarmerCard;
