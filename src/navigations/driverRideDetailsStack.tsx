import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RideDetails from "../screens/Driver/Ride/rideDetails";


const Stack = createNativeStackNavigator();

const DriverRideDetailsStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="RideDetails" component={RideDetails} />
      
    </Stack.Navigator>
  );
};

export default DriverRideDetailsStack;
