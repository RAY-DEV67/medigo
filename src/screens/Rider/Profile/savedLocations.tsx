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
  ChevronRight,
  Plus,
  Home,
  Building2,
  MapPin,
  Star,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const SavedLocationsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft color="#1A1C1E" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Locations</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.description}>
          Manage your favorite pickup and destination locations
        </Text>

        {/* Action: Add New Location */}
        <TouchableOpacity
          style={styles.addLocationCard}
          onPress={() => {
            navigation.navigate("RiderProfileContentsStack", {
              screen: "AddLocationScreen",
            });
          }}
        >
          <View style={styles.plusIconWrapper}>
            <Plus size={24} color="#3B82F6" />
          </View>
          <View style={styles.textContent}>
            <Text style={styles.addTitle}>Add New Location</Text>
            <Text style={styles.addSub}>Save a new pickup or destination</Text>
          </View>
        </TouchableOpacity>

        {/* --- FAVORITES SECTION --- */}
        <View style={styles.sectionHeader}>
          <Star size={16} color="#F59E0B" fill="#F59E0B" />
          <Text style={styles.sectionLabel}>FAVORITES</Text>
        </View>

        <LocationCard
          icon={<Home size={20} color="#3B82F6" />}
          bgColor="#EFF6FF"
          title="Home"
          address="2847 Maple Avenue,"
          lastUsed="Last used Feb 20, 2026"
          isFavorite
          onPress={() => {
            navigation.navigate("RiderProfileContentsStack", {
              screen: "LocationDetailsScreen",
            });
          }}
        />

        <LocationCard
          icon={<Building2 size={20} color="#10B981" />}
          bgColor="#ECFDF5"
          title="Springfield General"
          address="Springfield General"
          lastUsed="Last used Feb 22, 2026"
          isFavorite
          onPress={() => {
            navigation.navigate("RiderProfileContentsStack", {
              screen: "LocationDetailsScreen",
            });
          }}
        />

        <LocationCard
          icon={<MapPin size={20} color="#F59E0B" />}
          bgColor="#FFFBEB"
          title="Mom's House"
          address="456 Oak Street,"
          lastUsed="Last used Feb 12, 2026"
          isFavorite
          onPress={() => {
            navigation.navigate("RiderProfileContentsStack", {
              screen: "LocationDetailsScreen",
            });
          }}
        />

        {/* --- ALL LOCATIONS SECTION --- */}
        <Text style={[styles.sectionLabel, { marginLeft: 0, marginTop: 12 }]}>
          ALL LOCATIONS
        </Text>

        <LocationCard
          icon={<Building2 size={20} color="#8B5CF6" />}
          bgColor="#F5F3FF"
          title="Work Office"
          address="150 Tech Park Drive, Suite"
          lastUsed="Last used Feb 18, 2026"
          onPress={() => {
            navigation.navigate("RiderProfileContentsStack", {
              screen: "LocationDetailsScreen",
            });
          }}
        />

        <LocationCard
          icon={<Building2 size={20} color="#10B981" />}
          bgColor="#ECFDF5"
          title="City Medical Plaza"
          address="City Medical Plaza, 1234"
          lastUsed="Last used Feb 15, 2026"
          onPress={() => {
            navigation.navigate("RiderProfileContentsStack", {
              screen: "LocationDetailsScreen",
            });
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Sub-component for Location Items ---
const LocationCard = ({
  icon,
  bgColor,
  title,
  address,
  lastUsed,
  isFavorite,
  onPress,
}: any) => (
  <TouchableOpacity style={styles.locationCard} onPress={onPress}>
    <View style={[styles.iconWrapper, { backgroundColor: bgColor }]}>
      {icon}
    </View>
    <View style={styles.textContent}>
      <Text style={styles.locationTitle}>{title}</Text>
      <Text style={styles.locationAddress}>{address}</Text>
      <Text style={styles.lastUsedText}>{lastUsed}</Text>
    </View>
    {isFavorite && (
      <Star
        size={18}
        color="#F59E0B"
        fill="#F59E0B"
        style={{ marginRight: 12 }}
      />
    )}
    <ChevronRight size={18} color="#CBD5E1" />
  </TouchableOpacity>
);

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

  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  description: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 24,
    textAlign: "left",
  },

  addLocationCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    marginBottom: 24,
  },
  plusIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  textContent: { flex: 1, marginLeft: 16 },
  addTitle: { fontSize: 15, fontWeight: "800", color: "#3B82F6" },
  addSub: { fontSize: 12, color: "#64748B", marginTop: 4 },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "900",
    color: "#1E293B",
    letterSpacing: 0.5,
    marginLeft: 8,
  },

  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    marginBottom: 12,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  locationTitle: { fontSize: 15, fontWeight: "800", color: "#1E293B" },
  locationAddress: { fontSize: 13, color: "#64748B", marginTop: 4 },
  lastUsedText: { fontSize: 11, color: "#CBD5E1", marginTop: 4 },
});

export default SavedLocationsScreen;
