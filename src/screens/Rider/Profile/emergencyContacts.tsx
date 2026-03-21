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
import useTheme from "../../../hooks/useThemes";
import { commonStyles } from "../../../styles/commonStyles";
import Header from "../../../components/reuseables/header";
import { useEmergencyContacts } from "../../../hooks/queries/useEmergencyContacts";

const EmergencyContactsScreen = () => {
  const { colors, theme } = useTheme();
  const commonStyling = commonStyles(colors);
  const { data, isLoading, error } = useEmergencyContacts();

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.surfacePrimary,
        },
      ]}
    >
      <StatusBar
        barStyle={theme === "light" ? "dark-content" : "light-content"}
      />

      <Header title="Emergency Contacts" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Safety Banner */}
        <View
          style={[
            styles.safetyBanner,
            {
              backgroundColor: colors.homelightPrimaryBlue50,
            },
          ]}
        >
          <View style={styles.shieldIconWrapper}>
            <Shield size={20} color="#3B82F6" />
          </View>
          <View style={styles.bannerTextContent}>
            <Text
              style={[
                commonStyling.title,
                {
                  color: colors.primaryColor,
                  fontSize: 14,
                  fontFamily: "SemiBold",
                },
              ]}
            >
              Your Safety Matters
            </Text>
            <Text
              style={[
                commonStyling.subtitle,
                {
                  color: colors.primaryColor,
                  fontSize: 12,
                  marginTop: 4,
                },
              ]}
            >
              Add trusted contacts who will be notified in case of an emergency
              during your ride.
            </Text>
          </View>
        </View>

        {/* Add Contact Button (Dashed) */}
        <TouchableOpacity
          style={[
            styles.addContactBtn,
            {
              backgroundColor: colors.surfaceBrand,
              borderColor: colors.lightPrimaryBlueBorder,
            },
          ]}
        >
          <View style={styles.plusIconWrapper}>
            <Plus size={20} color="#3B82F6" />
          </View>
          <Text style={styles.addContactText}>Add Emergency Contact</Text>
        </TouchableOpacity>

        {isLoading ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Loading contacts...
          </Text>
        ) : data?.data && data.data.length > 0 ? (
          data.data.map((contact) => (
            <ContactCard
              key={contact.id}
              name={contact.name}
              relation={contact.relationship_type}
              phone={contact.phone}
              isPrimary={contact.is_primary}
            />
          ))
        ) : (
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Text style={[commonStyling.subtitle, { color: colors.titleText }]}>
              No emergency contacts added yet.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Contact Card Component ---
const ContactCard = ({ name, relation, phone }: any) => {
  const { colors } = useTheme();
  const commonStyling = commonStyles(colors);
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.homelightPrimaryBlue50,
          borderColor: colors.lightPrimaryBlueBorder,
        },
      ]}
    >
      <View style={styles.cardHeader}>
        <View>
          <Text
            style={[
              commonStyling.title,
              {
                fontSize: 16,
                fontFamily: "Bold",
              },
            ]}
          >
            {name}
          </Text>
          <Text
            style={[
              commonStyling.subtitle,
              {
                fontSize: 14,
                marginTop: 4,
              },
            ]}
          >
            {relation}
          </Text>
        </View>
        <TouchableOpacity style={styles.deleteBtn}>
          <Trash2 size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.cardDivider,
          {
            backgroundColor: colors.lightPrimaryBlueBorder,
          },
        ]}
      />

      <View style={styles.phoneRow}>
        <Phone size={16} color="#64748B" />
        <Text
          style={[
            styles.phoneNumber,
            commonStyling.title,
            {
              fontSize: 14,
            },
          ]}
        >
          {phone}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
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
    padding: 16,
    borderRadius: 16,
    marginTop: 10,
    alignItems: "flex-start",
  },
  shieldIconWrapper: { marginTop: 2 },
  bannerTextContent: { flex: 1, marginLeft: 12 },

  bannerSub: { fontSize: 12, color: "#3B82F6", marginTop: 4, lineHeight: 18 },

  addContactBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 64,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "dashed",
    marginVertical: 24,
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
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
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
    marginVertical: 16,
  },
  phoneRow: { flexDirection: "row", alignItems: "center" },
  phoneNumber: {
    marginLeft: 10,
  },
});

export default EmergencyContactsScreen;
