import React from 'react';
import { View } from 'react-native';
import colors from '@/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';

interface BadgeProps {
   icon: any;
   showBadge?: boolean;
   color?: string;
}

const Badge: React.FC<BadgeProps> = ({ icon = 'badge', showBadge, color }) => {
   return (
      <View className={'inline relative'}>
         <MaterialIcons name={icon} size={28} color={color || colors.greyXLight} />
         {showBadge && (
            <View className={'absolute right-0 top-0 w-2 h-2 bg-grey-x-light rounded-[50px]'} />
         )}
      </View>
   );
};
export default Badge;
