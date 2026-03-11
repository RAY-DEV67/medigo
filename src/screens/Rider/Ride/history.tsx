import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import {
  ChevronLeft,
  ChevronDown,
  Download,
  RotateCcw,
  Home,
  Clock,
  History,
  User,
  Plus,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const RideHistoryScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft color="#1A1C1E" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ride History</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.subHeader}>
          <Text style={styles.description}>All your ride history</Text>
          <TouchableOpacity style={styles.filterDropdown}>
            <History size={14} color="#3B82F6" />
            <Text style={styles.filterText}>This month</Text>
            <ChevronDown size={14} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Summary Dashboard */}
        <View style={styles.dashboardRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>TOTAL RIDES</Text>
            <Text style={styles.statValue}>5</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>TOTAL SPENT</Text>
            <Text style={[styles.statValue, { color: "#3B82F6" }]}>
              $240.75
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>All Rides</Text>

        {/* Ride Card - Paid Example */}
        <HistoryCard
          date="Feb 20, 2026"
          time="2:30 PM"
          price="$45.00"
          status="PAID"
          statusColor="#10B981"
          pickup="2847 Maple Avenue"
          destination="Springfield General Hospital"
          driver="John Smith"
          rating="4.9"
        />

        {/* Ride Card - Cancelled Example */}
        <HistoryCard
          date="Feb 15, 2026"
          time="2:30 PM"
          price="$0.00"
          status="CANCELLED"
          statusColor="#EF4444"
          pickup="2847 Maple Avenue"
          destination="North Valley Hospital"
          driver="John Smith"
          rating="0.0"
        />

        {/* Repeating Card for visual completeness */}
        <HistoryCard
          date="Feb 20, 2026"
          time="2:30 PM"
          price="$45.00"
          status="PAID"
          statusColor="#10B981"
          pickup="2847 Maple Avenue"
          destination="Springfield General Hospital"
          driver="John Smith"
          rating="4.9"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// --- History Card Component ---
const HistoryCard = ({
  date,
  time,
  price,
  status,
  statusColor,
  pickup,
  destination,
  driver,
  rating,
}: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardDate}>{date}</Text>
          <Text style={styles.cardTime}>{time}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.cardPrice}>{price}</Text>
          <Text style={[styles.cardStatus, { color: statusColor }]}>
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.routeRow}>
        <View style={styles.timeline}>
          <View style={styles.dotBlue} />
          <View style={styles.line} />
          <View style={styles.dotBlue} />
        </View>
        <View style={styles.addressBox}>
          <Text style={styles.addrLabel}>PICKUP</Text>
          <Text style={styles.addrText}>{pickup}</Text>
          <Text style={[styles.addrLabel, { marginTop: 12 }]}>DESTINATION</Text>
          <Text style={styles.addrText}>{destination}</Text>
        </View>
      </View>

      <Text style={styles.driverInfo}>
        Driver: {driver} ★ {rating}
      </Text>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.outlineBtn}
          onPress={() => {
            navigation.navigate("RiderRideDetailsStack", {
              screen: "ReceiptScreen",
            });
          }}
        >
          <Download size={16} color="#64748B" />
          <Text style={styles.outlineBtnText}>Receipt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filledBtn}>
          <RotateCcw size={16} color="#FFF" />
          <Text style={styles.filledBtnText}>Rebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
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

  scrollContent: { paddingHorizontal: 20, paddingBottom: 120 },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  description: { fontSize: 14, color: "#64748B" },
  filterDropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  filterText: {
    fontSize: 12,
    color: "#1E293B",
    marginHorizontal: 6,
    fontWeight: "600",
  },

  dashboardRow: { flexDirection: "row", gap: 12, marginBottom: 24 },
  statCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    elevation: 2,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#94A3B8",
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1E293B",
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  cardDate: { fontSize: 15, fontWeight: "700", color: "#1E293B" },
  cardTime: { fontSize: 12, color: "#94A3B8" },
  cardPrice: { fontSize: 16, fontWeight: "800", color: "#1E293B" },
  cardStatus: { fontSize: 10, fontWeight: "800", marginTop: 2 },

  routeRow: { flexDirection: "row", marginBottom: 16 },
  timeline: { width: 12, alignItems: "center", marginTop: 4 },
  dotBlue: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#3B82F6" },
  line: { width: 1, flex: 1, backgroundColor: "#F1F5F9", marginVertical: 2 },
  addressBox: { flex: 1, marginLeft: 12 },
  addrLabel: { fontSize: 10, color: "#94A3B8", letterSpacing: 0.5 },
  addrText: { fontSize: 13, fontWeight: "600", color: "#1E293B", marginTop: 2 },

  driverInfo: { fontSize: 12, color: "#64748B", marginBottom: 16 },

  actionRow: { flexDirection: "row", gap: 12 },
  outlineBtn: {
    flex: 1,
    flexDirection: "row",
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  outlineBtnText: { fontSize: 14, fontWeight: "700", color: "#64748B" },
  filledBtn: {
    flex: 1,
    flexDirection: "row",
    height: 44,
    borderRadius: 12,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  filledBtnText: { fontSize: 14, fontWeight: "700", color: "#FFF" },
});

export default RideHistoryScreen;
