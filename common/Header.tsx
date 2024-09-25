import React from 'react';
import { Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '@/constants/colors';

interface HeaderProps {
   navigation: any;
}

const Header: React.FC<HeaderProps> = ({ navigation }) => {
   return (
      <View className={'h-28 flex flex-row items-center justify-between px-5'}>
         <View className={'flex flex-row items-center gap-x-3'}>
            <Text className={'font-bold text-2xl italic text-primary'}>Hi, Sathvika</Text>
            <MaterialIcons name={'waving-hand'} size={28} color={colors.primary} />
         </View>
         <View className={'bg-grey-4x-light p-2 rounded-[50px]'}>
            <MaterialIcons
               name={'person'}
               size={28}
               onPress={() => navigation.navigate('Profile')}
            />
         </View>
      </View>
   );
};

export default Header;
