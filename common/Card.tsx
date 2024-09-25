import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface CardProps {
   source: any;
   title: string;
}

const Card: React.FC<CardProps> = ({ source, title }) => {
   return (
      <View className={`rounded-[8px]`} style={styles.box}>
         <Image source={source} style={styles.image} />
         <Text className={'text-lg mt-1'}>{title}</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   image: {
      width: 50,
      height: 50
   },
   box: {
      width: 110,
      height: 110,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 10
   }
});

export default Card;
