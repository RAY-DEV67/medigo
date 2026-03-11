import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Switch,
} from "react-native";
import {
  ChevronLeft,
  Bell,
  MessageSquare,
  DollarSign,
  Shield,
  Star,
  TrendingUp,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NotificationSettingsScreen = () => {
  // State management for all toggles
  const [settings, setSettings] = useState({
    rideUpdates: true,
    messages: true,
    payments: true,
    safety: false,
    promotions: false,
    news: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft color="#1A1C1E" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ESSENTIAL SECTION */}
        <Text style={styles.categoryLabel}>ESSENTIAL</Text>

        <NotificationToggle
          icon={<Bell size={20} color="#3B82F6" />}
          bgColor="#EFF6FF"
          title="Ride Updates"
          sub="Driver assignment, arrival, and trip updates"
          value={settings.rideUpdates}
          onToggle={() => toggleSetting("rideUpdates")}
        />

        <NotificationToggle
          icon={<MessageSquare size={20} color="#3B82F6" />}
          bgColor="#EFF6FF"
          title="Messages"
          sub="Messages from drivers and support"
          value={settings.messages}
          onToggle={() => toggleSetting("messages")}
        />

        <NotificationToggle
          icon={<DollarSign size={20} color="#3B82F6" />}
          bgColor="#EFF6FF"
          title="Payment Notifications"
          sub="Receipts, payment confirmations, and refunds"
          value={settings.payments}
          onToggle={() => toggleSetting("payments")}
        />

        <NotificationToggle
          icon={<Shield size={20} color="#3B82F6" />}
          bgColor="#EFF6FF"
          title="Safety Alerts"
          sub="Important safety updates and reminders"
          value={settings.safety}
          onToggle={() => toggleSetting("safety")}
        />

        {/* MARKETING SECTION */}
        <Text style={[styles.categoryLabel, { marginTop: 32 }]}>MARKETING</Text>

        <NotificationToggle
          icon={<Star size={20} color="#64748B" />}
          bgColor="#F1F5F9"
          title="Promotions & Offers"
          sub="Special deals, discounts, and rewards"
          value={settings.promotions}
          onToggle={() => toggleSetting("promotions")}
        />

        <NotificationToggle
          icon={<TrendingUp size={20} color="#64748B" />}
          bgColor="#F1F5F9"
          title="News & Updates"
          sub="MediGo product updates and features"
          value={settings.news}
          onToggle={() => toggleSetting("news")}
        />

        {/* Footer Banner */}
        <View style={styles.footerBanner}>
          <Text style={styles.bannerTitle}>Stay Informed</Text>
          <Text style={styles.bannerSub}>
            We recommend keeping essential notifications enabled to ensure the
            best experience during your rides.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Sub-component for Toggle Rows ---
const NotificationToggle = ({
  icon,
  bgColor,
  title,
  sub,
  value,
  onToggle,
}: any) => (
  <View style={styles.toggleRow}>
    <View style={[styles.iconCircle, { backgroundColor: bgColor }]}>
      {icon}
    </View>
    <View style={styles.textContent}>
      <Text style={styles.optionTitle}>{title}</Text>
      <Text style={styles.optionSub}>{sub}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onToggle}
      trackColor={{ false: "#E2E8F0", true: "#3B82F6" }}
      thumbColor="#FFFFFF"
      ios_backgroundColor="#E2E8F0"
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

  categoryLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#94A3B8",
    letterSpacing: 1,
    marginTop: 20,
    marginBottom: 16,
  },

  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  textContent: { flex: 1, marginLeft: 16, marginRight: 8 },
  optionTitle: { fontSize: 15, fontWeight: "700", color: "#1E293B" },
  optionSub: { fontSize: 12, color: "#64748B", marginTop: 4, lineHeight: 18 },

  footerBanner: {
    backgroundColor: "#EFF6FF",
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
  },
  bannerTitle: { fontSize: 14, fontWeight: "800", color: "#1E3A8A" },
  bannerSub: { fontSize: 12, color: "#3B82F6", marginTop: 6, lineHeight: 18 },
});

export default NotificationSettingsScreen;
