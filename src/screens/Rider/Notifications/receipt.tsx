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
  X,
  FileText,
  Calendar,
  Clock,
  MapPin,
  User,
  Car,
  CreditCard,
  Share2,
  Download,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ReceiptScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header with Close Button */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Receipt</Text>
          <Text style={styles.tripId}>Trip #000001</Text>
        </View>
        <TouchableOpacity style={styles.closeButton}>
          <X color="#64748B" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Payment Status Badge */}
        <View style={styles.badgeContainer}>
          <View style={styles.successBadge}>
            <Text style={styles.successBadgeText}>✓ PAYMENT COMPLETE</Text>
          </View>
        </View>

        {/* TRIP DETAILS Section */}
        <SectionHeader
          icon={<FileText size={16} color="#3B82F6" />}
          title="TRIP DETAILS"
        />

        <DetailRow
          icon={<Calendar size={18} color="#64748B" />}
          label="Date"
          value="Feb 20, 2026"
        />
        <DetailRow
          icon={<Clock size={18} color="#64748B" />}
          label="Time"
          value="2:30 PM"
        />

        {/* Pickup/Destination Timeline */}
        <View style={styles.timelineRow}>
          <View style={styles.timelineGraphic}>
            <View style={styles.dotBlue} />
            <View style={styles.line} />
            <View style={styles.dotBlue} />
          </View>
          <View style={styles.addressWrapper}>
            <View>
              <Text style={styles.addressLabel}>PICKUP</Text>
              <Text style={styles.addressText}>2847 Maple Avenue</Text>
            </View>
            <View style={[{ marginTop: 16 }]}>
              <Text style={styles.addressLabel}>DESTINATION</Text>
              <Text style={styles.addressText}>
                Springfield General Hospital
              </Text>
            </View>
          </View>
        </View>

        <DetailRow
          icon={<User size={18} color="#64748B" />}
          label="Driver"
          value="John Smith"
        />
        <DetailRow
          icon={<Car size={18} color="#64748B" />}
          label="Service Type"
          value="Standard Ride"
        />

        <View style={styles.sectionDivider} />

        {/* FARE BREAKDOWN Section */}
        <SectionHeader
          icon={<CreditCard size={16} color="#3B82F6" />}
          title="FARE BREAKDOWN"
        />

        <View style={styles.breakdownCard}>
          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Base Fare</Text>
            <Text style={styles.fareValue}>$38.25</Text>
          </View>
          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Service Fee</Text>
            <Text style={styles.fareValue}>$6.75</Text>
          </View>
          <View style={styles.totalDivider} />
          <View style={styles.fareRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>$45.00</Text>
          </View>
        </View>

        {/* Payment Method Card */}
        <View style={styles.paymentMethodCard}>
          <View style={styles.iconBox}>
            <CreditCard color="#3B82F6" size={20} />
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.paidWithLabel}>Paid with</Text>
            <Text style={styles.cardInfo}>Visa •••• 4242</Text>
          </View>
        </View>

        <Text style={styles.footerContact}>
          Questions about this receipt? Contact support@medigo.com
        </Text>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footerActions}>
        <TouchableOpacity style={styles.outlineButton}>
          <Share2 color="#64748B" size={20} />
          <Text style={styles.outlineButtonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filledButton}>
          <Download color="#FFF" size={20} />
          <Text style={styles.filledButtonText}>Download PDF</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Helpers
const SectionHeader = ({ icon, title }: any) => (
  <View style={styles.sectionHeader}>
    {icon}
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </View>
);

const DetailRow = ({ icon, label, value }: any) => (
  <View style={styles.detailRow}>
    <View>{icon}</View>
    <View style={{ marginLeft: 12 }}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 24,
    alignItems: "center",
  },
  headerTitle: { fontSize: 24, fontWeight: "800", color: "#1E293B" },
  tripId: { fontSize: 14, color: "#94A3B8", marginTop: 2 },
  closeButton: { padding: 8 },

  scrollContent: { paddingHorizontal: 24, paddingBottom: 120 },
  badgeContainer: { marginBottom: 32 },
  successBadge: {
    backgroundColor: "#DCFCE7",
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  successBadgeText: { color: "#10B981", fontSize: 12, fontWeight: "700" },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionHeaderText: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: "800",
    color: "#1E293B",
    letterSpacing: 0.5,
  },

  detailRow: { flexDirection: "row", alignItems: "center", marginBottom: 18 },
  rowLabel: { fontSize: 12, color: "#94A3B8" },
  rowValue: { fontSize: 15, fontWeight: "700", color: "#1E293B", marginTop: 2 },

  timelineRow: { flexDirection: "row", marginBottom: 20 },
  timelineGraphic: { width: 20, alignItems: "center", marginTop: 6 },
  dotBlue: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#3B82F6" },
  line: { width: 1, flex: 1, backgroundColor: "#E2E8F0", marginVertical: 4 },
  addressWrapper: { flex: 1, marginLeft: 12 },
  addressLabel: { fontSize: 10, color: "#94A3B8", letterSpacing: 1 },
  addressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
    marginTop: 2,
  },

  sectionDivider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 24 },

  breakdownCard: { backgroundColor: "#F8FAFC", borderRadius: 16, padding: 20 },
  fareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  fareLabel: { fontSize: 15, color: "#64748B" },
  fareValue: { fontSize: 15, fontWeight: "700", color: "#1E293B" },
  totalDivider: { height: 1, backgroundColor: "#E2E8F0", marginVertical: 12 },
  totalLabel: { fontSize: 18, fontWeight: "800", color: "#1E293B" },
  totalValue: { fontSize: 22, fontWeight: "800", color: "#3B82F6" },

  paymentMethodCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
  },
  iconBox: {
    width: 40,
    height: 40,
    backgroundColor: "#FFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  paidWithLabel: { fontSize: 12, color: "#3B82F6" },
  cardInfo: { fontSize: 15, fontWeight: "700", color: "#1E293B" },

  footerContact: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 24,
  },

  footerActions: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    gap: 12,
  },
  outlineButton: {
    flex: 1,
    flexDirection: "row",
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  outlineButtonText: { fontSize: 16, fontWeight: "700", color: "#1E293B" },
  filledButton: {
    flex: 1,
    flexDirection: "row",
    height: 56,
    borderRadius: 16,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  filledButtonText: { fontSize: 16, fontWeight: "700", color: "#FFF" },
});

export default ReceiptScreen;
