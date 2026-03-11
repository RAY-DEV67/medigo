import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/auth/splashScreen";
import RiderRegistrationFlow from "../screens/auth/riderRegistrationFlow";
import ReviewAndAccept from "../screens/auth/reviewAndAccept";
import PaymentMethod from "../screens/auth/paymentMethod";
import Login from "../screens/auth/login";

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
      <Stack.Screen name="ReviewAndAccept" component={ReviewAndAccept} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
