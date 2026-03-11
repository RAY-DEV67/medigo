import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  Switch,
} from "react-native";
import {
  ChevronLeft,
  ChevronRight,
  User,
  MapPin,
  CreditCard,
  Heart,
  Shield,
  Bell,
  HelpCircle,
  Sun,
  LogOut,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const ProfileScreen = () => {
  const [isLightMode, setIsLightMode] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft color="#1A1C1E" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* User Profile Info */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?u=sarah" }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Sarah Johnson</Text>
          <Text style={styles.userEmail}>sarah.johnson@email.com</Text>
        </View>

        {/* --- ACCOUNT SECTION --- */}
        <Text style={styles.categoryLabel}>ACCOUNT</Text>
        <View style={styles.settingsGroup}>
          <MenuOption
            icon={<User size={20} color="#64748B" />}
            label="Personal Information"
            onPress={() => {
              navigation.navigate("RiderProfileContentsStack", {
                screen: "PersonalInformationScreen",
              });
            }}
          />
          <View style={styles.divider} />
          <MenuOption
            icon={<MapPin size={20} color="#64748B" />}
            label="Saved Locations"
            onPress={() => {
              navigation.navigate("RiderProfileContentsStack", {
                screen: "SavedLocationsScreen",
              });
            }}
          />
          <View style={styles.divider} />
          <MenuOption
            icon={<CreditCard size={20} color="#64748B" />}
            label="Payment Methods"
            onPress={() => {
              navigation.navigate("RiderProfileContentsStack", {
                screen: "PaymentMethodsScreen",
              });
            }}
          />
        </View>

        {/* --- SAFETY SECTION --- */}
        <Text style={styles.categoryLabel}>SAFETY</Text>
        <View style={styles.settingsGroup}>
          <MenuOption
            icon={<Heart size={20} color="#64748B" />}
            label="Emergency Contacts"
            onPress={() => {
              navigation.navigate("RiderProfileContentsStack", {
                screen: "EmergencyContactsScreen",
              });
            }}
          />
          <View style={styles.divider} />
          <MenuOption
            icon={<Shield size={20} color="#64748B" />}
            label="Safety Center"
          />
        </View>

        {/* --- PREFERENCES SECTION --- */}
        <Text style={styles.categoryLabel}>PREFERENCES</Text>
        <View style={styles.settingsGroup}>
          <MenuOption
            icon={<Bell size={20} color="#64748B" />}
            label="Notifications"
            onPress={() => {
              navigation.navigate("RiderProfileContentsStack", {
                screen: "NotificationSettingsScreen",
              });
            }}
          />
        </View>

        {/* --- SUPPORT SECTION --- */}
        <Text style={styles.categoryLabel}>SUPPORT</Text>
        <View style={styles.settingsGroup}>
          <MenuOption
            icon={<HelpCircle size={20} color="#64748B" />}
            label="Help Center"
          />
        </View>

        {/* --- APP PREFERENCES SECTION --- */}
        <Text style={styles.categoryLabel}>APP PREFERENCES</Text>
        <View style={styles.settingsGroup}>
          <View style={styles.toggleRow}>
            <View style={styles.iconCircleYellow}>
              <Sun size={20} color="#F59E0B" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.optionLabel}>Light Mode</Text>
              <Text style={styles.optionSub}>Currently using light theme</Text>
            </View>
            <Switch
              value={isLightMode}
              onValueChange={setIsLightMode}
              trackColor={{ false: "#E2E8F0", true: "#3B82F6" }}
            />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn}>
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>MediGo v1.0.0</Text>
        <Text style={styles.copyrightText}>
          © 2026 MediGo. All rights reserved.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Helpers ---
const MenuOption = ({ icon, label, onPress }: any) => (
  <TouchableOpacity style={styles.optionRow} onPress={onPress}>
    <View style={styles.iconWrapper}>{icon}</View>
    <Text style={styles.optionLabel}>{label}</Text>
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

  scrollContent: { paddingHorizontal: 20, paddingBottom: 150 },
  profileSection: { alignItems: "center", marginVertical: 24 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 16 },
  userName: { fontSize: 22, fontWeight: "800", color: "#1E293B" },
  userEmail: { fontSize: 14, color: "#64748B", marginTop: 4 },

  categoryLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#94A3B8",
    letterSpacing: 1,
    marginTop: 24,
    marginBottom: 12,
  },
  settingsGroup: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    overflow: "hidden",
  },
  optionRow: { flexDirection: "row", alignItems: "center", padding: 16 },
  iconWrapper: { width: 24, alignItems: "center" },
  optionLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
    marginLeft: 12,
  },
  divider: { height: 1, backgroundColor: "#F1F5F9", marginHorizontal: 16 },

  toggleRow: { flexDirection: "row", alignItems: "center", padding: 16 },
  iconCircleYellow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FEF3C7",
    justifyContent: "center",
    alignItems: "center",
  },
  optionSub: { fontSize: 12, color: "#64748B", marginTop: 2 },

  logoutBtn: {
    flexDirection: "row",
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    gap: 10,
  },
  logoutText: { color: "#EF4444", fontSize: 16, fontWeight: "800" },

  versionText: {
    textAlign: "center",
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 24,
  },
  copyrightText: {
    textAlign: "center",
    fontSize: 11,
    color: "#CBD5E1",
    marginTop: 4,
  },
});

export default ProfileScreen;
