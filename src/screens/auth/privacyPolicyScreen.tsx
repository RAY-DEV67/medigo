import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { ChevronLeft, Info } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PrivacyPolicyScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.navHeader}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft color="#0F172A" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mainTitle}>Privacy Policy</Text>
        <Text style={styles.effectiveDate}>
          Effective Date: January 01, 2026
        </Text>
        <Text style={styles.lastUpdated}>Last Updated: March 15, 2026</Text>

        {/* Highlighted Alert Box */}
        <View style={styles.alertBox}>
          <View style={styles.alertHeader}>
            <Info size={18} color="#EF4444" />
            <Text style={styles.alertTitle}>Key Points & Updates</Text>
          </View>
          <Text style={styles.alertText}>
            We’ve updated our Privacy Policy to better explain how we handle
            your medical and location data. Please review the summary of changes
            below to understand your rights.
          </Text>
        </View>

        {/* 1. Introduction */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>1. Introduction</Text>
          <Text style={styles.bodyText}>
            Welcome to MediGo ("we", "our", or "us"). We are committed to
            protecting your personal information and your right to privacy. This
            Privacy Policy outlines how we collect, use, disclose, and safeguard
            your information when you use our mobile application and related
            services.
          </Text>
          <Text style={styles.bodyText}>
            By using MediGo, you consent to the collection and use of
            information in accordance with this policy.
          </Text>
        </View>

        {/* 2. Information We Collect */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>2. Information We Collect</Text>

          <Text style={styles.subSectionHeader}>
            2.1 Personal Identification Information
          </Text>
          <View style={styles.bulletRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              Full name, date of birth, gender.
            </Text>
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              Email address and phone number.
            </Text>
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Profile picture (optional).</Text>
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              Government-issued ID (for verification of drivers).
            </Text>
          </View>

          <Text style={styles.subSectionHeader}>
            2.2 Health-Related Information (For Passenger Version Only)
          </Text>
          <View style={styles.bulletRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              Reason for transport (e.g., dialysis, checkup).
            </Text>
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              Mobility aids needed (e.g., wheelchair, stretcher).
            </Text>
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Emergency contact details.</Text>
          </View>
        </View>

        {/* Contact Support Section */}
        <View style={styles.supportCard}>
          <Text style={styles.supportTitle}>Questions regarding Privacy?</Text>
          <Text style={styles.supportEmail}>Email: support@medigo.com</Text>
          <Text style={styles.supportText}>
            Our privacy team is dedicated to protecting your data and your
            rights.
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
    borderBottomColor: "#F1F5F9",
  },
  backButton: { width: 40, height: 40, justifyContent: "center" },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginLeft: 8,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    paddingBottom: 120,
  },
  mainTitle: { fontSize: 24, fontWeight: "800", color: "#0F172A" },
  effectiveDate: { fontSize: 13, color: "#64748B", marginTop: 8 },
  lastUpdated: { fontSize: 13, color: "#64748B", marginTop: 4 },

  // Alert Box
  alertBox: {
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  alertHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  alertTitle: { fontSize: 14, fontWeight: "700", color: "#EF4444" },
  alertText: { fontSize: 13, color: "#991B1B", lineHeight: 20 },

  // Sections
  section: { marginTop: 32 },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 12,
  },
  subSectionHeader: {
    fontSize: 15,
    fontWeight: "700",
    color: "#334155",
    marginTop: 16,
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 22,
    marginBottom: 12,
  },

  // Bullets
  bulletRow: { flexDirection: "row", marginBottom: 6, paddingRight: 12 },
  bullet: { fontSize: 14, color: "#3B82F6", marginRight: 8, fontWeight: "800" },
  bulletText: { fontSize: 14, color: "#475569", lineHeight: 22, flex: 1 },

  // Support Card
  supportCard: {
    backgroundColor: "#F8FAFC",
    padding: 20,
    borderRadius: 16,
    marginTop: 40,
  },
  supportTitle: { fontSize: 14, fontWeight: "700", color: "#1E293B" },
  supportEmail: {
    fontSize: 14,
    color: "#2563EB",
    fontWeight: "600",
    marginTop: 4,
  },
  supportText: { fontSize: 12, color: "#64748B", marginTop: 8 },

  // Footer
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

export default PrivacyPolicyScreen;
