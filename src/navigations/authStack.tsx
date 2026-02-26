import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/auth/splashScreen";
import RiderRegistrationFlow from "../screens/auth/riderRegistrationFlow";

const Stack = createNativeStackNavigator();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen
        name="RiderRegistrationFlow"
        component={RiderRegistrationFlow}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
