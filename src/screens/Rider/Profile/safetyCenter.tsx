import React from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  ChevronLeft,
  AlertTriangle,
  Phone,
  Share2,
  MapPin,
  Bell,
  FileText,
  ShieldCheck,
  ChevronRight,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SafetyCenterScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft color="#1E293B" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Safety Center</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Emergency Banner */}
        <View style={styles.emergencyBanner}>
          <View style={styles.emergencyIconContainer}>
            <AlertTriangle color="#EF4444" size={20} />
          </View>
          <View style={styles.emergencyTextContainer}>
            <Text style={styles.emergencyTitle}>Emergency? Call 911</Text>
            <Text style={styles.emergencySubtext}>
              Medigo is not an emergency service. For life-threatening
              situations, call 911 immediately.
            </Text>
          </View>
        </View>

        {/* Section: During Your Ride */}
        <Text style={styles.sectionLabel}>During Your Ride</Text>
        <View style={styles.card}>
          <SafetyItem
            icon={<Phone size={20} color="#EF4444" />}
            iconBg="#FEF2F2"
            title="Emergency Assistance"
            subtitle="24/7 support line"
          />
          <SafetyItem
            icon={<Share2 size={20} color="#3B82F6" />}
            iconBg="#EFF6FF"
            title="Share Trip Details"
            subtitle="Share live location with trusted contacts"
          />
          <SafetyItem
            icon={<MapPin size={20} color="#3B82F6" />}
            iconBg="#EFF6FF"
            title="Ride Check"
            subtitle="Real-time ride monitoring"
          />
          <SafetyItem
            icon={<Bell size={20} color="#3B82F6" />}
            iconBg="#EFF6FF"
            title="Safety Alerts"
            subtitle="Get notified of safety updates"
            isLast
          />
        </View>

        {/* Section: Resources */}
        <Text style={[styles.sectionLabel, { marginTop: 24 }]}>Resources</Text>
        <View style={styles.card}>
          <SafetyItem
            icon={<FileText size={20} color="#3B82F6" />}
            iconBg="#EFF6FF"
            title="Safety Guidelines"
            subtitle="Best practices for safe rides"
          />
          <SafetyItem
            icon={<ShieldCheck size={20} color="#3B82F6" />}
            iconBg="#EFF6FF"
            title="Safety Policy"
            subtitle="Our commitment to your safety"
            isLast
          />
        </View>

        {/* Support Footer Card */}
        <View style={styles.supportCard}>
          <Text style={styles.supportTitle}>Need Help?</Text>
          <Text style={styles.supportSubtext}>
            Our safety team is available 24/7 to assist you.
          </Text>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.buttonText}>Contact Safety Team</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Sub-component for individual list items
const SafetyItem = ({ icon, iconBg, title, subtitle, isLast }) => (
  <TouchableOpacity style={[styles.itemRow, !isLast && styles.itemBorder]}>
    <View style={[styles.iconBox, { backgroundColor: iconBg }]}>{icon}</View>
    <View style={styles.itemTextContainer}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemSubtitle}>{subtitle}</Text>
    </View>
    <ChevronRight size={18} color="#94A3B8" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F8FAFC",
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
    color: "#1E293B",
    marginRight: 44,
  },

  scrollContent: { padding: 20 },

  emergencyBanner: {
    backgroundColor: "#FFF1F2",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#FECACA",
    marginBottom: 24,
  },
  emergencyIconContainer: { marginRight: 12, marginTop: 2 },
  emergencyTextContainer: { flex: 1 },
  emergencyTitle: { fontSize: 15, fontWeight: "800", color: "#B91C1C" },
  emergencySubtext: {
    fontSize: 12,
    color: "#B91C1C",
    marginTop: 4,
    lineHeight: 18,
  },

  sectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#64748B",
    marginBottom: 12,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    backgroundColor: "#FFF",
    overflow: "hidden",
  },

  itemRow: { flexDirection: "row", alignItems: "center", padding: 16 },
  itemBorder: { borderBottomWidth: 1, borderBottomColor: "#F8FAFC" },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  itemTextContainer: { flex: 1, marginLeft: 16 },
  itemTitle: { fontSize: 15, fontWeight: "700", color: "#1E293B" },
  itemSubtitle: { fontSize: 12, color: "#94A3B8", marginTop: 2 },

  supportCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 20,
    padding: 20,
    marginTop: 32,
    marginBottom: 20,
  },
  supportTitle: { fontSize: 16, fontWeight: "800", color: "#1E40AF" },
  supportSubtext: {
    fontSize: 13,
    color: "#3B82F6",
    marginTop: 4,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: "#3B82F6",
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#FFF", fontSize: 15, fontWeight: "700" },
});

export default SafetyCenterScreen;
