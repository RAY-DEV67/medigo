import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Switch,
} from "react-native";
import {
  ChevronLeft,
  MoreVertical,
  Home,
  Star,
  MapPin,
  Copy,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LocationDetailsScreen = () => {
  const [isFavorite, setIsFavorite] = useState(true);
  const [isDefaultPickup, setIsDefaultPickup] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn}>
          <ChevronLeft color="#1E293B" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Location Details</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <MoreVertical color="#1E293B" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtext}>Manage this pickup or destination</Text>

        {/* Location Info Card */}
        <View style={styles.mainCard}>
          <Text style={styles.sectionLabel}>Location</Text>

          <View style={styles.locationHeader}>
            <View style={styles.iconBox}>
              <Home size={24} color="#3B82F6" />
            </View>
            <View style={styles.titleWrapper}>
              <Text style={styles.locationTitle}>Home</Text>
              <Text style={styles.locationAddress}>2847 Maple Avenue,</Text>
              <Text style={styles.locationAddress}>Springfield, MA 01108</Text>
            </View>
            <View style={styles.favoriteBadge}>
              <Star size={12} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.favoriteText}>Favorite</Text>
            </View>
          </View>

          {/* Preference Toggles */}
          <View style={styles.toggleContainer}>
            <View style={styles.toggleRow}>
              <View style={styles.toggleIconCircle}>
                <Star size={20} color="#F59E0B" />
              </View>
              <View style={styles.toggleTextContent}>
                <Text style={styles.toggleTitle}>Make Favorite</Text>
                <Text style={styles.toggleSub}>
                  Quick access from dashboard
                </Text>
              </View>
              <Switch
                value={isFavorite}
                onValueChange={setIsFavorite}
                trackColor={{ false: "#E2E8F0", true: "#3B82F6" }}
              />
            </View>

            <View style={[styles.toggleRow, { marginTop: 12 }]}>
              <View style={styles.toggleIconCircle}>
                <MapPin size={20} color="#94A3B8" />
              </View>
              <View style={styles.toggleTextContent}>
                <Text style={styles.toggleTitle}>
                  "Use as Pickup for Next Ride"
                </Text>
                <Text style={styles.toggleSub}>
                  Auto-select for future bookings
                </Text>
              </View>
              <Switch
                value={isDefaultPickup}
                onValueChange={setIsDefaultPickup}
                trackColor={{ false: "#E2E8F0", true: "#3B82F6" }}
              />
            </View>
          </View>
        </View>

        {/* Map Preview Section */}
        <Text style={[styles.sectionLabel, { marginTop: 24 }]}>
          Map Preview
        </Text>
        <View style={styles.mapContainer}>
          {/* Simulated Map Background */}
          <View style={styles.mapGridLines}>
            <View style={styles.mapPinShadow}>
              <View style={styles.mapPinOuter}>
                <MapPin size={24} color="#FFF" />
              </View>
            </View>
          </View>

          {/* Address Overlay */}
          <View style={styles.mapOverlay}>
            <Text style={styles.overlayText}>2847 Maple Avenue,</Text>
            <TouchableOpacity>
              <Copy size={16} color="#3B82F6" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>
              Book Ride to This Location
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>Set as Pickup Location</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: "800", color: "#1E293B" },
  headerBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },

  content: { flex: 1, paddingHorizontal: 20 },
  subtext: { fontSize: 14, color: "#64748B", marginBottom: 24 },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 12,
  },

  mainCard: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    backgroundColor: "#FFF",
  },
  locationHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  titleWrapper: { flex: 1, marginLeft: 16 },
  locationTitle: { fontSize: 16, fontWeight: "800", color: "#1E293B" },
  locationAddress: { fontSize: 13, color: "#64748B", marginTop: 2 },
  favoriteBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  favoriteText: { fontSize: 11, fontWeight: "700", color: "#D97706" },

  toggleContainer: { gap: 8 },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  toggleIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleTextContent: { flex: 1, marginLeft: 12 },
  toggleTitle: { fontSize: 14, fontWeight: "700", color: "#1E293B" },
  toggleSub: { fontSize: 11, color: "#94A3B8", marginTop: 2 },

  mapContainer: {
    height: 180,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  mapGridLines: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  mapPinOuter: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFF",
  },
  mapPinShadow: {
    shadowColor: "#3B82F6",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  mapOverlay: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  overlayText: { fontSize: 13, fontWeight: "600", color: "#1E293B" },

  footer: { marginTop: "auto", marginBottom: 20, gap: 12 },
  primaryBtn: {
    height: 56,
    backgroundColor: "#3B82F6",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryBtnText: { color: "#FFF", fontSize: 15, fontWeight: "800" },
  secondaryBtn: {
    height: 56,
    backgroundColor: "#FFF",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#3B82F6",
  },
  secondaryBtnText: { color: "#3B82F6", fontSize: 15, fontWeight: "800" },
});

export default LocationDetailsScreen;
