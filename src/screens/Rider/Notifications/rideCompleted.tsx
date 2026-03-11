import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { ChevronLeft, Calendar, User, Star } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const RideCompletedDetails = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft color="#1A1C1E" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ride completed</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Status Card */}
        <View style={styles.card}>
          <View style={styles.iconCircleBlue}>
            <Calendar color="#3B82F6" size={28} />
          </View>
          <Text style={styles.statusTitle}>Ride Completed</Text>
          <Text style={styles.statusDate}>March 4, 2026, 10:45 AM</Text>
        </View>

        {/* Message Card */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>MESSAGE</Text>
          <Text style={styles.messageText}>
            Your ride to Springfield General Hospital has been completed
            successfully.
          </Text>
        </View>

        {/* Details Card */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>DETAILS</Text>

          {/* Driver Info */}
          <View style={styles.driverRow}>
            <View style={styles.driverAvatar}>
              <User color="#3B82F6" size={24} />
            </View>
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>John Driver</Text>
              <View style={styles.ratingRow}>
                <Star color="#F59E0B" fill="#F59E0B" size={14} />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Route Timeline */}
          <View style={styles.routeContainer}>
            <View style={styles.timeline}>
              <View style={styles.dotBlue} />
              <View style={styles.line} />
              <View style={styles.dotRed} />
            </View>
            <View style={styles.addressContainer}>
              <View>
                <Text style={styles.addressLabel}>Pickup</Text>
                <Text style={styles.addressText}>2847 Maple Avenue</Text>
              </View>
              <View style={[{ marginTop: 20 }]}>
                <Text style={styles.addressLabel}>Destination</Text>
                <Text style={styles.addressText}>
                  Springfield General Hospital
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Distance</Text>
              <Text style={styles.statValue}>5.2 mi</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Duration</Text>
              <Text style={styles.statValue}>25 min</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Fare</Text>
              <Text style={[styles.statValue, { color: "#10B981" }]}>
                $28.50
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer Action */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => {
            navigation.navigate("ReceiptScreen");
          }}
        >
          <Text style={styles.buttonText}>View Receipt</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  headerTitle: { fontSize: 18, fontWeight: "800", color: "#1E293B" },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    // Soft shadow to match the clean design
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },

  iconCircleBlue: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  statusTitle: { fontSize: 24, fontWeight: "800", color: "#1E293B" },
  statusDate: { fontSize: 14, color: "#64748B", marginTop: 8 },

  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#94A3B8",
    letterSpacing: 1,
    marginBottom: 12,
  },
  messageText: { fontSize: 15, color: "#1E293B", lineHeight: 22 },

  driverRow: { flexDirection: "row", alignItems: "center" },
  driverAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  driverInfo: { marginLeft: 12 },
  driverName: { fontSize: 16, fontWeight: "700", color: "#1E293B" },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  ratingText: { fontSize: 13, color: "#64748B", marginLeft: 4 },

  divider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 20 },

  routeContainer: { flexDirection: "row" },
  timeline: { alignItems: "center", width: 20, marginTop: 5 },
  dotBlue: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#3B82F6" },
  dotRed: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#EF4444" },
  line: { width: 1, flex: 1, backgroundColor: "#E2E8F0", marginVertical: 4 },
  addressContainer: { flex: 1, marginLeft: 12 },
  addressLabel: { fontSize: 12, color: "#94A3B8" },
  addressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
    marginTop: 2,
  },

  statsRow: { flexDirection: "row", justifyContent: "space-between" },
  statItem: { alignItems: "flex-start" },
  statLabel: { fontSize: 12, color: "#94A3B8" },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 4,
  },

  footer: {
    padding: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  primaryButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});

export default RideCompletedDetails;
