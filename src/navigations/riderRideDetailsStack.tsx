import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RideDetails from "../screens/Rider/Ride/rideDetails";
import ReceiptScreen from "../screens/Rider/Ride/rideReceipt";

const Stack = createNativeStackNavigator();

const RiderRideDetailsStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="RideDetails" component={RideDetails} />
      <Stack.Screen name="ReceiptScreen" component={ReceiptScreen} />
    </Stack.Navigator>
  );
};

export default RiderRideDetailsStack;
