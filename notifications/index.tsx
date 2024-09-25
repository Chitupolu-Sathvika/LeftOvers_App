import { NavigationParamType } from "@/app/_layout";
import { View, Text } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

interface DonorProps {
    navigation: NativeStackNavigationProp<NavigationParamType, 'Notifications'>;
 }
 

 const Notification: React.FC<DonorProps> = ({ navigation }) => {
        return (
            <View>
                <Text>Notifications</Text>
            </View>
        );
    }


export default Notification;