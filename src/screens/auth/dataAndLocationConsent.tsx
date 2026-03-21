import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  ChevronLeft,
  MapPin,
  Bell,
  Camera,
  Phone,
  Info,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LocationConsentScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.navHeader}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft color="#0F172A" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Data & Location Consent</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mainTitle}>Data & Location Consent</Text>
        <Text style={styles.effectiveDate}>
          Effective Date: February 24, 2026
        </Text>

        {/* Introduction */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Your Consent</Text>
          <Text style={styles.bodyText}>
            By creating this account, you authorize MediGo to collect, process,
            and use your location data and other personal information as
            described below to provide safe and efficient transportation
            services.
          </Text>
        </View>

        {/* 1. Location Data Collection */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>1. Location Data Collection</Text>
          <Text style={styles.subHeader}>What We Collect:</Text>
          {[
            {
              t: "Precise (GPS) Location",
              d: "Real-time track for booking & active rides.",
            },
            {
              t: "Approximate Location",
              d: "General area for pricing & availability checks.",
            },
            {
              t: "Pickup & Drop-off Addresses",
              d: "Stored details from user input.",
            },
            {
              t: "Route Data",
              d: "Path taken during rides for routing and safety analytics.",
            },
          ].map((item, i) => (
            <View key={i} style={styles.bulletRow}>
              <View style={styles.blueSquare} />
              <Text style={styles.bulletText}>
                <Text style={styles.boldText}>{item.t}:</Text> {item.d}
              </Text>
            </View>
          ))}

          {/* Blue Highlighted Box */}
          <View style={styles.blueInfoBox}>
            {[
              "While App is Open: Essential for finding and matching with drivers.",
              "During Active Rides: Continuous tracking for safety and navigation.",
              "In Background (with permission): Limited tracking for scheduled ride reminders.",
            ].map((text, i) => (
              <View key={i} style={styles.bulletRow}>
                <View style={styles.whiteSquare} />
                <Text style={styles.blueBoxText}>{text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 2. Health & Mobility Data */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>2. Health & Mobility Data</Text>
          <Text style={styles.bodyText}>
            We collect limited health data to optimize your trip:
          </Text>
          {[
            "Mobility assistance requirements (Wheelchair, walker, none).",
            "Specific equipment needs (Oxygen, medical monitor).",
            "Emergency contact information.",
            "Reason for transport (Non-emergency medical needs).",
          ].map((text, i) => (
            <View key={i} style={styles.bulletRow}>
              <View style={styles.blueSquare} />
              <Text style={styles.bulletText}>{text}</Text>
            </View>
          ))}

          {/* Green Privacy Box */}
          <View style={styles.greenInfoBox}>
            <Text style={styles.greenBoxText}>
              <Text style={{ fontWeight: "800" }}>Privacy Protection:</Text> We
              do not collect detailed medical history, treatment plans, or
              sensitive medical records.
            </Text>
          </View>
        </View>

        {/* 4. Device Permissions */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>4. Device Permissions</Text>
          {[
            {
              icon: <MapPin size={18} color="#EF4444" />,
              title: "Location Services",
              desc: "Required for ride matching and navigation.",
            },
            {
              icon: <Bell size={18} color="#F59E0B" />,
              title: "Notifications",
              desc: "Alerts for driver arrivals, safety, and receipts.",
            },
            {
              icon: <Camera size={18} color="#64748B" />,
              title: "Camera (Optional)",
              desc: "For profile photo upload.",
            },
            {
              icon: <Phone size={18} color="#10B981" />,
              title: "Phone Calls",
              desc: "Connects drivers to riders anonymously.",
            },
          ].map((item, i) => (
            <View key={i} style={styles.permCard}>
              <View style={styles.permIconContainer}>{item.icon}</View>
              <View style={{ flex: 1 }}>
                <Text style={styles.permTitle}>{item.title}</Text>
                <Text style={styles.permDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Important Warning Box */}
        <View style={styles.yellowInfoBox}>
          <Info size={18} color="#92400E" />
          <Text style={styles.yellowBoxText}>
            <Text style={{ fontWeight: "800" }}>Important:</Text> Withdrawing
            location consent will prevent you from booking/tracking rides, as
            this is an essential part of the MediGo service.
          </Text>
        </View>

        {/* Contact Support Section */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Questions about this consent?</Text>
          <Text style={styles.contactDetail}>Email: privacy@medigo.com</Text>
          <Text style={styles.contactDetail}>
            Phone: 1-800-MEDIGO (1-800-633-446)
          </Text>
        </View>
      </ScrollView>

      {/* Footer Close Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.closeBtn}>
          <Text style={styles.closeBtnText}>Close</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  navHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F8FAFC",
  },
  backButton: { width: 40, height: 40, justifyContent: "center" },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
    flex: 0.8,
  },
  scrollContent: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 120 },
  mainTitle: { fontSize: 22, fontWeight: "800", color: "#0F172A" },
  effectiveDate: { fontSize: 12, color: "#94A3B8", marginTop: 8 },

  // Section Layout
  section: { marginTop: 32 },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 12,
  },
  subHeader: {
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 12,
  },
  bodyText: { fontSize: 14, color: "#475569", lineHeight: 22, marginBottom: 8 },
  boldText: { fontWeight: "700", color: "#334155" },

  // Bullets
  bulletRow: { flexDirection: "row", marginTop: 10, paddingRight: 16 },
  blueSquare: {
    width: 6,
    height: 6,
    backgroundColor: "#3B82F6",
    marginTop: 7,
    marginRight: 12,
    borderRadius: 1,
  },
  whiteSquare: {
    width: 6,
    height: 6,
    backgroundColor: "#FFF",
    marginTop: 7,
    marginRight: 12,
    borderRadius: 1,
  },
  bulletText: { fontSize: 13, color: "#475569", lineHeight: 20, flex: 1 },

  // Colored Boxes
  blueInfoBox: {
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  blueBoxText: { fontSize: 13, color: "#1E40AF", lineHeight: 20, flex: 1 },
  greenInfoBox: {
    backgroundColor: "#F0FDF4",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#22C55E",
  },
  greenBoxText: { fontSize: 13, color: "#166534", lineHeight: 20 },
  yellowInfoBox: {
    backgroundColor: "#FFFBEB",
    borderRadius: 12,
    padding: 16,
    marginTop: 32,
    flexDirection: "row",
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
  },
  yellowBoxText: { fontSize: 13, color: "#92400E", lineHeight: 20, flex: 1 },

  // Permission Cards
  permCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    marginBottom: 12,
  },
  permIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  permTitle: { fontSize: 14, fontWeight: "700", color: "#1E293B" },
  permDesc: { fontSize: 12, color: "#64748B", marginTop: 2 },

  // Footer & Contact
  contactSection: {
    marginTop: 40,
    padding: 20,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 8,
  },
  contactDetail: { fontSize: 13, color: "#64748B", marginTop: 4 },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 24,
    backgroundColor: "#FFF",
  },
  closeBtn: {
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtnText: { color: "#FFF", fontSize: 16, fontWeight: "700" },
});

export default LocationConsentScreen;
