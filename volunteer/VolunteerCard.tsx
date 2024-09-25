import React from 'react';
import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamType } from '@/app/_layout';

interface VolunteerCardProps {
   navigation: NativeStackNavigationProp<NavigationParamType, 'Volunteer'>;
}

const VolunteerCard: React.FC<VolunteerCardProps> = ({ navigation }) => {

   return (
      <View className="p-5 rounded-[24px] flex flex-row justify-between" style={{ backgroundColor: '#FBFBFC' }}>
         <View className={'w-[48%]'}>
            <View className={'flex flex-col items-center gap-y-5'}>
               <Text className={'text-white font-bold text-xl text-center'} style={{color: '#A7C84C'}}>
                  Receive the food with LOVE!{'\n'}
                  Time to pick!
                  Ready to Eat!
                  {/*<Text style={{color: 'white'}}> LOVE! </Text>*/}
               </Text>
               {/*<Text className={'text-white font-bold text-xl text-center'}>Lots of love to share and receive!</Text>
               <Text className={'text-white font-bold text-xl text-center'} style={{color: 'red'}}>LOVE!</Text>*/}
            </View>
         </View>
         <View className={'w-[48%] flex flex-row-reverse'}>
            <Image source={require('./assets/VolunteerPic.png')} style={styles.image} />
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

export default VolunteerCard;
