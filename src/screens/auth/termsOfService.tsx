import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TermsOfServiceScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.navHeader}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft color="#0F172A" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms of Service</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mainTitle}>Terms of Service</Text>
        <Text style={styles.effectiveDate}>
          Effective Date: February 24, 2026
        </Text>
        <Text style={styles.lastUpdated}>Last Updated: February 24, 2026</Text>

        {/* 1. Acceptance */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>1. Acceptance of Terms</Text>
          <Text style={styles.bodyText}>
            By creating an account and using MediGo services (the "Platform",
            "Service", "App"), you agree to be bound by these Terms of Service
            and our Privacy Policy. If you do not agree, please do not use our
            services.
          </Text>
        </View>

        {/* 2. Service Description */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>2. Service Description</Text>
          <Text style={styles.bodyText}>
            MediGo is a technology platform that connects riders with
            independent transportation providers for non-emergency medical
            transportation. MediGo does not provide transportation services
            directly; we facilitate connections between riders and drivers.
          </Text>

          {/* Specific Warning Box from Design */}
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              <Text style={{ fontWeight: "800" }}>Non-Emergency Only:</Text>{" "}
              MediGo is not an ambulance service and should never be used for
              medical emergencies. Call 911 immediately in emergency situations.
            </Text>
          </View>
        </View>

        {/* 3. Eligibility */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>3. Eligibility</Text>
          {[
            "You must be at least 18 years old to create an account.",
            "You must provide accurate and complete information.",
            "You are responsible for maintaining account confidentiality.",
            "One person may not create multiple accounts.",
          ].map((item, index) => (
            <View key={index} style={styles.bulletRow}>
              <Text style={styles.bullet}>◆</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* 4. Booking and Cancellation */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>4. Booking and Cancellation</Text>
          <Text style={styles.subSectionHeader}>4.1 Ride Requests</Text>
          <Text style={styles.bodyText}>
            You may request immediate or scheduled rides through the app. Ride
            acceptance is subject to driver availability.
          </Text>

          <Text style={styles.subSectionHeader}>4.2 Cancellation Policy</Text>
          {[
            "Free cancellation up to 2 hours before scheduled pickup.",
            "Cancellations within 2 hours may incur a $15 cancellation fee.",
            "No-shows will be charged the full estimated fare.",
          ].map((item, index) => (
            <View key={index} style={styles.bulletRow}>
              <Text style={styles.bullet}>◆</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* 12. Contact Support Card */}
        <View style={styles.contactCard}>
          <Text style={styles.contactHeader}>MediGo Customer Support</Text>
          <Text style={styles.contactDetail}>
            Email: <Text style={styles.linkText}>support@medigo.com</Text>
          </Text>
          <Text style={styles.contactDetail}>
            Phone: 1-800-MEDIGO (1-800-633-446)
          </Text>
          <Text style={styles.contactDetail}>
            Hours: 24/7 Support Available
          </Text>
        </View>

        <Text style={styles.footerNote}>
          By clicking "Close", you acknowledge that you have read, understood
          and agree to the Terms of Service.
        </Text>
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
  scrollContent: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 140 },
  mainTitle: { fontSize: 22, fontWeight: "800", color: "#0F172A" },
  effectiveDate: { fontSize: 12, color: "#94A3B8", marginTop: 8 },
  lastUpdated: { fontSize: 12, color: "#94A3B8", marginTop: 2 },

  // Section Typography
  section: { marginTop: 28 },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 12,
  },
  subSectionHeader: {
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
    marginTop: 14,
    marginBottom: 6,
  },
  bodyText: { fontSize: 14, color: "#475569", lineHeight: 22 },

  // Red Warning Box
  warningBox: {
    backgroundColor: "#FFF1F2",
    borderLeftWidth: 4,
    borderLeftColor: "#F43F5E",
    padding: 16,
    marginTop: 16,
    borderRadius: 4,
  },
  warningText: { fontSize: 13, color: "#9F1239", lineHeight: 20 },

  // Bullets (matches design diamonds)
  bulletRow: { flexDirection: "row", marginTop: 10, paddingRight: 12 },
  bullet: { color: "#3B82F6", marginRight: 10, fontSize: 10, marginTop: 4 },
  bulletText: { fontSize: 13, color: "#475569", lineHeight: 20, flex: 1 },

  // Contact Info Card
  contactCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 20,
    marginTop: 40,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  contactHeader: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 8,
  },
  contactDetail: { fontSize: 13, color: "#64748B", marginBottom: 4 },
  linkText: { color: "#2563EB", fontWeight: "600" },
  footerNote: {
    fontSize: 11,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 24,
    lineHeight: 16,
  },

  // Footer Button
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

export default TermsOfServiceScreen;
