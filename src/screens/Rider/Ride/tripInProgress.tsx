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
import { useState } from "react";
import useTheme from "../../../hooks/useThemes";
import { commonStyles } from "../../../styles/commonStyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import OverlayBottomSheet from "../../../components/modals/overlayBottomSheet";
import Buttons from "../../../components/buttons/buttons";
import CustomBottomSheet from "../../../components/modals/bottomSheet";
import { Info, MessageCircle, User } from "lucide-react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const SNAP_POINTS = [SCREEN_HEIGHT * 0.5, SCREEN_HEIGHT * 0.3];
const BUTTON_GAP = 16;

function TripInProgress() {
  const [sheetHeight, setSheetHeight] = useState(SNAP_POINTS[0]);
  const { colors, theme } = useTheme();
  const commonStyling = commonStyles(colors);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [activeSnapPoints, setActiveSnapPoints] = useState<number[]>([
    SCREEN_HEIGHT * 0.70,
    SCREEN_HEIGHT * 0.25,
  ]);

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
              <View style={styles.driverMeta}>
                <Text
                  style={[
                    commonStyling.title,
                    {
                      fontSize: 18,
                      fontFamily: "Bold",
                    },
                  ]}
                >
                  John Driver
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
                    4.8
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
                    Toyota Camry
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.chatButton}>
              <MessageCircle color="#FFF" size={24} fill="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Route Section */}
          <View
            style={[
              styles.routeContainer,
              {
                backgroundColor: colors.cardBackground,
              },
            ]}
          >
            <View style={styles.routeRow}>
              <View style={styles.indicatorContainer}>
                <View style={styles.pickupRing} />
                <View style={styles.routeLine} />
              </View>
              <View style={styles.locationInfo}>
                <Text
                  style={[
                    styles.locationLabel,
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
                    commonStyling.title,
                    {
                      fontSize: 14,
                    },
                  ]}
                >
                  2847 Maple Avenue
                </Text>
              </View>
            </View>

            <View style={[styles.routeRow, { marginTop: 4 }]}>
              <View style={styles.indicatorContainer}>
                <View style={styles.destinationDot} />
              </View>
              <View style={styles.locationInfo}>
                <Text
                  style={[
                    styles.locationLabel,
                    commonStyling.subtitle,
                    {
                      fontSize: 12,
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
                    },
                  ]}
                >
                  Springfield General Hospital
                </Text>
              </View>
            </View>
          </View>

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
                    fontSize: 16,
                    fontFamily: "Bold",
                  },
                ]}
              >
                4.2 mi
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
                    fontSize: 16,
                    fontFamily: "Bold",
                  },
                ]}
              >
                12 min
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
                    fontSize: 16,
                    fontFamily: "Bold",
                    color: colors.primaryColor,
                  },
                ]}
              >
                $28.50
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
  metricsRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
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
