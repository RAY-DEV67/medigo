import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import useTheme from "../hooks/useThemes";
import { useUserStore } from "../store/userStore";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import Home from "../../assets/icons/home";
import InactiveHome from "../../assets/icons/inactiveHome";
import Car from "../../assets/icons/car";
import ActiveRide from "../../assets/icons/activeRide";
import FilledWallet from "../../assets/icons/filledWallet";
import NavbarProfile from "../../assets/icons/navbarProfile";
import Wallet from "../../assets/icons/wallet";
import { FONT_SIZES } from "../constants/sizes";

export default function Navbar({ state, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const { user } = useUserStore();

  // The active index is now provided directly by the navigator
  const activeIndex = state.index;
  const currentRouteName = state.routes[activeIndex].name;

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ backgroundColor: colors.surfacePrimary }}
    >
      <View
        style={[
          styles.navbarContainer,
          {
            backgroundColor: colors.surfacePrimary,
            borderTopWidth: 0.2,
            borderColor: colors.stroke,
          },
        ]}
      >
        <NavItem
          label="Home"
          active={currentRouteName === "Main"}
          route="Main"
          iconActive={<Home />}
          iconInactive={<InactiveHome />}
        />

        <NavItem
          label="Rides"
          route="Rides"
          active={currentRouteName === "Rides"}
          iconActive={<ActiveRide />}
          iconInactive={<Car fill={false} color={colors.navbarInactive} />}
        />
        <NavItem
          label="Wallet"
          route="Wallet"
          active={currentRouteName === "Wallet"}
          iconActive={<FilledWallet color={colors.buttonPrimary} />}
          iconInactive={<Wallet />}
        />
        <NavItem
          label="Profile"
          route="Profile"
          active={currentRouteName === "Profile"}
          iconActive={
            <NavbarProfile width={20} color={colors.buttonPrimary} active />
          }
          iconInactive={
            <NavbarProfile width={20} color={colors.navbarInactive} />
          }
          userExists={!!user?.email}
          userPhone={user?.phone_number}
        />
        {/* ... Repeat for other items */}
      </View>
    </SafeAreaView>
  );
}

interface NavItemProps {
  label: string;
  route: string;
  active: boolean;
  iconActive: React.ReactNode;
  iconInactive: React.ReactNode;
  userExists?: boolean;
  userPhone?: string;
}

const NavItem = memo(function NavItem({
  label,
  route,
  active,
  iconActive,
  iconInactive,
  userExists,
  userPhone,
}: NavItemProps) {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const onPress = React.useCallback(() => {
    if (route === "Profile" && !userExists) {
      Toast.show({
        type: "setUpProfile",
        onPress: () => {
          Toast.hide();
          navigation.navigate("SetUpProfile", {
            screen: "ProfileSetupScreen",
            params: { onboarded: true, phone: userPhone },
          });
        },
        autoHide: false,
      });
      return;
    }

    if (!active) {
      navigation.navigate("AppTabs", {
        screen: route,
      });
    }
  }, [route, userExists, active, userPhone, navigation]);

  return (
    <View style={styles.navItem}>
      <TouchableOpacity onPress={onPress} hitSlop={30}>
        {active ? iconActive : iconInactive}
      </TouchableOpacity>
      <Text
        style={[
          styles.navText,
          { color: active ? colors.titleText : colors.inputText },
        ]}
      >
        {label}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  topBorder: {
    height: 2,
    width: "100%",
    opacity: 0.5,
  },
  navbarContainer: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: Platform.OS === "ios" ? 10 : 12,
    paddingTop: 6,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    fontSize: FONT_SIZES.SMALL,
    marginTop: 4,
  },
});
