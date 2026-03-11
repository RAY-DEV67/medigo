import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import {
  ChevronLeft,
  Bell,
  Calendar,
  Clock,
  Headphones,
  Plus,
  Home,
  History,
  User,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const MyRidesScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft color="#1A1C1E" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Rides</Text>
        <TouchableOpacity style={styles.notifButton}>
          <Bell color="#1A1C1E" size={24} />
          <View style={styles.notifBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.description}>Manage your upcoming rides</Text>

        {/* --- Active Ride Section --- */}
        <Text style={styles.sectionTitle}>Active Ride</Text>
        <View style={styles.activeCard}>
          <View style={styles.activeHeader}>
            <View style={styles.statusRow}>
              <View style={styles.pulseDot} />
              <Text style={styles.activeStatusText}>En Route</Text>
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
              <Text style={styles.activeAddressText}>2847 Maple Avenue</Text>
              <Text style={[styles.activeAddressLabel, { marginTop: 12 }]}>
                Destination
              </Text>
              <Text style={styles.activeAddressText}>
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
          <Text style={styles.driverStatusMsg}>Driver is on the way...</Text>

          <TouchableOpacity style={styles.trackButton}>
            <Text style={styles.trackButtonText}>Track Ride</Text>
          </TouchableOpacity>
        </View>

        {/* --- Upcoming Rides Section --- */}
        <Text style={styles.sectionTitle}>Upcoming Rides</Text>

        <UpcomingRideCard
          date="Today"
          time="2:30 PM"
          status="Confirmed"
          statusColor="#DCFCE7"
          statusTextColor="#10B981"
          destination="Springfield General Hospital"
          onPress={() => {
            navigation.navigate("RiderRideDetailsStack");
          }}
        />

        <UpcomingRideCard
          date="Tomorrow"
          time="10:00 AM"
          status="Scheduled"
          statusColor="#EFF6FF"
          statusTextColor="#3B82F6"
          destination="Downtown Medical Center"
          isAssigning
          onPress={() => {
            navigation.navigate("RiderRideDetailsStack");
          }}
        />

        <UpcomingRideCard
          date="Feb 24"
          time="10:00 AM"
          status="Scheduled"
          statusColor="#EFF6FF"
          statusTextColor="#3B82F6"
          pickup="150 Tech Park Drive"
          destination="City Clinic"
          isAssigning
          onPress={() => {
            navigation.navigate("RiderRideDetailsStack");
          }}
        />
      </ScrollView>

      {/* Floating Support */}
      <TouchableOpacity style={styles.supportFloat}>
        <Headphones color="#3B82F6" size={24} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// --- Sub-components ---
const UpcomingRideCard = ({
  date,
  time,
  status,
  statusColor,
  statusTextColor,
  pickup = "2847 Maple Avenue",
  destination,
  isAssigning,
  onPress,
}: any) => (
  <View style={styles.upcomingCard}>
    <View style={styles.upcomingHeader}>
      <View style={styles.upcomingDateRow}>
        <View style={styles.iconBox}>
          <Calendar color="#3B82F6" size={18} />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.upcomingDateText}>{date}</Text>
          <Text style={styles.upcomingTimeText}>{time}</Text>
        </View>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
        <Text style={[styles.statusBadgeText, { color: statusTextColor }]}>
          {status}
        </Text>
      </View>
    </View>

    <View style={styles.upcomingRoute}>
      <View style={styles.timelineUpcoming}>
        <View style={styles.dotSmallBlue} />
        <View style={styles.lineSmall} />
        <View style={styles.dotSmallDark} />
      </View>
      <View style={{ marginLeft: 12 }}>
        <Text style={styles.upcomingAddrLabel}>PICKUP</Text>
        <Text style={styles.upcomingAddrText}>{pickup}</Text>
        <Text style={[styles.upcomingAddrLabel, { marginTop: 12 }]}>
          DESTINATION
        </Text>
        <Text style={styles.upcomingAddrText}>{destination}</Text>
      </View>
    </View>

    <Text style={styles.driverAssignText}>
      {isAssigning ? "Assigning driver" : "Driver • John Smith"}
    </Text>

    <View style={styles.upcomingActions}>
      <TouchableOpacity style={styles.detailsBtn} onPress={onPress}>
        <Text style={styles.detailsBtnText}>View Details</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
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
  description: { fontSize: 14, color: "#64748B", marginBottom: 20 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1E293B",
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
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFF",
    marginRight: 8,
  },
  activeStatusText: { color: "#FFF", fontWeight: "600", fontSize: 14 },
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
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
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
  driverName: { color: "#FFF", fontSize: 15, fontWeight: "700" },
  driverSub: { color: "rgba(255,255,255,0.7)", fontSize: 12 },
  driverStatusMsg: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
    marginTop: 12,
  },
  trackButton: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  trackButtonText: { color: "#3B82F6", fontWeight: "700", fontSize: 15 },

  // Upcoming Card Styles
  upcomingCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
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
    backgroundColor: "#EFF6FF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  upcomingDateText: { fontSize: 15, fontWeight: "700", color: "#1E293B" },
  upcomingTimeText: { fontSize: 12, color: "#64748B" },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusBadgeText: { fontSize: 11, fontWeight: "700" },
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailsBtn: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 24,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
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
});

export default MyRidesScreen;
