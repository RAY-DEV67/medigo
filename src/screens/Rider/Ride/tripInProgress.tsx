import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapScreen from "../../../components/map/map";
import { useEffect, useState } from "react";
import useTheme from "../../../hooks/useThemes";
import { commonStyles } from "../../../styles/commonStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CustomBottomSheet from "../../../components/modals/bottomSheet";
import { Info, MessageCircle, User } from "lucide-react-native";
import { useRideTracking } from "../../../hooks/useTracking";
import { storage } from "../../../utils/storage";
import locationTrackingService from "../../../services/locationTrackingService";
import { useUserStore } from "../../../store/userStore";
import { formatPrice } from "../../../utils/formatPrice";
import { milesToKm } from "../../../utils/milesToKilometer";
import { formatDuration } from "../../../utils/formatDuration";
import RideRouteCard from "../../../components/map/rideRouteCard";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const SNAP_POINTS = [SCREEN_HEIGHT * 0.5, SCREEN_HEIGHT * 0.3];
const BUTTON_GAP = 16;

function TripInProgress() {
  const [sheetHeight, setSheetHeight] = useState(SNAP_POINTS[0]);
  const { colors, theme } = useTheme();
  const commonStyling = commonStyles(colors);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const { activeRide } = route.params;
  const { user } = useUserStore();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const t = await storage.getToken();
      setToken(t);
    };
    loadToken();
  }, []);

  const { driverLocation } = useRideTracking(activeRide?.id, token || "");

  useEffect(() => {
    // 1. Connect the socket if not already connected
    locationTrackingService.connect(user.token);

    // 3. Logic to Start/Stop tracking
    if (activeRide) {
      console.log("🚀 Starting location tracking for:", activeRide.id);
      locationTrackingService.startTracking(activeRide.id).catch((err) => {
        console.error("Tracking Error:", err);
      });
    } else {
      console.log("🛑 Stopping location tracking");
      // Pass the ID to leave the room correctly
      locationTrackingService.stopTracking(activeRide?.id || "");
    }

    // Cleanup on unmount
    return () => {
      locationTrackingService.disconnect();
    };
  }, [activeRide]);

  const [activeSnapPoints, setActiveSnapPoints] = useState<number[]>([
    SCREEN_HEIGHT * 0.65,
    SCREEN_HEIGHT * 0.25,
  ]);

  console.log(activeRide);

  return (
    <View>
      <StatusBar
        barStyle={theme === "light" ? "dark-content" : "light-content"}
      />
      <View
        style={{
          height: "100%",
          width: "100%",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <MapScreen bottomOffset={sheetHeight + BUTTON_GAP} />
      </View>

      <CustomBottomSheet
        backgroundColor={colors.lightGray}
        snapPoints={activeSnapPoints}
        isScrollable={false}
      >
        <View style={styles.card}>
          {/* Driver Header Section */}
          <View style={styles.driverHeader}>
            <View style={styles.driverProfile}>
              <View style={styles.avatarContainer}>
                <User size={32} color="#2563EB" />
              </View>
              <View>
                <Text
                  style={[
                    commonStyling.title,
                    {
                      fontSize: 18,
                      fontFamily: "Bold",
                    },
                  ]}
                >
                  {activeRide.driver_name}
                </Text>
                <View style={styles.ratingRow}>
                  <Text style={styles.star}>★</Text>
                  <Text
                    style={[
                      commonStyling.title,
                      {
                        fontSize: 14,
                      },
                    ]}
                  >
                    {activeRide.driver_rating}
                  </Text>
                  <View style={styles.dot} />
                  <Text
                    style={[
                      commonStyling.subtitle,
                      {
                        fontSize: 14,
                      },
                    ]}
                  >
                    {activeRide.driver_vehicle_make}{" "}
                    {activeRide.driver_vehicle_type}{" "}
                    {activeRide.driver_vehicle_model}
                  </Text>
                </View>
              </View>
            </View>
            {/* <TouchableOpacity style={styles.chatButton}>
              <MessageCircle color="#FFF" size={24} fill="#FFF" />
            </TouchableOpacity> */}
          </View>

          {/* Route Section */}

          <RideRouteCard
            pickup={activeRide?.pickup_address}
            destination={activeRide?.destination_address}
          />

          {/* Trip Metrics Row */}
          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <Text
                style={[
                  styles.metricLabel,
                  commonStyling.subtitle,
                  {
                    fontSize: 12,
                  },
                ]}
              >
                Distance
              </Text>
              <Text
                style={[
                  commonStyling.title,
                  {
                    fontSize: 15,
                    fontFamily: "Bold",
                  },
                ]}
              >
                {milesToKm(activeRide?.estimated_distance_miles)}
              </Text>
            </View>
            <View style={styles.metricItem}>
              <Text
                style={[
                  styles.metricLabel,
                  commonStyling.subtitle,
                  {
                    fontSize: 12,
                  },
                ]}
              >
                ETA
              </Text>
              <Text
                style={[
                  commonStyling.title,
                  {
                    fontSize: 15,
                    fontFamily: "Bold",
                  },
                ]}
              >
                {formatDuration(activeRide?.estimated_duration_minutes)}
              </Text>
            </View>
            <View style={styles.metricItem}>
              <Text
                style={[
                  styles.metricLabel,
                  commonStyling.subtitle,
                  {
                    fontSize: 12,
                  },
                ]}
              >
                Fare
              </Text>
              <Text
                style={[
                  commonStyling.title,
                  {
                    fontSize: 15,
                    fontFamily: "Bold",
                    color: colors.primaryColor,
                  },
                ]}
              >
                {formatPrice(activeRide.estimated_fare)}
              </Text>
            </View>
          </View>

          {/* Medical Appointment Alert */}
          <View
            style={[
              styles.alertBox,
              {
                backgroundColor: colors.surfaceBrand,
              },
            ]}
          >
            <Info size={20} color="#2563EB" />
            <View style={styles.alertContent}>
              <Text
                style={[
                  styles.alertTitle,
                  commonStyling.title,
                  {
                    fontSize: 14,
                    color: colors.primaryColor,
                  },
                ]}
              >
                Medical Appointment
              </Text>
              <Text
                style={[
                  styles.alertDescription,
                  commonStyling.subtitle,
                  {
                    fontSize: 12,
                    color: colors.primaryColor,
                  },
                ]}
              >
                Your driver is aware this is a medical appointment and will
                ensure a comfortable, timely journey.
              </Text>
            </View>
          </View>

          {/* Contact Action */}
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact Driver</Text>
          </TouchableOpacity>
        </View>
      </CustomBottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    paddingTop: 50,
  },

  // Header
  driverHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  driverProfile: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  star: { color: "#F59E0B", fontSize: 16, marginRight: 4 },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#94A3B8",
    marginHorizontal: 8,
  },
  chatButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },

  // Route
  routeContainer: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  routeRow: { flexDirection: "row", gap: 12 },
  indicatorContainer: { alignItems: "center", width: 20 },
  pickupRing: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#2563EB",
    backgroundColor: "#FFF",
  },
  routeLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 4,
  },
  destinationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#EF4444",
  },
  locationInfo: { flex: 1 },
  locationLabel: { marginBottom: 2 },

  // Metrics
  metricsRow: { flexDirection: "row", gap: 12, marginVertical: 16 },
  metricItem: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  metricLabel: { marginBottom: 4 },

  // Alert Box
  alertBox: {
    flexDirection: "row",
    borderRadius: 16,
    padding: 16,
    gap: 12,
    marginBottom: 20,
  },
  alertContent: { flex: 1 },
  alertTitle: {
    marginBottom: 4,
  },
  alertDescription: {
    lineHeight: 18,
    opacity: 0.8,
  },

  // Button
  contactButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  contactButtonText: { fontSize: 16, fontWeight: "700", color: "#64748B" },
});

export default TripInProgress;
