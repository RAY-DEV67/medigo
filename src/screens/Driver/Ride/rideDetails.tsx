import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import {
  X,
  Phone,
  Calendar,
  MapPin,
  Navigation,
  Clock,
  CircleDot,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "../../../hooks/useThemes";
import { commonStyles } from "../../../styles/commonStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Buttons from "../../../components/buttons/buttons";
import { useRideDetail } from "../../../hooks/queries/useRideDetails";
import { RideDetailsSkeleton } from "../../../components/skelentonAnimation/rideDetailsSkelenton";
import { formatHumanReadableDate } from "../../../utils/formatHumanReadableDate";

const RideDetails = () => {
  const { colors, theme } = useTheme();
  const commonStyling = commonStyles(colors);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<any>();
  const { id } = route.params;
  const { data, isLoading } = useRideDetail(id);

  if (isLoading || !data) {
    return <RideDetailsSkeleton />;
  }

  console.log(data);

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

      {/* Header */}
      <View
        style={[
          styles.header,
          {
            borderBottomColor: colors.lightPrimaryBlueBorder,
          },
        ]}
      >
        <View>
          <Text
            style={[
              commonStyling.title,
              {
                fontSize: 20,
                fontFamily: "Bold",
              },
            ]}
          >
            Ride Details
          </Text>
          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: colors.surfaceBrand,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Medium",
                  color: colors.primaryColor,
                }}
              >
                Scheduled
              </Text>
            </View>
            <Text
              style={[
                commonStyling.subtitle,
                {
                  fontSize: 12,
                },
              ]}
            >
              {" "}
              {formatHumanReadableDate(data.data.scheduled_at)}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <X color="#0F172A" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Rider Information */}
        <Text
          style={[
            styles.sectionLabel,
            commonStyling.subtitle,
            {
              fontSize: 10,
              fontFamily: "Medium",
            },
          ]}
        >
          RIDER INFORMATION
        </Text>
        <View
          style={[
            styles.card,
            {
              borderColor: colors.lightPrimaryBlueBorder,
            },
          ]}
        >
          <View style={styles.riderRow}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarIcon}>👤</Text>
            </View>
            <View style={styles.riderInfo}>
              <Text
                style={[
                  commonStyling.title,
                  {
                    fontSize: 16,
                    fontFamily: "Bold",
                  },
                ]}
              >
                {data.data.rider_name}
              </Text>
              <Text
                style={[
                  styles.riderStats,
                  commonStyling.subtitle,
                  {
                    fontSize: 12,
                  },
                ]}
              >
                ⭐ {data.data.rider_rating} • {data.data.rider_trip_count} rides
              </Text>
              <View style={[styles.medicalBadge]}>
                <CircleDot size={12} color={colors.primaryColor} />
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: "Medium",
                    color: colors.primaryColor,
                  }}
                >
                  {data.data.ride_type}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.phoneButton}>
              <Phone size={20} color="#FFF" fill="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Schedule */}
        <Text
          style={[
            styles.sectionLabel,
            commonStyling.subtitle,
            {
              fontSize: 10,
              fontFamily: "Medium",
            },
          ]}
        >
          SCHEDULE
        </Text>
        <View
          style={[
            styles.card,
            {
              borderColor: colors.lightPrimaryBlueBorder,
            },
          ]}
        >
          <View style={styles.scheduleRow}>
            <View style={styles.calendarIconBg}>
              <Calendar size={22} color="#3B82F6" />
            </View>
            <View>
              <Text
                style={[
                  commonStyling.title,
                  {
                    fontSize: 16,
                    fontFamily: "Bold",
                  },
                ]}
              >
                {formatHumanReadableDate(data.data.appointment_time)}
              </Text>
              <Text
                style={[
                  commonStyling.subtitle,
                  {
                    fontSize: 12,
                  },
                ]}
              >
                Pickup time
              </Text>
            </View>
          </View>
        </View>

        {/* Route */}
        <Text
          style={[
            styles.sectionLabel,
            commonStyling.subtitle,
            {
              fontSize: 10,
              fontFamily: "Medium",
            },
          ]}
        >
          ROUTE
        </Text>
        <View
          style={[
            styles.card,
            {
              borderColor: colors.lightPrimaryBlueBorder,
            },
          ]}
        >
          <View style={styles.routeRow}>
            <View style={styles.timeline}>
              <View style={styles.pickupDot} />
              <View style={styles.line} />
              <View style={styles.destDot} />
            </View>
            <View style={styles.addressContainer}>
              <View>
                <Text
                  style={[
                    styles.addressLabel,
                    commonStyling.subtitle,
                    {
                      fontSize: 10,
                    },
                  ]}
                >
                  Pickup
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
                  {data.data.pickup_address}
                </Text>
              </View>
              <View style={{ marginTop: 24 }}>
                <Text
                  style={[
                    styles.addressLabel,
                    commonStyling.subtitle,
                    {
                      fontSize: 10,
                    },
                  ]}
                >
                  Destination
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
                  {data.data.destination_address}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Trip Details Metrics */}
        <Text
          style={[
            styles.sectionLabel,
            commonStyling.subtitle,
            {
              fontSize: 10,
              fontFamily: "Medium",
            },
          ]}
        >
          TRIP DETAILS
        </Text>
        <View style={styles.metricsContainer}>
          <View
            style={[
              styles.metricItem,
              {
                borderColor: colors.lightPrimaryBlueBorder,
              },
            ]}
          >
            <View
              style={[
                styles.metricIconBg,
                {
                  backgroundColor: colors.surfaceSecondary,
                },
              ]}
            >
              <MapPin size={20} color="#64748B" />
            </View>
            <Text
              style={[
                styles.metricLabel,
                commonStyling.subtitle,
                {
                  fontSize: 10,
                },
              ]}
            >
              Distance
            </Text>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 14,
                  fontFamily: "Bold",
                },
              ]}
            >
              {data.data.actual_distance_miles} mi
            </Text>
          </View>
          <View
            style={[
              styles.metricItem,
              {
                borderColor: colors.lightPrimaryBlueBorder,
              },
            ]}
          >
            <View
              style={[
                styles.metricIconBg,
                {
                  backgroundColor: colors.surfaceSecondary,
                },
              ]}
            >
              <Clock size={20} color="#64748B" />
            </View>
            <Text
              style={[
                styles.metricLabel,
                commonStyling.subtitle,
                {
                  fontSize: 10,
                },
              ]}
            >
              Duration
            </Text>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 14,
                  fontFamily: "Bold",
                },
              ]}
            >
              {data.data.actual_duration_minutes} min
            </Text>
          </View>
          <View
            style={[
              styles.metricItem,
              {
                borderColor: colors.lightPrimaryBlueBorder,
              },
            ]}
          >
            <View
              style={[
                styles.metricIconBg,
                {
                  backgroundColor: colors.surfaceSecondary,
                },
              ]}
            >
              <Text style={styles.fareIcon}>$</Text>
            </View>
            <Text
              style={[
                styles.metricLabel,
                commonStyling.subtitle,
                {
                  fontSize: 10,
                },
              ]}
            >
              Fare
            </Text>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 14,
                  fontFamily: "Bold",
                  color: "#10B981",
                },
              ]}
            >
              ${data.data.final_fare}
            </Text>
          </View>
        </View>

        <Buttons title="Navigate to Pickup" onPress={() => {}} />

        <View
          style={{
            marginTop: 16,
          }}
        >
          <Buttons type="cancel" title="Cancel Ride" onPress={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
  },

  statusRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },

  scrollContent: { padding: 20 },
  sectionLabel: {
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 10,
  },

  card: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
  },
  riderRow: { flexDirection: "row", alignItems: "center" },
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarIcon: { fontSize: 24 },
  riderInfo: { flex: 1, marginLeft: 16 },

  riderStats: { marginVertical: 2 },
  medicalBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  phoneButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
  },

  scheduleRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  calendarIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },

  routeRow: { flexDirection: "row", gap: 16 },
  timeline: { alignItems: "center", width: 20, paddingTop: 6 },
  pickupDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#3B82F6",
  },
  line: { width: 2, flex: 1, backgroundColor: "#F1F5F9", marginVertical: 4 },
  destDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#EF4444",
  },
  addressContainer: { flex: 1 },
  addressLabel: { marginBottom: 2 },

  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  metricItem: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    marginHorizontal: 4,
  },
  metricIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  fareIcon: { fontSize: 18, fontWeight: "700", color: "#10B981" },
  metricLabel: { marginBottom: 4 },

  navigateButton: {
    backgroundColor: "#2563EB",
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  navigateButtonText: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  cancelButton: {
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: { color: "#EF4444", fontSize: 16, fontWeight: "700" },
});

export default RideDetails;
