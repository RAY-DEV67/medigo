import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  X,
  FileText,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  CreditCard,
  Share2,
  Download,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ReceiptScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Modal Backdrop Effect */}
      <View style={styles.modalContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.receiptTitle}>Receipt</Text>
            <Text style={styles.tripId}>Trip #000001</Text>
          </View>
          <TouchableOpacity style={styles.closeBtn}>
            <X color="#64748B" size={24} />
          </TouchableOpacity>
        </View>

        {/* Status Badge */}
        <View style={styles.statusBadge}>
          <ShieldCheck size={16} color="#10B981" />
          <Text style={styles.statusText}>PAYMENT COMPLETE</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollArea}
        >
          {/* Section: Trip Details */}
          <View style={styles.sectionHeader}>
            <FileText size={18} color="#3B82F6" />
            <Text style={styles.sectionTitle}>TRIP DETAILS</Text>
          </View>

          <View style={styles.detailRow}>
            <Calendar size={18} color="#94A3B8" />
            <View style={styles.detailText}>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.value}>Feb 20, 2026</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Clock size={18} color="#94A3B8" />
            <View style={styles.detailText}>
              <Text style={styles.label}>Time</Text>
              <Text style={styles.value}>2:30 PM</Text>
            </View>
          </View>

          {/* Route Visualizer */}
          <View style={styles.routeContainer}>
            <View style={styles.routeIcons}>
              <View style={styles.blueDot} />
              <View style={styles.verticalLine} />
              <View style={styles.blueDot} />
            </View>
            <View style={styles.routeDetails}>
              <Text style={styles.label}>PICKUP</Text>
              <Text style={styles.routeAddress}>2847 Maple Avenue</Text>
              <View style={{ height: 20 }} />
              <Text style={styles.label}>DESTINATION</Text>
              <Text style={styles.routeAddress}>
                Springfield General Hospital
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <User size={18} color="#94A3B8" />
            <View style={styles.detailText}>
              <Text style={styles.label}>Driver</Text>
              <Text style={styles.value}>John Smith</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <ShieldCheck size={18} color="#94A3B8" />
            <View style={styles.detailText}>
              <Text style={styles.label}>Service Type</Text>
              <Text style={styles.value}>Standard Ride</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Section: Fare Breakdown */}
          <View style={styles.sectionHeader}>
            <CreditCard size={18} color="#3B82F6" />
            <Text style={styles.sectionTitle}>FARE BREAKDOWN</Text>
          </View>

          <View style={styles.fareCard}>
            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>Base Fare</Text>
              <Text style={styles.fareValue}>$38.25</Text>
            </View>
            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>Service Fee</Text>
              <Text style={styles.fareValue}>$6.75</Text>
            </View>
            <View style={[styles.divider, { marginVertical: 12 }]} />
            <View style={styles.fareRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>$45.00</Text>
            </View>
          </View>

          {/* Payment Method Info */}
          <View style={styles.paymentInfo}>
            <CreditCard size={20} color="#3B82F6" />
            <View>
              <Text style={styles.payLabel}>Paid with</Text>
              <Text style={styles.cardDetail}>Visa •••• 4242</Text>
            </View>
          </View>
        </ScrollView>

        {/* Footer Actions */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.shareBtn}>
            <Share2 size={20} color="#64748B" />
            <Text style={styles.shareBtnText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.downloadBtn}>
            <Download size={20} color="#FFF" />
            <Text style={styles.downloadBtnText}>Download PDF</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.supportText}>
          Questions about this receipt? Contact support@medigo.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "rgba(0,0,0,0.05)" },
  modalContent: {
    flex: 1,
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 30,
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  receiptTitle: { fontSize: 24, fontWeight: "800", color: "#1E293B" },
  tripId: { fontSize: 14, color: "#94A3B8", marginTop: 4 },
  closeBtn: { padding: 4 },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
    marginBottom: 24,
  },
  statusText: { color: "#10B981", fontSize: 12, fontWeight: "800" },

  scrollArea: { flex: 1 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1E293B",
    letterSpacing: 0.5,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  detailText: { flex: 1 },
  label: { fontSize: 12, color: "#94A3B8", marginBottom: 2 },
  value: { fontSize: 15, fontWeight: "700", color: "#1E293B" },

  routeContainer: { flexDirection: "row", marginVertical: 8 },
  routeIcons: { alignItems: "center", width: 20, marginRight: 12 },
  blueDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3B82F6",
  },
  verticalLine: {
    width: 1,
    height: 40,
    backgroundColor: "#E2E8F0",
    marginVertical: 4,
  },
  routeDetails: { flex: 1 },
  routeAddress: { fontSize: 14, fontWeight: "700", color: "#1E293B" },

  divider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 20 },

  fareCard: { backgroundColor: "#F8FAFC", borderRadius: 20, padding: 16 },
  fareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  fareLabel: { fontSize: 14, color: "#64748B" },
  fareValue: { fontSize: 14, fontWeight: "700", color: "#1E293B" },
  totalLabel: { fontSize: 16, fontWeight: "800", color: "#1E293B" },
  totalValue: { fontSize: 20, fontWeight: "900", color: "#3B82F6" },

  paymentInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    padding: 16,
    borderRadius: 16,
    marginTop: 24,
    gap: 12,
  },
  payLabel: { fontSize: 11, color: "#3B82F6" },
  cardDetail: { fontSize: 14, fontWeight: "800", color: "#1E3A8A" },

  footer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
    paddingBottom: 12,
  },
  shareBtn: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  shareBtnText: { fontSize: 14, fontWeight: "700", color: "#64748B" },
  downloadBtn: {
    flex: 1.2,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#3B82F6",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  downloadBtnText: { fontSize: 14, fontWeight: "700", color: "#FFF" },
  supportText: {
    fontSize: 11,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 16,
  },
});

export default ReceiptScreen;
