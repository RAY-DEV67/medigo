import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  Bell,
  Home,
  Calendar,
  CircleDollarSign,
  MessageSquare,
  User,
  Headset,
  MapPin,
  Clock,
  ChevronRight,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const DriverDashboard = () => {
  // Set to true to match the "Online" design
  const [isOnline, setIsOnline] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <User color="#2563EB" size={24} />
          </View>
          <View>
            <Text style={styles.greeting}>Good afternoon</Text>
            <Text style={styles.userName}>John Driver</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Bell color="#0F172A" size={24} />
        </TouchableOpacity>
      </View>

      {/* Online Toggle Bar */}
      <View style={styles.toggleBar}>
        <View style={styles.statusInfo}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isOnline ? "#22C55E" : "#CBD5E1" },
            ]}
          />
          <View>
            <Text style={styles.statusText}>
              {isOnline ? "Online" : "Offline"}
            </Text>
            <Text style={styles.statusSubtext}>
              {isOnline
                ? "You're receiving ride requests"
                : "Not receiving ride requests"}
            </Text>
          </View>
        </View>
        <Switch
          trackColor={{ false: "#E2E8F0", true: "#2563EB" }}
          thumbColor="#FFF"
          onValueChange={() => setIsOnline(!isOnline)}
          value={isOnline}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Earnings & Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.heroStatusRow}>
            <View style={[styles.heroDot, { backgroundColor: "#22C55E" }]} />
            <Text style={styles.heroStatusText}>You're Online</Text>
          </View>
          <Text style={styles.receivingText}>Receiving ride requests</Text>

          <Text style={styles.todayLabel}>Today's Earnings</Text>
          <Text style={styles.earningsAmount}>$127.50</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Trips Today</Text>
              <Text style={styles.statValue}>8</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Hours Online</Text>
              <Text style={styles.statValue}>5.5</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Rating</Text>
              <View style={styles.ratingRow}>
                <Text style={styles.star}>★</Text>
                <Text style={styles.statValue}>4.8</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Upcoming Rides Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Rides</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
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
          <RideCard
            time="Today • 2:30 PM"
            pickup="2847 Maple Avenue"
            dest="Springfield General Hospital"
          />
          <RideCard
            time="Tomorrow • 10:00 AM"
            pickup="2847 Maple Avenue"
            dest="City Medical Center"
          />
        </ScrollView>
      </ScrollView>

      {/* Floating Support Button */}
      <TouchableOpacity style={styles.floatingSupport}>
        <Headset color="#2563EB" size={24} />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <NavTab icon={<Home color="#2563EB" size={24} />} label="Home" active />
        <NavTab
          icon={<Calendar color="#64748B" size={24} />}
          label="My Trips"
        />
        <NavTab
          icon={<CircleDollarSign color="#64748B" size={24} />}
          label="Earnings"
        />
        <NavTab
          icon={<MessageSquare color="#64748B" size={24} />}
          label="Chats"
        />
        <NavTab icon={<User color="#64748B" size={24} />} label="Profile" />
      </View>
    </SafeAreaView>
  );
};

const RideCard = ({ time, pickup, dest }) => (
  <View style={styles.rideCard}>
    <View style={styles.cardHeader}>
      <Clock size={16} color="#64748B" />
      <Text style={styles.cardTime}>{time}</Text>
    </View>

    <View style={styles.routeContainer}>
      <View style={styles.routeLineBox}>
        <View style={styles.dotBlue} />
        <View style={styles.line} />
        <View style={styles.dotRed} />
      </View>
      <View style={styles.addressBox}>
        <Text style={styles.addrLabel}>Pickup</Text>
        <Text style={styles.addrText}>{pickup}</Text>
        <Text style={[styles.addrLabel, { marginTop: 12 }]}>Destination</Text>
        <Text style={styles.addrText}>{dest}</Text>
      </View>
    </View>

    <View style={styles.badgeRow}>
      <View style={styles.medicalBadge}>
        <Text style={styles.medicalBadgeText}>Medical Appointment</Text>
      </View>
    </View>

    <TouchableOpacity style={styles.detailsBtn}>
      <Text style={styles.detailsBtnText}>View Details</Text>
      <ChevronRight size={16} color="#2563EB" />
    </TouchableOpacity>
  </View>
);

const NavTab = ({ icon, label, active = false }) => (
  <TouchableOpacity style={styles.tabItem}>
    {icon}
    <Text style={[styles.tabLabel, active && styles.activeTabLabel]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
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
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  greeting: { fontSize: 13, color: "#64748B" },
  userName: { fontSize: 18, fontWeight: "700", color: "#0F172A" },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F8FAFC",
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
    borderBottomColor: "#F1F5F9",
  },
  statusInfo: { flexDirection: "row", alignItems: "center", gap: 12 },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  statusText: { fontSize: 15, fontWeight: "600", color: "#0F172A" },
  statusSubtext: { fontSize: 12, color: "#64748B" },

  scrollContent: { paddingVertical: 20 },
  statsCard: {
    padding: 24,
    marginHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    marginBottom: 32,
  },
  heroStatusRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  heroDot: { width: 8, height: 8, borderRadius: 4 },
  heroStatusText: { fontSize: 16, fontWeight: "700", color: "#1E293B" },
  receivingText: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
    marginBottom: 20,
  },
  todayLabel: { fontSize: 13, color: "#64748B" },
  earningsAmount: {
    fontSize: 44,
    fontWeight: "800",
    color: "#2563EB",
    marginVertical: 8,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F8FAFC",
  },
  statItem: { flex: 1 },
  statLabel: { fontSize: 12, color: "#94A3B8", marginBottom: 4 },
  statValue: { fontSize: 16, fontWeight: "700", color: "#1E293B" },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#F1F5F9",
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
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#0F172A" },
  viewAll: { fontSize: 14, fontWeight: "600", color: "#2563EB" },

  // Ride Card Styling
  rideScroll: { paddingLeft: 20, paddingRight: 4 },
  rideCard: {
    width: width * 0.85,
    backgroundColor: "#FFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    padding: 20,
    marginRight: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  cardTime: { fontSize: 14, fontWeight: "700", color: "#1E293B" },
  routeContainer: { flexDirection: "row", gap: 12 },
  routeLineBox: { alignItems: "center", paddingVertical: 4 },
  dotBlue: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#3B82F6" },
  dotRed: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#EF4444" },
  line: { width: 1, height: 30, backgroundColor: "#E2E8F0", marginVertical: 4 },
  addressBox: { flex: 1 },
  addrLabel: { fontSize: 12, color: "#94A3B8" },
  addrText: { fontSize: 14, fontWeight: "600", color: "#1E293B", marginTop: 2 },
  badgeRow: { marginTop: 20 },
  medicalBadge: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  medicalBadgeText: { fontSize: 12, color: "#2563EB", fontWeight: "500" },
  detailsBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F8FAFC",
  },
  detailsBtnText: { color: "#2563EB", fontWeight: "600", fontSize: 14 },

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
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    backgroundColor: "#FFF",
  },
  tabItem: { alignItems: "center", gap: 4 },
  tabLabel: { fontSize: 10, color: "#64748B", fontWeight: "500" },
  activeTabLabel: { color: "#2563EB" },
});

export default DriverDashboard;
