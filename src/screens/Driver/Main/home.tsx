import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import { Bell, User, Headset, Clock, ChevronRight } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "../../../hooks/useThemes";
import { commonStyles } from "../../../styles/commonStyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUserStore } from "../../../store/userStore";
import { useWalletBalance } from "../../../hooks/queries/useWalletBalance";
import { useEarningsSummary } from "../../../hooks/queries/useEarningSummary";
import Buttons from "../../../components/buttons/buttons";
import { LinearGradient } from "expo-linear-gradient";
import { useDriverUpcomingRides } from "../../../hooks/queries/useDriverUpcomingRide";
import { useUpdateDriverStatus } from "../../../hooks/mutations/useUser";

const { width } = Dimensions.get("window");

const DriverDashboard = () => {
  const { user } = useUserStore();
  const { colors, theme } = useTheme();
  const commonStyling = commonStyles(colors);

  const [isOnline, setIsOnline] = useState(user?.data?.is_active ?? false);
  useEffect(() => {
    if (user?.data?.is_active !== undefined) {
      setIsOnline(user.data.is_active);
    }
  }, [user?.data?.is_active]);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { data, isLoading } = useEarningsSummary();
  const summary = data?.data;
  const {
    data: driverUpcomingRides,
    refetch,
    isRefetching,
  } = useDriverUpcomingRides();
  const rides = driverUpcomingRides?.data || [];

  const { mutate: updateStatus, isPending } = useUpdateDriverStatus();

  const handleToggleOnline = (value: boolean) => {
    // Update UI immediately for a snappy feel
    setIsOnline(value);

    // Send to server
    updateStatus(
      { is_online: value },
      {
        onError: () => {
          // If the API fails, revert the switch back to its previous state
          setIsOnline(!value);
        },
      },
    );
  };

  console.log(user);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.surfacePrimary,
        },
      ]}
    >
      <StatusBar
        barStyle={theme === "light" ? "dark-content" : "light-content"}
      />

      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View
            style={[
              styles.avatarContainer,
              {
                backgroundColor: colors.surfaceBrand,
              },
            ]}
          >
            <User color={colors.primaryColor} size={24} />
          </View>
          <View>
            <Text
              style={[
                commonStyling.subtitle,
                {
                  fontSize: 14,
                },
              ]}
            >
              Good afternoon
            </Text>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 18,
                  fontFamily: "Bold",
                },
              ]}
            >
              {user?.data?.first_name} {user?.data?.last_name}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.iconButton,
            {
              backgroundColor: colors.surfaceSecondary,
            },
          ]}
          onPress={() => {
            navigation.navigate("RiderNotificationStack");
          }}
        >
          <Bell color={colors.textSecondary} size={24} />
        </TouchableOpacity>
      </View>

      {/* Online Toggle Bar */}
      <View
        style={[
          styles.toggleBar,
          {
            borderBottomColor: colors.lightPrimaryBlueBorder,
          },
        ]}
      >
        <View style={styles.statusInfo}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isOnline ? "#22C55E" : "#CBD5E1" },
            ]}
          />
          <View>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 14,
                  fontFamily: "SemiBold",
                },
              ]}
            >
              {isOnline ? "Online" : "Offline"}
            </Text>
            <Text
              style={[
                commonStyling.subtitle,
                {
                  fontSize: 12,
                },
              ]}
            >
              {isOnline
                ? "You're receiving ride requests"
                : "Not receiving ride requests"}
            </Text>
          </View>
        </View>
        <Switch
          trackColor={{ false: "#E2E8F0", true: "#2563EB" }}
          thumbColor="#FFF"
          onValueChange={() => {
            handleToggleOnline(!isOnline);
          }}
          value={isOnline}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Earnings & Stats Card */}
        {isOnline ? (
          <View
            style={[
              styles.statsCard,
              { borderColor: colors.lightPrimaryBlueBorder },
            ]}
          >
            <View style={styles.heroStatusRow}>
              <View style={[styles.heroDot, { backgroundColor: "#22C55E" }]} />
              <Text
                style={[
                  commonStyling.title,
                  { fontSize: 14, fontFamily: "Bold" },
                ]}
              >
                You're Online
              </Text>
            </View>
            <Text
              style={[
                styles.receivingText,
                commonStyling.subtitle,
                {
                  fontSize: 12,
                },
              ]}
            >
              Receiving ride requests
            </Text>

            <Text
              style={[
                commonStyling.subtitle,
                {
                  fontSize: 12,
                },
              ]}
            >
              Today's Earnings
            </Text>
            <Text
              style={[
                styles.earningsAmount,
                {
                  fontSize: 48,
                  fontFamily: "Bold",
                  color: colors.primaryColor,
                },
              ]}
            >
              ${summary?.earnings_today}
            </Text>

            <View
              style={[
                styles.statsRow,
                {
                  borderTopColor: colors.lightPrimaryBlueBorder,
                },
              ]}
            >
              <View style={styles.statItem}>
                <Text
                  style={[
                    styles.statLabel,
                    commonStyling.subtitle,
                    {
                      fontSize: 12,
                    },
                  ]}
                >
                  Trips Today
                </Text>
                <Text
                  style={[
                    commonStyling.title,
                    {
                      fontSize: 16,
                      fontFamily: "SemiBold",
                    },
                  ]}
                >
                  {summary?.trips_today}
                </Text>
              </View>
              <View
                style={[
                  styles.statDivider,
                  {
                    backgroundColor: colors.lightPrimaryBlueBorder,
                  },
                ]}
              />
              <View style={styles.statItem}>
                <Text
                  style={[
                    styles.statLabel,
                    commonStyling.subtitle,
                    {
                      fontSize: 12,
                    },
                  ]}
                >
                  Hours Online
                </Text>
                <Text
                  style={[
                    commonStyling.title,
                    {
                      fontSize: 16,
                      fontFamily: "SemiBold",
                    },
                  ]}
                >
                  {summary?.hours_today}
                </Text>
              </View>
              <View
                style={[
                  styles.statDivider,
                  {
                    backgroundColor: colors.lightPrimaryBlueBorder,
                  },
                ]}
              />
              <View style={styles.statItem}>
                <Text
                  style={[
                    styles.statLabel,
                    commonStyling.subtitle,
                    {
                      fontSize: 12,
                    },
                  ]}
                >
                  Rating
                </Text>
                <View style={styles.ratingRow}>
                  <Text style={styles.star}>★</Text>
                  <Text
                    style={[
                      commonStyling.title,
                      {
                        fontSize: 16,
                        fontFamily: "SemiBold",
                      },
                    ]}
                  >
                    4.8
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={[
              styles.statsCard,
              { borderColor: colors.lightPrimaryBlueBorder },
            ]}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  commonStyling.title,
                  { fontSize: 18, fontFamily: "Bold", textAlign: "center" },
                ]}
              >
                You're Offline
              </Text>
              <Text
                style={[
                  styles.receivingText,
                  commonStyling.subtitle,
                  {
                    fontSize: 14,
                    textAlign: "center",
                    width: 200,
                  },
                ]}
              >
                Go online to start receiving ride requests.
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                handleToggleOnline(true);
              }}
            >
              <LinearGradient
                colors={["#1A3B8E", "#06102B"]}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: 50,
                  borderRadius: 50,
                }}
              >
                <Text
                  style={[
                    commonStyling.title,
                    {
                      fontSize: 16,
                      fontFamily: "Bold",
                    },
                  ]}
                >
                  Go online
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
        {/* Upcoming Rides Header */}
        <View style={styles.sectionHeader}>
          <Text
            style={[
              commonStyling.title,
              {
                fontSize: 16,
                fontFamily: "Bold",
              },
            ]}
          >
            Upcoming Rides
          </Text>
          <TouchableOpacity>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 14,
                  color: colors.primaryColor,
                },
              ]}
              onPress={() => {
                navigation.navigate("DriverRideStack", {
                  screen: "UpcomingRidesScreen",
                });
              }}
            >
              View All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Horizontal Ride Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.rideScroll}
          snapToInterval={width * 0.85 + 16}
          decelerationRate="fast"
        >
          {rides && rides.length > 0 ? (
            rides.map((ride: any) => (
              <RideCard
                key={ride.id}
                id={ride.id}
                time={ride.scheduled_at}
                pickup={ride.pickup_address}
                dest={ride.destination_address}
                type={ride.ride_type}
              />
            ))
          ) : (
            /* Empty State when no rides are returned */
            <View
              style={[
                styles.rideCard,
                {
                  justifyContent: "center",
                  alignItems: "center",
                  width: width * 0.85,
                  marginTop: 16,
                },
              ]}
            >
              <Text
                style={[
                  commonStyling.title,
                  {
                    fontSize: 14,
                    fontFamily: "Bold",
                  },
                ]}
              >
                No upcoming rides
              </Text>

              <Text
                style={[
                  commonStyling.subtitle,
                  {
                    fontSize: 11,
                  },
                ]}
              >
                Turn on your visibility to be booked
              </Text>
            </View>
          )}
        </ScrollView>
      </ScrollView>

      {/* Floating Support Button */}
      <TouchableOpacity style={styles.floatingSupport}>
        <Headset color="#2563EB" size={24} />
      </TouchableOpacity>

      {/* Bottom Navigation */}
    </SafeAreaView>
  );
};

const RideCard = ({ time, pickup, dest }: any) => {
  const { colors, theme } = useTheme();
  const commonStyling = commonStyles(colors);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View
      style={[
        styles.rideCard,
        {
          borderColor: colors.lightPrimaryBlueBorder,
        },
      ]}
    >
      <View style={styles.cardHeader}>
        <Clock size={16} color="#64748B" />
        <Text
          style={[
            commonStyling.title,
            {
              fontSize: 14,
              fontFamily: "Bold",
            },
          ]}
        >
          {time}
        </Text>
      </View>

      <View style={styles.routeContainer}>
        <View style={styles.routeLineBox}>
          <View style={styles.dotBlue} />
          <View style={styles.line} />
          <View style={styles.dotRed} />
        </View>
        <View style={styles.addressBox}>
          <Text
            style={[
              commonStyling.subtitle,
              {
                fontSize: 12,
              },
            ]}
          >
            Pickup
          </Text>
          <Text
            style={[
              styles.addrText,
              commonStyling.title,
              {
                fontSize: 14,
              },
            ]}
          >
            {pickup}
          </Text>
          <Text
            style={[
              commonStyling.subtitle,
              {
                fontSize: 12,
                marginTop: 12,
              },
            ]}
          >
            Destination
          </Text>
          <Text
            style={[
              styles.addrText,
              commonStyling.title,
              {
                fontSize: 14,
              },
            ]}
          >
            {dest}
          </Text>
        </View>
      </View>

      <View style={styles.badgeRow}>
        <View
          style={[
            styles.medicalBadge,
            {
              backgroundColor: colors.surfaceBrand,
            },
          ]}
        >
          <Text
            style={[
              commonStyling.title,
              { fontSize: 12, color: colors.primaryColor },
            ]}
          >
            Medical Appointment
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.detailsBtn,
          {
            borderTopColor: colors.lightPrimaryBlueBorder,
          },
        ]}
        onPress={() => {
          navigation.navigate("DriverRideDetailsStack", {
            screen: "RideDetails",
          });
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontFamily: "SemiBold",
            color: colors.primaryColor,
          }}
        >
          View Details
        </Text>
        <ChevronRight size={16} color={colors.primaryColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  userInfo: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  toggleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    padding: 16,
    borderBottomWidth: 1,
  },
  statusInfo: { flexDirection: "row", alignItems: "center", gap: 12 },
  statusDot: { width: 10, height: 10, borderRadius: 5 },

  scrollContent: { paddingVertical: 20 },
  statsCard: {
    padding: 24,
    marginHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 32,
  },
  heroStatusRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  heroDot: { width: 8, height: 8, borderRadius: 4 },
  receivingText: {
    marginTop: 2,
    marginBottom: 20,
  },
  earningsAmount: {
    marginVertical: 8,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  statItem: { flex: 1 },
  statLabel: { marginBottom: 4 },
  statDivider: {
    width: 1,
    height: 30,
    marginHorizontal: 10,
  },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  star: { color: "#F59E0B", fontSize: 16 },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 16,
  },

  // Ride Card Styling
  rideScroll: { paddingLeft: 20, paddingRight: 4 },
  rideCard: {
    width: width * 0.85,
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    marginRight: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  routeContainer: { flexDirection: "row", gap: 12 },
  routeLineBox: { alignItems: "center", paddingVertical: 4 },
  dotBlue: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#3B82F6" },
  dotRed: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#EF4444" },
  line: { width: 1, height: 30, backgroundColor: "#E2E8F0", marginVertical: 4 },
  addressBox: { flex: 1 },
  addrText: { marginTop: 2 },
  badgeRow: { marginTop: 20 },
  medicalBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  detailsBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
  },

  floatingSupport: {
    position: "absolute",
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  tabItem: { alignItems: "center", gap: 4 },
  tabLabel: { fontSize: 10, color: "#64748B", fontWeight: "500" },
  activeTabLabel: { color: "#2563EB" },
});

export default DriverDashboard;
