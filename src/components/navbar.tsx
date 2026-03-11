import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import useTheme from "../hooks/useThemes";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo } from "react";
import { Plus, Home, Clock, History, User } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FONT_SIZES } from "../constants/sizes";

const { width } = Dimensions.get("window");

export default function Navbar({ state, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const activeIndex = state.index;
  const currentRouteName = state.routes[activeIndex].name;

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ backgroundColor: colors.surfacePrimary }}
    >
      <View style={styles.tabBarContainer}>
        <View style={styles.tabBar}>
          <TabItem
            icon={<Home color="#3B82F6" size={22} />}
            label="Home"
            active
            onPress={() => {
              navigation.navigate("Main");
            }}
          />
          <TabItem
            icon={<Clock color="#64748B" size={22} />}
            label="My Rides"
            onPress={() => {
              navigation.navigate("RiderRideStack", {
                screen: "MyRidesScreen",
              });
            }}
          />

          {/* Floating Center Button */}
          <View style={styles.centerBtnOuter}>
            <LinearGradient
              colors={["#2F6FED", "#1E4DB7"]}
              style={styles.centerBtn}
            >
              <TouchableOpacity>
                <Plus color="#FFF" size={32} />
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <TabItem
            icon={<History color="#64748B" size={22} />}
            label="History"
            onPress={() => {
              navigation.navigate("RiderRideStack", {
                screen: "RideHistoryScreen",
              });
            }}
          />
          <TabItem
            icon={<User color="#64748B" size={22} />}
            label="Profile"
            onPress={() => {
              navigation.navigate("RiderProfileStack");
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const TabItem = ({ icon, label, active, onPress }: any) => (
  <TouchableOpacity style={styles.tabItem} onPress={onPress}>
    {icon}
    <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    bottom: Platform.OS === "ios" ? 20 : 50,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  tabBar: {
    flexDirection: "row",
    width: width,
    height: 70,
    backgroundColor: "#FFF",
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  tabItem: { alignItems: "center", justifyContent: "center" },
  tabLabel: { fontSize: FONT_SIZES.SMALL, color: "#64748B", marginTop: 4 },
  tabLabelActive: { color: "#3B82F6", fontWeight: "600" },
  centerBtnOuter: {
    marginTop: -50,
    backgroundColor: "#F8FAFC",
    borderRadius: 50,
    padding: 10,
  },
  centerBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
