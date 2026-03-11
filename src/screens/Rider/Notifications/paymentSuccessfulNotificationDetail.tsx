import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { ChevronLeft, Banknote } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const PaymentSuccessfulNotificationDetail = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft color="#1A1C1E" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment successful</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Status Card */}
        <View style={styles.card}>
          <View style={styles.iconCircleGreen}>
            <Banknote color="#10B981" size={28} />
          </View>
          <Text style={styles.statusTitle}>Payment Successful</Text>
          <Text style={styles.statusDate}>March 3, 2026, 4:30 PM</Text>
        </View>

        {/* Message Card */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>MESSAGE</Text>
          <Text style={styles.messageText}>
            Your payment of $28.50 for the ride on March 3 has been processed.
          </Text>
        </View>

        {/* Details Breakdown Card */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>DETAILS</Text>

          {/* Highlighted Total Amount Box */}
          <View style={styles.totalAmountBox}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>$28.50</Text>
          </View>

          {/* Individual Fee Rows */}
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Ride Fare</Text>
            <Text style={styles.feeValue}>$22.50</Text>
          </View>

          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Tip</Text>
            <Text style={styles.feeValue}>$5.00</Text>
          </View>

          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Service Fee</Text>
            <Text style={styles.feeValue}>$1.00</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => {
            navigation.navigate("ReceiptScreen");
          }}
        >
          <Text style={styles.buttonText}>View Receipt</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  headerTitle: { fontSize: 18, fontWeight: "800", color: "#1E293B" },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },

  iconCircleGreen: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ECFDF5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  statusTitle: { fontSize: 24, fontWeight: "800", color: "#1E293B" },
  statusDate: { fontSize: 14, color: "#64748B", marginTop: 8 },

  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#94A3B8",
    letterSpacing: 1,
    marginBottom: 12,
  },
  messageText: { fontSize: 15, color: "#1E293B", lineHeight: 22 },

  totalAmountBox: {
    backgroundColor: "#ECFDF5",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    marginTop: 8,
  },
  totalLabel: { fontSize: 13, color: "#059669", fontWeight: "600" },
  totalValue: {
    fontSize: 32,
    fontWeight: "800",
    color: "#10B981",
    marginTop: 4,
  },

  feeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  feeLabel: { fontSize: 14, color: "#64748B" },
  feeValue: { fontSize: 14, fontWeight: "600", color: "#1E293B" },

  footer: {
    padding: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  primaryButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});

export default PaymentSuccessfulNotificationDetail;
