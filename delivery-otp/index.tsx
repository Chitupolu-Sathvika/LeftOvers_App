import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AxiosResponse } from 'axios';
import httpService from '@/services/http-service';
import { MaterialIcons } from '@expo/vector-icons';
import { userTypes } from '@/constants/utils';
import store from '@/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DonationDataType } from '../donor/DonationForm';
import { NavigationParamType } from '@/app/_layout';



type DeliveryOtpProps = NativeStackScreenProps<NavigationParamType, 'DeliveryOtp'> & {
   route: {
      params: {
         donation: DonationDataType;
      };
   };
   };

const DeliveryOtp: React.FC<DeliveryOtpProps> = ({ navigation, route }) => {
  const { donation } = route.params;
  const [otp, setOtp] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleOtpChange = (text: string) => {
    setOtp(text);
  };

  const handleVerifyPress = async () => {
    setLoading(true);
    setError(null);
    try {

      if(String(donation.otp) === otp){
        setSuccess(true);
        navigation.navigate('Donor');
      }else{
        setError('Invalid OTP');
      }
    } catch (err) {
      setError('Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Delivery OTP</Text>
      <Text style={{ marginBottom: 10 }}>Please enter the OTP sent to the recipient</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={handleOtpChange}
        keyboardType="number-pad"
      />
      {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
      <Button title="Verify" onPress={handleVerifyPress} disabled={loading} />
      {success ? <Text style={{ color: 'green', marginTop: 10 }}>OTP verified successfully</Text> : null}
    </View>
  );
};

export default DeliveryOtp;