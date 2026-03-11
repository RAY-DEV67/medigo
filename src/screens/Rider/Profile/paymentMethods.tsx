import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  CreditCard,
  Lock,
} from "lucide-react-native";

// Simple placeholder for PayPal/Apple Pay brand logos
const BrandLogo = ({ type }: { type: "paypal" | "apple" }) => (
  <View
    style={[
      styles.brandLogo,
      type === "paypal" ? styles.bgBlue : styles.bgBlack,
    ]}
  >
    <Text style={styles.brandText}>{type === "paypal" ? "PayPal" : "Pay"}</Text>
  </View>
);

const PaymentMethodsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft color="#1A1C1E" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* SAVED CARDS SECTION */}
        <Text style={styles.categoryLabel}>Saved Cards</Text>
        <View style={styles.cardGroup}>
          {/* Default Card */}
          <TouchableOpacity style={styles.paymentRow}>
            <View style={styles.iconContainer}>
              <CreditCard size={20} color="#64748B" />
            </View>
            <View style={styles.textContent}>
              <View style={styles.titleRow}>
                <Text style={styles.paymentTitle}>Visa •••• 4242</Text>
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>DEFAULT</Text>
                </View>
              </View>
              <Text style={styles.paymentSub}>Expires 12/25</Text>
            </View>
            <ChevronRight size={18} color="#CBD5E1" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Secondary Card */}
          <TouchableOpacity style={styles.paymentRow}>
            <View style={styles.iconContainer}>
              <CreditCard size={20} color="#64748B" />
            </View>
            <View style={styles.textContent}>
              <Text style={styles.paymentTitle}>Mastercard •••• 8888</Text>
              <Text style={styles.paymentSub}>Expires 09/26</Text>
            </View>
            <ChevronRight size={18} color="#CBD5E1" />
          </TouchableOpacity>
        </View>

        {/* ADD PAYMENT SECTION */}
        <Text style={styles.categoryLabel}>Add Payment Method</Text>
        <TouchableOpacity style={styles.addMethodCard}>
          <View style={styles.plusWrapper}>
            <Plus size={20} color="#3B82F6" />
          </View>
          <Text style={styles.addMethodText}>Add Credit or Debit Card</Text>
          <ChevronRight size={18} color="#CBD5E1" />
        </TouchableOpacity>

        {/* OTHER OPTIONS SECTION */}
        <Text style={styles.categoryLabel}>Other Options</Text>
        <View style={styles.cardGroup}>
          {/* PayPal */}
          <TouchableOpacity style={styles.paymentRow}>
            <BrandLogo type="paypal" />
            <View style={styles.textContent}>
              <Text style={styles.paymentTitle}>PayPal</Text>
              <Text style={styles.paymentSub}>Link your PayPal account</Text>
            </View>
            <ChevronRight size={18} color="#CBD5E1" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Apple Pay */}
          <TouchableOpacity style={styles.paymentRow}>
            <BrandLogo type="apple" />
            <View style={styles.textContent}>
              <Text style={styles.paymentTitle}>Apple Pay</Text>
              <Text style={styles.paymentSub}>Fast and secure checkout</Text>
            </View>
            <ChevronRight size={18} color="#CBD5E1" />
          </TouchableOpacity>
        </View>

        {/* Security Footer */}
        <View style={styles.securityFooter}>
          <Lock size={14} color="#94A3B8" />
          <View style={styles.securityTextContainer}>
            <Text style={styles.securityTitle}>Secure Payment</Text>
            <Text style={styles.securitySub}>
              Your payment information is encrypted and PCI-compliant.
            </Text>
          </View>
        </View>
      </ScrollView>
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
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  headerTitle: { fontSize: 18, fontWeight: "800", color: "#1E293B" },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  categoryLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#94A3B8",
    marginTop: 24,
    marginBottom: 12,
  },

  cardGroup: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    overflow: "hidden",
  },
  paymentRow: { flexDirection: "row", alignItems: "center", padding: 16 },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  textContent: { flex: 1, marginLeft: 12 },
  titleRow: { flexDirection: "row", alignItems: "center" },
  paymentTitle: { fontSize: 15, fontWeight: "700", color: "#1E293B" },
  paymentSub: { fontSize: 12, color: "#94A3B8", marginTop: 2 },
  divider: { height: 1, backgroundColor: "#F1F5F9", marginHorizontal: 16 },

  defaultBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 10,
  },
  defaultText: { color: "#22C55E", fontSize: 10, fontWeight: "800" },

  addMethodCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  plusWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  addMethodText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
    marginLeft: 12,
  },

  brandLogo: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  bgBlue: { backgroundColor: "#0070BA" },
  bgBlack: { backgroundColor: "#000000" },
  brandText: { color: "#FFF", fontSize: 10, fontWeight: "900" },

  securityFooter: { flexDirection: "row", marginTop: 32, paddingHorizontal: 4 },
  securityTextContainer: { marginLeft: 10, flex: 1 },
  securityTitle: { fontSize: 12, fontWeight: "700", color: "#64748B" },
  securitySub: { fontSize: 11, color: "#94A3B8", marginTop: 2, lineHeight: 16 },
});

export default PaymentMethodsScreen;
