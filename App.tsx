import "react-native-get-random-values";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import AuthStack from "./src/navigations/authStack";
import RiderMainStack from "./src/navigations/RiderMainStack";
import RiderRideStack from "./src/navigations/riderRideStack";
import RiderProfileStack from "./src/navigations/riderProfileStack";
import RiderProfileContentsStack from "./src/navigations/riderProfileContentsStack";
import RiderRideDetailsStack from "./src/navigations/riderRideDetailsStack";
import RiderNotificationStack from "./src/navigations/riderNotificationStack";
import ThemeProvider from "./src/context/themeProvider";
import { AuthProvider } from "./src/context/authContext";
import { toastConfig } from "./src/components/toastConfig";
import NetInfo from "@react-native-community/netinfo";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ModalComponent from "./src/components/modals/modal";
import { Text, TextInput } from "react-native";
import { QueryProvider } from "./src/providers/queryProvider";
import { useRouteStore } from "./src/store/useRouteStore";
import RouteHeaderCard from "./src/components/map/routeHeaderCard";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useOTAUpdate } from "./src/hooks/useOTAUpdates";
import { navigationRef } from "./src/utils/navigationRef";
import Navbar from "./src/components/navbar";

enableScreens(true);

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const RiderMainTabs = () => (
  <Tab.Navigator
    tabBar={(props) => <Navbar {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen name="Main" component={RiderMainStack} />
    <Tab.Screen name="RiderRideStack" component={RiderRideStack} />
    <Tab.Screen name="RiderProfileStack" component={RiderProfileStack} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RiderMainTabs" component={RiderMainTabs} />
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen
        name="RiderNotificationStack"
        component={RiderNotificationStack}
      />
      <Stack.Screen
        name="RiderRideDetailsStack"
        component={RiderRideDetailsStack}
      />
      <Stack.Screen
        name="RiderProfileContentsStack"
        component={RiderProfileContentsStack}
      />
    </Stack.Navigator>
  );
};

(Text as any).defaultProps = (Text as any).defaultProps || {};
(Text as any).defaultProps.allowFontScaling = false;

(TextInput as any).defaultProps = (TextInput as any).defaultProps || {};
(TextInput as any).defaultProps.allowFontScaling = false;

const App: React.FC = () => {
  useOTAUpdate();
  const [fontsLoaded] = useFonts({
    Regular: require("./assets/fonts/Inter_18pt-Regular.ttf"),
    Medium: require("./assets/fonts/Inter_18pt-Medium.ttf"),
    Bold: require("./assets/fonts/Inter_24pt-Bold.ttf"),
    SemiBold: require("./assets/fonts/Inter_18pt-SemiBold.ttf"),
  });
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isReady, setIsReady] = useState(false);
  const { isVisible, pickup, destination, hideRoute } = useRouteStore();

  /** 🌐 INTERNET LISTENER */
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? true);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
      setIsReady(true);
    }
  }, [fontsLoaded]);

  if (!isReady || !fontsLoaded) return null;

  return (
    <QueryProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <ThemeProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <NavigationContainer ref={navigationRef}>
                {isConnected === false && (
                  <ModalComponent
                    visible
                    onClose={() => {}}
                    title="No internet connection"
                  >
                    <Text style={{ marginTop: 16 }}>
                      Please check your connection and try again.
                    </Text>
                  </ModalComponent>
                )}

                <AppNavigator />
              </NavigationContainer>
              <RouteHeaderCard
                isVisible={isVisible}
                pickup={pickup}
                destination={destination}
                onClose={hideRoute}
              />
              <Toast config={toastConfig} />
            </GestureHandlerRootView>
          </ThemeProvider>
        </SafeAreaProvider>
      </AuthProvider>
    </QueryProvider>
  );
};

export default App;
