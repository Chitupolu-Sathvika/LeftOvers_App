import React from 'react';
import { DonationDataType } from '@/components/donor/DonationForm';
import { ScrollView } from 'react-native';
import DonationItem from '@/components/donor/DonationItem';

interface DonationsProps {
   donations: any;
   navigation: any;
}

const Donations: React.FC<DonationsProps> = ({ donations, navigation }) => {
   return (
      <ScrollView className={'h-full bg-white mt-3'}>
         {donations?.map?.((donation: DonationDataType, index: number) => (
            <DonationItem
               key={index}
               donation={donation}
               borderBottom={index + 1 !== donations.length}
               navigation={navigation}
            />
         ))}
      </ScrollView>
   );
};

export default Donations;
