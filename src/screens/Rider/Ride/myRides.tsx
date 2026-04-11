import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  ActivityIndicator,
} from "react-native";
import { Bell, Calendar, Headphones, X } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useTheme from "../../../hooks/useThemes";
import { commonStyles } from "../../../styles/commonStyles";
import Header from "../../../components/reuseables/header";
import { FONT_SIZES } from "../../../constants/sizes";
import { useMyRides } from "../../../hooks/queries/useMyRides";
import formatScheduledDate from "../../../utils/formatScheduleDate";
import formatTimeOnly from "../../../utils/formatScheduledTime";
import { capitalizeFirstWord } from "../../../utils/capitalizeFirstLetter";
import { MyRidesSkeleton } from "../../../components/skelentonAnimation/myRidesSkelenton";

const MyRidesScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { colors, theme } = useTheme();
  const commonStyling = commonStyles(colors);

  const { data: upcomingData, isLoading: loadingUpcoming } = useMyRides({
    status: "requested",
  });
  const { data: activeData, isLoading: loadingActive } = useMyRides({
    status: "active",
  });

  if (loadingUpcoming || loadingActive) {
    return <MyRidesSkeleton />;
  }

  const activeRide = activeData?.data?.[0];
  const upcomingRides = upcomingData?.data || [];

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

      <Header
        title="My Rides"
        rightText={
          <TouchableOpacity
            style={styles.notifButton}
            onPress={() => {
              navigation.navigate("RiderNotificationStack");
            }}
          >
            <Bell color={colors.titleText} size={24} />
            <View style={styles.notifBadge} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text
          style={[
            styles.description,
            commonStyling.subtitle,
            {
              fontSize: 14,
            },
          ]}
        >
          Manage your upcoming rides
        </Text>

        {/* --- Active Ride Section --- */}
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: colors.lightPrimaryBlueBorder,
            paddingBottom: 32,
          }}
        >
          <Text
            style={[
              styles.sectionTitle,
              commonStyling.title,
              {
                fontSize: 14,
                fontFamily: "Bold",
              },
            ]}
          >
            Active Ride
          </Text>

          {activeRide ? (
            <View style={[styles.activeCard]}>
              <View style={styles.activeHeader}>
                <View style={styles.statusRow}>
                  <View style={styles.pulseDot} />
                  <Text style={[styles.activeStatusText]}>En Route</Text>
                </View>
                <View style={styles.etaBadge}>
                  <Text style={styles.etaText}>ETA • 8 mins</Text>
                </View>
              </View>

              {/* Active Timeline */}
              <View style={styles.activeRoute}>
                <View style={styles.timelineActive}>
                  <View style={styles.dotWhite} />
                  <View style={styles.lineDashed} />
                  <View style={styles.dotWhite} />
                </View>
                <View style={styles.addressWrapper}>
                  <Text style={styles.activeAddressLabel}>Pickup</Text>
                  <Text
                    style={[
                      styles.activeAddressText,
                      commonStyling.title,
                      {
                        color: "#FFF",
                        fontSize: 14,
                      },
                    ]}
                  >
                    2847 Maple Avenue
                  </Text>
                  <Text style={[styles.activeAddressLabel, { marginTop: 12 }]}>
                    Destination
                  </Text>
                  <Text
                    style={[
                      styles.activeAddressText,
                      commonStyling.title,
                      {
                        color: "#FFF",
                        fontSize: 14,
                      },
                    ]}
                  >
                    Springfield General Hospital
                  </Text>
                </View>
              </View>

              <View style={styles.activeDivider} />

              {/* Driver Mini Profile */}
              <View style={styles.driverRow}>
                <Image
                  source={{ uri: "https://i.pravatar.cc/100?u=john" }}
                  style={styles.driverAvatar}
                />
                <View style={styles.driverInfo}>
                  <Text style={styles.driverName}>John Smith</Text>
                  <Text style={styles.driverSub}>Your Driver</Text>
                </View>
              </View>
              <Text style={styles.driverStatusMsg}>
                Driver is on the way...
              </Text>

              <TouchableOpacity style={styles.trackButton}>
                <Text style={styles.trackButtonText}>Track Ride</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 14,
                  textAlign: "center",
                },
              ]}
            >
              No active ride
            </Text>
          )}
        </View>
        {/* --- Upcoming Rides Section --- */}
        <Text
          style={[
            styles.sectionTitle,
            commonStyling.title,
            {
              fontSize: 14,
              fontFamily: "Bold",
              marginTop: 32,
            },
          ]}
        >
          Upcoming Rides
        </Text>

        {upcomingRides.length > 0 ? (
          upcomingRides.map((ride) => (
            <UpcomingRideCard
              key={ride.id}
              ride={ride}
              onPress={() => {
                navigation.navigate("RiderRideDetailsStack", {
                  screen: "RideDetails",
                  params: { id: ride.id },
                });
              }}
            />
          ))
        ) : (
          <Text
            style={[
              commonStyling.title,
              {
                fontSize: 14,
                textAlign: "center",
              },
            ]}
          >
            No upcoming rides
          </Text>
        )}
      </ScrollView>

      {/* Floating Support */}
      <TouchableOpacity style={styles.supportFloat}>
        <Headphones color="#3B82F6" size={24} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// --- Sub-components ---
const UpcomingRideCard = ({ onPress, ride }: any) => {
  const { colors } = useTheme();
  const commonStyling = commonStyles(colors);
  return (
    <View
      style={[
        styles.upcomingCard,
        {
          backgroundColor: colors.homelightPrimaryBlue50,
          borderColor: colors.lightPrimaryBlueBorder,
        },
      ]}
    >
      <View style={styles.upcomingHeader}>
        <View style={styles.upcomingDateRow}>
          <View
            style={[
              styles.iconBox,
              {
                backgroundColor: colors.surfaceElevated,
              },
            ]}
          >
            <Calendar color="#3B82F6" size={18} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 15,
                  fontWeight: "700",
                  fontFamily: "Bold",
                  marginBottom: 4,
                },
              ]}
            >
              {formatScheduledDate(ride.scheduled_at)}
            </Text>
            <Text
              style={[
                commonStyling.subtitle,
                {
                  fontSize: 12,
                },
              ]}
            >
              {formatTimeOnly(ride.scheduled_at)}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                ride.status === "requested" ? colors.surfaceElevated : "red",
            },
          ]}
        >
          <Text
            style={[
              styles.statusBadgeText,
              {
                color:
                  ride.status === "requested" ? colors.primaryColor : "red",
              },
            ]}
          >
            {capitalizeFirstWord(ride.status)}
          </Text>
        </View>
      </View>

      <View style={styles.routeContainer}>
        <View style={styles.timeline}>
          <View style={styles.dotBlue} />
          <View style={styles.line} />
          <View style={styles.dotBlue} />
        </View>
        <View style={styles.addressContainer}>
          <View>
            <Text
              style={[
                commonStyling.subtitle,
                {
                  fontSize: FONT_SIZES.SMALL,
                },
              ]}
            >
              Pickup
            </Text>
            <Text
              style={[
                styles.addressText,
                commonStyling.title,
                {
                  fontSize: FONT_SIZES.SMALL,
                },
              ]}
            >
              {ride.pickup_address}
            </Text>
          </View>
          <View style={[{ marginTop: 20 }]}>
            <Text
              style={[
                commonStyling.subtitle,
                {
                  fontSize: FONT_SIZES.SMALL,
                },
              ]}
            >
              Destination
            </Text>
            <Text
              style={[
                styles.addressText,
                commonStyling.title,
                {
                  fontSize: FONT_SIZES.SMALL,
                },
              ]}
            >
              {ride.destination_address}
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.driverAssignText}>
        {ride.assigned_by_admin_id ? "Driver • John Smith" : "Assigning driver"}
      </Text>

      <View style={styles.upcomingActions}>
        <TouchableOpacity style={styles.detailsBtn} onPress={onPress}>
          <Text style={styles.detailsBtnText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  headerTitle: { fontSize: 18, fontWeight: "800", color: "#1E293B" },
  notifButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  notifBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
    borderWidth: 1,
    borderColor: "#FFF",
  },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 150 },
  description: { marginBottom: 20 },
  sectionTitle: {
    marginTop: 10,
    marginBottom: 16,
  },

  // Active Card Styles
  activeCard: {
    backgroundColor: "#3B82F6",
    borderRadius: 24,
    padding: 20,
    elevation: 8,
    shadowColor: "#3B82F6",
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  activeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  statusRow: { flexDirection: "row", alignItems: "center" },
  pulseDot: {
    width: 9,
    height: 9,
    borderRadius: 4,
    backgroundColor: "#FFF",
    marginRight: 8,
  },
  activeStatusText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 15,
    fontFamily: "Bold",
  },
  etaBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  etaText: { color: "#FFF", fontSize: 12, fontWeight: "700" },
  activeRoute: { flexDirection: "row" },
  timelineActive: { width: 10, alignItems: "center", marginTop: 5 },
  dotWhite: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#FFF" },
  lineDashed: {
    width: 1,
    height: 40,
    borderLeftWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    borderStyle: "dashed",
    marginVertical: 4,
  },
  addressWrapper: { marginLeft: 15 },
  activeAddressLabel: { color: "rgba(255,255,255,0.7)", fontSize: 11 },
  activeAddressText: {
    marginTop: 4,
  },
  activeDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginVertical: 20,
  },
  driverRow: { flexDirection: "row", alignItems: "center" },
  driverAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  driverInfo: { marginLeft: 12 },
  driverName: { color: "#FFF", fontSize: 15, fontFamily: "Bold" },
  driverSub: { color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 4 },
  driverStatusMsg: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
    marginTop: 12,
    fontFamily: "Regular",
  },
  trackButton: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  trackButtonText: {
    color: "#3B82F6",
    fontWeight: "700",
    fontSize: 15,
    fontFamily: "Bold",
  },

  // Upcoming Card Styles
  upcomingCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
  },
  upcomingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  upcomingDateRow: { flexDirection: "row", alignItems: "center" },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusBadgeText: { fontSize: 11, fontFamily: "SemiBold" },
  upcomingRoute: { flexDirection: "row", marginBottom: 16 },
  timelineUpcoming: { width: 8, alignItems: "center", marginTop: 4 },
  dotSmallBlue: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#3B82F6",
  },
  dotSmallDark: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#1E293B",
  },
  lineSmall: {
    width: 1,
    height: 40,
    backgroundColor: "#F1F5F9",
    marginVertical: 2,
  },
  upcomingAddrLabel: { fontSize: 10, color: "#94A3B8", letterSpacing: 0.5 },
  upcomingAddrText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1E293B",
    marginTop: 2,
  },
  driverAssignText: { fontSize: 13, color: "#64748B", marginBottom: 16 },
  upcomingActions: {
    marginTop: 16,
  },
  detailsBtn: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 24,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  detailsBtnText: { color: "#FFF", fontWeight: "700", fontSize: 14 },
  cancelText: { color: "#EF4444", fontWeight: "700", fontSize: 14 },

  supportFloat: {
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
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  routeContainer: { flexDirection: "row", marginBottom: 16 },
  timeline: { alignItems: "center", width: 20, marginTop: 5 },
  dotBlue: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#3B82F6" },
  dotRed: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#EF4444" },
  line: { width: 1, flex: 1, backgroundColor: "#E2E8F0", marginVertical: 4 },
  addressContainer: { flex: 1, marginLeft: 12 },
  addressText: {
    marginTop: 2,
  },
});

export default MyRidesScreen;
