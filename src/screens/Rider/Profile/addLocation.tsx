import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Switch,
} from "react-native";
import {
  X,
  Search,
  Home,
  Building2,
  Briefcase,
  MapPin,
  Star,
  Zap,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddLocationScreen = () => {
  const [locationType, setLocationType] = useState("Work");
  const [isFavorite, setIsFavorite] = useState(true);
  const [isDefault, setIsDefault] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton}>
          <X color="#1A1C1E" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Location</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.subtext}>Save a place for faster booking</Text>

        {/* Input: Location Name */}
        <Text style={styles.inputLabel}>
          Location Name <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Mom's house"
          placeholderTextColor="#1E293B"
        />

        {/* Input: Address with Search Icon */}
        <Text style={styles.inputLabel}>
          Address <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.searchContainer}>
          <Search size={20} color="#94A3B8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="2847 Maple Avenue"
            placeholderTextColor="#1E293B"
          />
        </View>

        {/* Location Type Selection Grid */}
        <Text style={styles.inputLabel}>Location Type</Text>
        <View style={styles.typeGrid}>
          <TypeTile
            icon={
              <Home
                size={20}
                color={locationType === "Home" ? "#3B82F6" : "#94A3B8"}
              />
            }
            label="Home"
            selected={locationType === "Home"}
            onPress={() => setLocationType("Home")}
          />
          <TypeTile
            icon={
              <Building2
                size={20}
                color={locationType === "Hospital" ? "#3B82F6" : "#94A3B8"}
              />
            }
            label="Hospital"
            selected={locationType === "Hospital"}
            onPress={() => setLocationType("Hospital")}
          />
          <TypeTile
            icon={
              <Briefcase
                size={20}
                color={locationType === "Work" ? "#3B82F6" : "#94A3B8"}
              />
            }
            label="Work"
            selected={locationType === "Work"}
            onPress={() => setLocationType("Work")}
          />
          <TypeTile
            icon={
              <MapPin
                size={20}
                color={locationType === "Custom" ? "#3B82F6" : "#94A3B8"}
              />
            }
            label="Custom"
            selected={locationType === "Custom"}
            onPress={() => setLocationType("Custom")}
          />
        </View>

        {/* Preference Toggles */}
        <View style={styles.toggleGroup}>
          <PreferenceToggle
            icon={<Star size={18} color="#94A3B8" />}
            title="Favorite"
            sub="Quick access from dashboard"
            value={isFavorite}
            onToggle={setIsFavorite}
          />
          <PreferenceToggle
            icon={<MapPin size={18} color="#94A3B8" />}
            title="Set as Default Pickup"
            sub="Auto-fill for new rides"
            value={isDefault}
            onToggle={setIsDefault}
          />
        </View>

        {/* Informational Banner */}
        <View style={styles.infoBanner}>
          <View style={styles.infoIconCircle}>
            <MapPin size={16} color="#3B82F6" />
          </View>
          <View style={styles.bannerTextContent}>
            <Text style={styles.bannerTitle}>Quick Access</Text>
            <Text style={styles.bannerSub}>
              Saved locations appear on your dashboard for quick booking.
            </Text>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Sub-components ---

const TypeTile = ({ icon, label, selected, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.tile, selected && styles.tileSelected]}
  >
    {icon}
    <Text style={[styles.tileLabel, selected && styles.tileLabelSelected]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const PreferenceToggle = ({ icon, title, sub, value, onToggle }: any) => (
  <View style={styles.toggleRow}>
    <View style={styles.toggleIconWrapper}>{icon}</View>
    <View style={styles.toggleTextWrapper}>
      <Text style={styles.toggleTitle}>{title}</Text>
      <Text style={styles.toggleSub}>{sub}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onToggle}
      trackColor={{ false: "#E2E8F0", true: "#3B82F6" }}
      thumbColor="#FFFFFF"
    />
  </View>
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
  headerTitle: { fontSize: 18, fontWeight: "800", color: "#1E293B" },
  closeButton: { padding: 4 },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  subtext: { fontSize: 14, color: "#64748B", marginBottom: 24 },

  inputLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 12,
    marginTop: 16,
  },
  required: { color: "#EF4444" },
  input: {
    height: 56,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#1E293B",
  },

  searchContainer: {
    height: 56,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15, color: "#1E293B" },

  typeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 4 },
  tile: {
    width: "48%",
    height: 80,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  tileSelected: { borderColor: "#3B82F6", backgroundColor: "#EFF6FF" },
  tileLabel: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 8,
    fontWeight: "600",
  },
  tileLabelSelected: { color: "#3B82F6" },

  toggleGroup: { marginTop: 24, gap: 12 },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
  },
  toggleIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleTextWrapper: { flex: 1, marginLeft: 12 },
  toggleTitle: { fontSize: 14, fontWeight: "700", color: "#1E293B" },
  toggleSub: { fontSize: 11, color: "#94A3B8", marginTop: 2 },

  infoBanner: {
    flexDirection: "row",
    backgroundColor: "#EFF6FF",
    padding: 16,
    borderRadius: 16,
    marginTop: 24,
  },
  infoIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  bannerTextContent: { flex: 1, marginLeft: 12 },
  bannerTitle: { fontSize: 14, fontWeight: "800", color: "#1E3A8A" },
  bannerSub: { fontSize: 12, color: "#3B82F6", marginTop: 4, lineHeight: 18 },

  saveButton: {
    height: 60,
    backgroundColor: "#5D8DF5",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  saveButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
});

export default AddLocationScreen;
