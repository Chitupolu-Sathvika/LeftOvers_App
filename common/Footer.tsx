import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Badge from '@/components/common/Badge';

export type FooterItemType = { icon: string; showBadge?: boolean; onClick?: () => void };

interface FooterProps {
   menu: FooterItemType[];
}

const Footer: React.FC<FooterProps> = ({ menu }) => {
   const [selected, setSelected] = useState<string>('home');

   const handleItemClick = async (item: FooterItemType) => {
      setSelected(item.icon);
      item.onClick?.();
   };

   return (
      <View
         className={
            'w-full absolute bottom-0 left-0 h-16 bg-gray-500 flex flex-row items-center justify-evenly pl-6 pr-6'
         }
         style={styles.box}
      >
         {menu.map((item: FooterItemType, index: number) => (
            <View
               key={index}
               className={`w-12 h-12 flex items-center justify-center rounded-[50px] ${selected === item.icon ? 'bg-grey-3x-light' : ''}`}
               onTouchStart={() => handleItemClick(item)}
            >
               <Badge icon={item.icon} showBadge={item.showBadge} />
            </View>
         ))}
      </View>
   );
};

const styles = StyleSheet.create({
   box: {
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 10
   }
});

export default Footer;
