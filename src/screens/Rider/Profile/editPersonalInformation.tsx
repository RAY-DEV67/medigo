import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import { ChevronLeft, Camera, Lock, ChevronDown } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EditProfileScreen = () => {
  // State for form inputs
  const [form, setForm] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 234-5678",
    medicalNotes: "",
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft color="#1A1C1E" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Information</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Image with Upload Trigger */}
        <View style={styles.profileContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?u=sarah" }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.cameraBtn}>
              <Camera size={16} color="#1E293B" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Personal Details</Text>

        {/* Name Row */}
        <View style={styles.row}>
          <View style={styles.flex1}>
            <Text style={styles.inputLabel}>
              First Name<Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={form.firstName}
              onChangeText={(t) => setForm({ ...form, firstName: t })}
            />
          </View>
          <View style={styles.flex1}>
            <Text style={styles.inputLabel}>
              Last Name<Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={form.lastName}
              onChangeText={(t) => setForm({ ...form, lastName: t })}
            />
          </View>
        </View>

        {/* Email Input */}
        <Text style={styles.inputLabel}>
          Email<Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={form.email}
          keyboardType="email-address"
          onChangeText={(t) => setForm({ ...form, email: t })}
        />

        {/* Phone Input with Dropdown */}
        <Text style={styles.inputLabel}>
          Phone Number<Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.phoneInputContainer}>
          <TextInput
            style={styles.phoneInput}
            value={form.phone}
            keyboardType="phone-pad"
            onChangeText={(t) => setForm({ ...form, phone: t })}
          />
          <ChevronDown size={20} color="#CBD5E1" style={{ marginRight: 12 }} />
        </View>

        {/* Medical Info Section */}
        <Text style={[styles.sectionLabel, { marginTop: 24 }]}>
          Medical Information
        </Text>
        <View style={styles.medicalBox}>
          <Text style={styles.fieldLabelSmall}>Medical Notes (Optional)</Text>
          <TextInput
            style={styles.medicalInput}
            placeholder="No medical notes added"
            placeholderTextColor="#94A3B8"
            multiline
            value={form.medicalNotes}
            onChangeText={(t) => setForm({ ...form, medicalNotes: t })}
          />
        </View>

        {/* Privacy Banner */}
        <View style={styles.privacyBanner}>
          <Lock
            size={16}
            color="#3B82F6"
            fill="#3B82F6"
            style={{ marginTop: 2 }}
          />
          <View style={styles.bannerTextWrapper}>
            <Text style={styles.bannerTitle}>Privacy Protected</Text>
            <Text style={styles.bannerSub}>
              Your information is encrypted and HIPAA compliant. Only shared
              with your assigned driver for safety.
            </Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save changes</Text>
        </TouchableOpacity>
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
  profileContainer: { alignItems: "center", marginVertical: 24 },
  imageWrapper: { position: "relative" },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  cameraBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FFF",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  sectionLabel: {
    fontSize: 13,
    fontWeight: "800",
    color: "#94A3B8",
    marginBottom: 16,
  },
  row: { flexDirection: "row", gap: 12 },
  flex1: { flex: 1 },

  inputLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 8,
    marginTop: 16,
  },
  required: { color: "#EF4444" },
  input: {
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#1E293B",
    fontWeight: "500",
  },

  phoneInputContainer: {
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    flexDirection: "row",
    alignItems: "center",
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#1E293B",
    fontWeight: "500",
  },

  medicalBox: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    minHeight: 80,
  },
  fieldLabelSmall: { fontSize: 12, color: "#94A3B8", marginBottom: 4 },
  medicalInput: { fontSize: 14, color: "#1E293B", padding: 0 },

  privacyBanner: {
    flexDirection: "row",
    backgroundColor: "#EFF6FF",
    padding: 16,
    borderRadius: 16,
    marginTop: 24,
    gap: 12,
  },
  bannerTextWrapper: { flex: 1 },
  bannerTitle: { fontSize: 14, fontWeight: "800", color: "#1E3A8A" },
  bannerSub: { fontSize: 12, color: "#3B82F6", marginTop: 4, lineHeight: 18 },

  saveBtn: {
    height: 56,
    backgroundColor: "#3B82F6",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  saveBtnText: { color: "#FFF", fontSize: 16, fontWeight: "800" },
});

export default EditProfileScreen;
