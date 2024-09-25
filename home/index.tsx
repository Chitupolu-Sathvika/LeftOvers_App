import { Image, Text, View, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '@/store';
import { userTypes } from '@/constants/utils';
import { NavigationParamType } from '@/app/_layout';

interface HomePageProps {
   navigation: NativeStackNavigationProp<NavigationParamType, 'Home'>;
}

interface CardProps {
   title: string;
   borderRight?: boolean;
   imgSource: any;
   onPress: (userType: string) => void;
   userType: string;
}

const styles = StyleSheet.create({
   userLogo: {
      width: 75,
      height: 75
   }
});

const Card: React.FC<CardProps> = ({ borderRight, imgSource, title, onPress, userType }) => {
   return (
      <View
         style={[{ borderRightWidth: borderRight ? 1 : 0 }, { borderColor: '#ccc' }]}
         className="w-1/2 flex flex-col justify-center items-center"
         onTouchEnd={() => onPress(userType)}
      >
         <Image source={imgSource} style={styles.userLogo} />
         <Text className="font-bold text-xl mt-2 text-white">{title}</Text>
      </View>
   );
};

const HomePage: React.FC<HomePageProps> = ({ navigation }) => {
   const handleUserCardPress = async (userType: string) => {
      try {
         console.log('User type:', userType);
         await AsyncStorage.setItem('userType', userType);
         const authToken = await AsyncStorage.getItem('@authToken');
         const storedUserType = await AsyncStorage.getItem('userType');
         store.userType = userType;

         if (authToken === 'otp verified') {
            if (storedUserType === userTypes.Donor) {
               navigation.navigate('Donor');
            } else if (storedUserType === userTypes.Ngo) {
               navigation.navigate('Ngo');
            } else if (storedUserType === userTypes.Farmer) {
               navigation.navigate('Farmer');
            } else if (storedUserType === userTypes.Volunteer) {
               navigation.navigate('Volunteer');
            }
         } else {
            navigation.navigate('SignIn');
         }
      } catch (error) {
         console.error('Error handling user card press:', error);
      }
   };

   return (
      <View className="h-full flex flex-col justify-between">
         <View className="px-8 py-12">
            <Text className="text-3xl font-bold">Welcome</Text>
            <Text className="text-base">Start your helping journey</Text>
         </View>
         <View className="bg-primary py-10 rounded-tl-[32px] rounded-tr-[32px]">
            <View className="w-full flex flex-row">
               <Card
                  title="Farmer"
                  imgSource={require('./assets/farmer.png')}
                  onPress={handleUserCardPress}
                  userType="Farmer"
                  borderRight
               />
               <Card
                  title="Donor"
                  imgSource={require('./assets/donor.png')}
                  userType="Doner"
                  onPress={handleUserCardPress}
               />
            </View>
            <View className="w-full flex flex-row mt-8">
               <Card
                  title="NGO"
                  imgSource={require('./assets/receiver.png')}
                  onPress={handleUserCardPress}
                  userType="Ngo"
                  borderRight
               />
               <Card
                  title="Volunteer"
                  imgSource={require('./assets/volunteer.png')}
                  onPress={handleUserCardPress}
                  userType="Volunteer"
               />
            </View>
         </View>
      </View>
   );
};

export default HomePage;
