import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { Star, ChevronRight, Stethoscope } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/reuseables/header";
import { commonStyles } from "../../../styles/commonStyles";
import useTheme from "../../../hooks/useThemes";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const MyTripsScreen = () => {
  const { colors, theme } = useTheme();
  const commonStyling = commonStyles(colors);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const trips = [
    {
      id: "1",
      time: "Today, 2:30 PM",
      status: "Scheduled",
      statusColor: colors.surfaceBrand,
      statusTextColor: colors.primaryColor,
      passenger: "Sarah Johnson",
      rating: "4.9",
      pickup: "2847 Maple Avenue",
      destination: "Springfield General Hospital",
      earnings: "$28.50",
    },
    {
      id: "2",
      time: "Tomorrow, 10:00 AM",
      status: "Assigned",
      statusColor: "#ECFDF5",
      statusTextColor: "#10B981",
      passenger: "Michael Chen",
      rating: "4.8",
      pickup: "456 Oak Street",
      destination: "Downtown Medical Center",
      earnings: "$28.50",
    },
  ];

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

      <Header title="My Trips" />

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Canceled</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {trips.map((trip) => (
          <View
            key={trip.id}
            style={[
              styles.tripCard,
              {
                borderColor: colors.lightPrimaryBlueBorder,
              },
            ]}
          >
            <View style={styles.cardHeader}>
              <Text
                style={[
                  commonStyling.title,
                  {
                    fontSize: 15,
                    fontFamily: "Bold",
                  },
                ]}
              >
                {trip.time}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: trip.statusColor },
                ]}
              >
                <Text
                  style={[styles.statusText, { color: trip.statusTextColor }]}
                >
                  {trip.status}
                </Text>
              </View>
            </View>

            <View style={styles.riderRow}>
              <View style={styles.avatarPlaceholder}>
                <Text>👤</Text>
              </View>
              <View style={styles.riderInfo}>
                <Text
                  style={[
                    commonStyling.title,
                    {
                      fontSize: 15,
                      fontFamily: "Bold",
                    },
                  ]}
                >
                  {trip.passenger}
                </Text>
                <View style={styles.ratingRow}>
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <Text
                    style={[
                      commonStyling.subtitle,
                      {
                        fontSize: 12,
                        fontFamily: "Medium",
                      },
                    ]}
                  >
                    {trip.rating}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.routeContainer}>
              <View style={styles.timeline}>
                <View style={styles.pickupDot} />
                <View style={styles.line} />
                <View style={styles.destDot} />
              </View>
              <View>
                <View>
                  <Text
                    style={[
                      styles.addressLabel,
                      commonStyling.subtitle,
                      {
                        fontSize: 11,
                        fontFamily: "SemiBold",
                      },
                    ]}
                  >
                    PICKUP
                  </Text>
                  <Text
                    style={[
                      commonStyling.title,
                      {
                        fontSize: 14,
                        fontFamily: "SemiBold",
                      },
                    ]}
                  >
                    {trip.pickup}
                  </Text>
                </View>
                <View style={{ marginTop: 16 }}>
                  <Text
                    style={[
                      styles.addressLabel,
                      commonStyling.subtitle,
                      {
                        fontSize: 11,
                        fontFamily: "SemiBold",
                      },
                    ]}
                  >
                    DESTINATION
                  </Text>
                  <Text
                    style={[
                      commonStyling.title,
                      {
                        fontSize: 14,
                        fontFamily: "SemiBold",
                      },
                    ]}
                  >
                    {trip.destination}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.medicalIndicator}>
              <Stethoscope size={16} color="#94A3B8" />
              <Text
                style={[
                  commonStyling.subtitle,
                  {
                    fontSize: 12,
                    fontFamily: "Medium",
                  },
                ]}
              >
                Medical Appointment
              </Text>
            </View>

            <View
              style={[
                styles.cardFooter,
                {
                  borderTopColor: colors.lightPrimaryBlueBorder,
                },
              ]}
            >
              <View>
                <Text
                  style={[
                    commonStyling.title,
                    {
                      fontSize: 24,
                      fontFamily: "Bold",
                    },
                  ]}
                >
                  {trip.earnings}
                </Text>
                <Text
                  style={[
                    styles.earningsLabel,
                    commonStyling.subtitle,
                    {
                      fontSize: 11,
                      fontFamily: "Medium",
                    },
                  ]}
                >
                  Estimated earnings
                </Text>
              </View>
              <TouchableOpacity style={styles.viewTripButton}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "SemiBold",
                    color: colors.primaryColor,
                  }}
                >
                  View Trip
                </Text>
                <ChevronRight size={16} color={colors.primaryColor} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: "#FFF",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { fontSize: 20, fontWeight: "800", color: "#1E293B" },
  notificationContainer: { position: "relative" },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#EF4444",
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  badgeText: { color: "#FFF", fontSize: 10, fontWeight: "800" },

  tabContainer: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: { backgroundColor: "#3B82F6" },
  tabText: { fontSize: 14, fontWeight: "600", color: "#64748B" },
  activeTabText: { color: "#FFF" },

  scrollContent: { padding: 16 },
  tripCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  statusText: { fontSize: 12, fontWeight: "700" },

  riderRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  riderInfo: { marginLeft: 12 },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },

  routeContainer: { flexDirection: "row", gap: 12, marginBottom: 16 },
  timeline: { alignItems: "center", width: 12, paddingTop: 4 },
  pickupDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3B82F6",
  },
  line: { width: 1, flex: 1, backgroundColor: "#E2E8F0", marginVertical: 4 },
  destDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#EF4444" },
  addressLabel: {
    letterSpacing: 0.5,
    marginBottom: 4,
  },

  medicalIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderTopWidth: 1,
    paddingTop: 16,
  },
  earningsLabel: { marginTop: 2 },
  viewTripButton: { flexDirection: "row", alignItems: "center", gap: 4 },

  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    justifyContent: "space-around",
  },
  navItem: { alignItems: "center", gap: 4 },
  navLabel: { fontSize: 11, fontWeight: "600", color: "#94A3B8" },
  navActive: { color: "#2563EB" },
});

export default MyTripsScreen;
