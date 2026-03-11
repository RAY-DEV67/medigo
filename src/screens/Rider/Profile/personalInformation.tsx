import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import { ChevronLeft, Lock } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const PersonalInformationScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft color="#1A1C1E" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Information</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RiderProfileContentsStack", {
              screen: "EditProfileScreen",
            });
          }}
        >
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Image Section */}
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?u=sarah" }}
            style={styles.avatar}
          />
        </View>

        {/* Personal Details Section */}
        <Text style={styles.sectionLabel}>Personal Details</Text>
        <View style={styles.infoCard}>
          <DataField label="First Name" value="Sarah" />
          <View style={styles.divider} />
          <DataField label="Last Name" value="Johnson" />
          <View style={styles.divider} />
          <DataField label="Email" value="sarah.johnson@email.com" />
          <View style={styles.divider} />
          <DataField label="Phone Number" value="+1 (555) 234-5678" />
        </View>

        {/* Medical Information Section */}
        <Text style={[styles.sectionLabel, { marginTop: 24 }]}>
          Medical Information
        </Text>
        <View style={styles.infoCard}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Medical Notes (Optional)</Text>
            <Text style={styles.fieldValueGray}>No medical notes added</Text>
          </View>
        </View>

        {/* Privacy Banner */}
        <View style={styles.privacyBanner}>
          <View style={styles.lockIconWrapper}>
            <Lock size={16} color="#3B82F6" fill="#3B82F6" />
          </View>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>Privacy Protected</Text>
            <Text style={styles.bannerSub}>
              Your information is encrypted and HIPAA compliant. Only shared
              with your assigned driver for safety.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Sub-components ---
const DataField = ({ label, value }: any) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <Text style={styles.fieldValue}>{value}</Text>
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
  editText: { fontSize: 16, fontWeight: "600", color: "#94A3B8" },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },

  profileImageContainer: { alignItems: "center", marginVertical: 30 },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: "#F8FAFC",
  },

  sectionLabel: {
    fontSize: 13,
    fontWeight: "800",
    color: "#94A3B8",
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    overflow: "hidden",
  },
  fieldContainer: { padding: 16 },
  fieldLabel: { fontSize: 11, color: "#94A3B8", marginBottom: 6 },
  fieldValue: { fontSize: 15, fontWeight: "700", color: "#1E293B" },
  fieldValueGray: { fontSize: 14, color: "#94A3B8" },
  divider: { height: 1, backgroundColor: "#F1F5F9", marginHorizontal: 16 },

  privacyBanner: {
    flexDirection: "row",
    backgroundColor: "#EFF6FF",
    padding: 16,
    borderRadius: 16,
    marginTop: 24,
    alignItems: "flex-start",
  },
  lockIconWrapper: { marginTop: 2 },
  bannerTextContainer: { flex: 1, marginLeft: 12 },
  bannerTitle: { fontSize: 14, fontWeight: "800", color: "#1E3A8A" },
  bannerSub: { fontSize: 12, color: "#3B82F6", marginTop: 4, lineHeight: 18 },
});

export default PersonalInformationScreen;
