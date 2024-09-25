/*import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamType } from '@/app/_layout';

interface NgoCardProps {
   navigation: NativeStackNavigationProp<NavigationParamType>;
}

const NgoCard: React.FC<NgoCardProps> = ({ navigation }) => {
   return (
      <View className="p-5 rounded-[24px] flex flex-row justify-between" style={{ backgroundColor: '#E97632' }}>
         <View className={'w-[48%]'}>
            <View className={'flex flex-col items-center gap-y-5'}>
               <Text className={'text-white font-bold text-xl text-center'}>
                  Receive the food with LOVE!{'\n'}
                  Time to pick!
                  Ready to Eat!
               </Text>
            </View>
         </View>
         <View className={'w-[48%] flex flex-row-reverse'}>
            <Image source={require('./assets/NgoPic.jpg')} style={styles.image} />
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

export default NgoCard;*/

import React from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamType } from '@/app/_layout';

interface NgoCardProps {
   navigation: NativeStackNavigationProp<NavigationParamType, 'Ngo'> | NativeStackNavigationProp<NavigationParamType, 'Farmer'>;
}

const NgoCard: React.FC<NgoCardProps> = ({ navigation }) => {
   const handlePress = () => {
      // Navigate to Ngo or Farmer screen depending on where the card is used
      navigation.navigate('Ngo'); // or 'Farmer' based on where this card is used
   };

   return (
      <TouchableOpacity onPress={handlePress} style={styles.cardContainer}>
         <View style={styles.imageContainer}>
            <Image source={require('./assets/NgoPic.jpg')} style={styles.image} />
         </View>
         <View style={styles.textContainer}>
            <Text style={styles.title}>Receive the food with LOVE!</Text>
            <Text style={styles.description}>Time to pick!
                  Ready to Eat!</Text>
         </View>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   cardContainer: {
      padding: 16,
      borderRadius: 24,
      backgroundColor: '#E87732',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      color: '#ffffff',
   },
   imageContainer: {
      marginRight: 16,
   },
   image: {
      width: 50,
      height: 50,
      borderRadius: 25,
   },
   textContainer: {
      flex: 1,
      color: '#ffffff',
   },
   title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: 4,
   },
   description: {
      fontSize: 14,
      color: '#ffffff',
   },
});

export default NgoCard;

