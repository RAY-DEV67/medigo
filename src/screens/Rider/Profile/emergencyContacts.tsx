import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { ChevronLeft, Shield, Plus, Trash2, Phone } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EmergencyContactsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft color="#1A1C1E" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency Contacts</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Safety Banner */}
        <View style={styles.safetyBanner}>
          <View style={styles.shieldIconWrapper}>
            <Shield size={20} color="#3B82F6" />
          </View>
          <View style={styles.bannerTextContent}>
            <Text style={styles.bannerTitle}>Your Safety Matters</Text>
            <Text style={styles.bannerSub}>
              Add trusted contacts who will be notified in case of an emergency
              during your ride.
            </Text>
          </View>
        </View>

        {/* Add Contact Button (Dashed) */}
        <TouchableOpacity style={styles.addContactBtn}>
          <View style={styles.plusIconWrapper}>
            <Plus size={20} color="#3B82F6" />
          </View>
          <Text style={styles.addContactText}>Add Emergency Contact</Text>
        </TouchableOpacity>

        {/* Contact List */}
        <ContactCard
          name="John Johnson"
          relation="Spouse"
          phone="+1 (555) 123-4567"
        />

        <ContactCard
          name="Emily Davis"
          relation="Daughter"
          phone="+1 (555) 987-6543"
        />

        <ContactCard
          name="Emily Davis"
          relation="Daughter"
          phone="+1 (555) 987-6543"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Contact Card Component ---
const ContactCard = ({ name, relation, phone }: any) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View>
        <Text style={styles.contactName}>{name}</Text>
        <Text style={styles.contactRelation}>{relation}</Text>
      </View>
      <TouchableOpacity style={styles.deleteBtn}>
        <Trash2 size={18} color="#EF4444" />
      </TouchableOpacity>
    </View>

    <View style={styles.cardDivider} />

    <View style={styles.phoneRow}>
      <Phone size={16} color="#64748B" />
      <Text style={styles.phoneNumber}>{phone}</Text>
    </View>
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

  safetyBanner: {
    flexDirection: "row",
    backgroundColor: "#EFF6FF",
    padding: 16,
    borderRadius: 16,
    marginTop: 10,
    alignItems: "flex-start",
  },
  shieldIconWrapper: { marginTop: 2 },
  bannerTextContent: { flex: 1, marginLeft: 12 },
  bannerTitle: { fontSize: 14, fontWeight: "800", color: "#1E3A8A" },
  bannerSub: { fontSize: 12, color: "#3B82F6", marginTop: 4, lineHeight: 18 },

  addContactBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 64,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#3B82F6",
    borderStyle: "dashed",
    marginVertical: 24,
    backgroundColor: "#FFFFFF",
  },
  plusIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  addContactText: { fontSize: 15, fontWeight: "700", color: "#3B82F6" },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  contactName: { fontSize: 16, fontWeight: "800", color: "#1E293B" },
  contactRelation: { fontSize: 13, color: "#94A3B8", marginTop: 4 },
  deleteBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FEF2F2",
    justifyContent: "center",
    alignItems: "center",
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#F8FAFC",
    marginVertical: 16,
  },
  phoneRow: { flexDirection: "row", alignItems: "center" },
  phoneNumber: {
    fontSize: 14,
    color: "#1E293B",
    fontWeight: "600",
    marginLeft: 10,
  },
});

export default EmergencyContactsScreen;
