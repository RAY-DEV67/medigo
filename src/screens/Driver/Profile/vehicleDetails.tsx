import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import {
  ChevronLeft,
  Car,
  Palette,
  Hash,
  Calendar,
  Fingerprint,
  FileText,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "../../../hooks/useThemes";
import { commonStyles } from "../../../styles/commonStyles";
import { useDriverProfile } from "../../../hooks/queries/useDriverProfile";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "../../../components/reuseables/header";

const VehicleDetails = () => {
  const { colors, theme } = useTheme();
  const commonStyling = commonStyles(colors);
  const { data: profileData, isLoading } = useDriverProfile();
  const profile = profileData?.data;
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

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

      <Header
        title="Vehicle Details"
        rightText={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DriverProfileContentsStack", {
                screen: "EditVehicleDetails",
              });
            }}
          >
            <Text
              style={[
                commonStyling.subtitle,
                {
                  fontSize: 16,
                },
              ]}
            >
              Edit
            </Text>
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Vehicle Photo Section */}
        <View
          style={[
            styles.photoCard,
            {
              borderColor: colors.lightPrimaryBlueBorder,
            },
          ]}
        >
          <View
            style={[
              styles.photoIconBg,
              {
                backgroundColor: colors.surfaceBrand,
              },
            ]}
          >
            <Car size={32} color={colors.primaryColor} />
          </View>
          <View style={styles.photoTextGroup}>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 18,
                  fontFamily: "Bold",
                },
              ]}
            >
              Vehicle Photo
            </Text>
            <Text
              style={[
                styles.photoSub,
                commonStyling.subtitle,
                {
                  fontSize: 14,
                },
              ]}
            >
              Upload a clear photo of your vehicle
            </Text>
          </View>
        </View>

        {/* Status Banner */}
        <View style={styles.statusBanner}>
          <View style={styles.statusAccent} />
          <CheckCircle2 size={20} color="#10B981" />
          <View style={styles.statusTextGroup}>
            <Text style={styles.statusTitle}>Vehicle Verified</Text>
            <Text style={styles.statusSub}>
              Your vehicle meets all MediGo safety standards
            </Text>
          </View>
        </View>

        {/* Vehicle Information Section */}
        <Text
          style={[
            styles.sectionLabel,
            commonStyling.title,
            {
              fontSize: 18,
              fontFamily: "Bold",
            },
          ]}
        >
          Vehicle Information
        </Text>

        <View style={styles.infoList}>
          {/* Vehicle Model */}
          <View
            style={[
              styles.infoItem,
              {
                borderColor: colors.lightPrimaryBlueBorder,
              },
            ]}
          >
            <View
              style={[styles.iconBox, { backgroundColor: colors.surfaceBrand }]}
            >
              <Car size={18} color={colors.primaryColor} />
            </View>
            <View style={styles.itemContent}>
              <Text
                style={[
                  styles.itemLabel,
                  commonStyling.subtitle,
                  {
                    fontSize: 12,
                  },
                ]}
              >
                Vehicle
              </Text>
              <Text
                style={[
                  styles.itemValue,
                  commonStyling.title,
                  {
                    fontSize: 15,
                    fontFamily: "SemiBold",
                  },
                ]}
              >
                {profile?.vehicle_make}
              </Text>
            </View>
          </View>

          {/* Color */}
          <View
            style={[
              styles.infoItem,
              {
                borderColor: colors.lightPrimaryBlueBorder,
              },
            ]}
          >
            <View
              style={[styles.iconBox, { backgroundColor: colors.surfaceBrand }]}
            >
              <Palette size={18} color={colors.primaryColor} />
            </View>
            <View style={styles.itemContent}>
              <Text
                style={[
                  styles.itemLabel,
                  commonStyling.subtitle,
                  {
                    fontSize: 12,
                  },
                ]}
              >
                Color
              </Text>
              <Text
                style={[
                  styles.itemValue,
                  commonStyling.title,
                  {
                    fontSize: 15,
                    fontFamily: "SemiBold",
                  },
                ]}
              >
                {profile?.vehicle_color}
              </Text>
            </View>
          </View>

          {/* License Plate */}
          <View
            style={[
              styles.infoItem,
              {
                borderColor: colors.lightPrimaryBlueBorder,
              },
            ]}
          >
            <View
              style={[styles.iconBox, { backgroundColor: colors.surfaceBrand }]}
            >
              <Hash size={18} color={colors.primaryColor} />
            </View>
            <View style={styles.itemContent}>
              <Text
                style={[
                  styles.itemLabel,
                  commonStyling.subtitle,
                  {
                    fontSize: 12,
                  },
                ]}
              >
                License Plate
              </Text>
              <Text
                style={[
                  styles.itemValue,
                  commonStyling.title,
                  {
                    fontSize: 15,
                    fontFamily: "SemiBold",
                  },
                ]}
              >
                {profile?.license_number}
              </Text>
            </View>
            <CheckCircle2 size={18} color="#10B981" />
          </View>

          {/* Year */}
          <View
            style={[
              styles.infoItem,
              {
                borderColor: colors.lightPrimaryBlueBorder,
              },
            ]}
          >
            <View
              style={[styles.iconBox, { backgroundColor: colors.surfaceBrand }]}
            >
              <Calendar size={18} color={colors.primaryColor} />
            </View>
            <View style={styles.itemContent}>
              <Text
                style={[
                  styles.itemLabel,
                  commonStyling.subtitle,
                  {
                    fontSize: 12,
                  },
                ]}
              >
                Year
              </Text>
              <Text
                style={[
                  styles.itemValue,
                  commonStyling.title,
                  {
                    fontSize: 15,
                    fontFamily: "SemiBold",
                  },
                ]}
              >
                {profile?.vehicle_year}
              </Text>
            </View>
          </View>

          {/* VIN */}
          <View
            style={[
              styles.infoItem,
              {
                borderColor: colors.lightPrimaryBlueBorder,
              },
            ]}
          >
            <View
              style={[styles.iconBox, { backgroundColor: colors.surfaceBrand }]}
            >
              <Fingerprint size={18} color={colors.primaryColor} />
            </View>
            <View style={styles.itemContent}>
              <Text
                style={[
                  styles.itemLabel,
                  commonStyling.subtitle,
                  {
                    fontSize: 12,
                  },
                ]}
              >
                VIN (Vehicle Identification Number)
              </Text>
              <Text
                style={[
                  styles.itemValue,
                  commonStyling.title,
                  {
                    fontSize: 15,
                    fontFamily: "SemiBold",
                  },
                ]}
              >
                {profile?.vehicle_vin}
              </Text>
            </View>
          </View>
        </View>

        {/* Vehicle Documents Section */}
        <Text
          style={[
            styles.sectionLabel,
            commonStyling.title,
            {
              fontSize: 18,
              fontFamily: "Bold",
            },
          ]}
        >
          Vehicle Documents
        </Text>

        <TouchableOpacity
          style={[
            styles.docItem,
            {
              borderColor: colors.lightPrimaryBlueBorder,
            },
          ]}
        >
          <View style={[styles.docIcon, { backgroundColor: "#ECFDF5" }]}>
            <FileText size={20} color="#10B981" />
          </View>
          <View style={styles.docContent}>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 15,
                  fontFamily: "Bold",
                },
              ]}
            >
              Vehicle Registration
            </Text>
            <Text style={styles.docStatus}>
              Verified{" "}
              <Text
                style={[
                  commonStyling.subtitle,
                  {
                    fontSize: 12,
                    fontFamily: "Medium",
                  },
                ]}
              >
                • Expires: Dec 31, 2026
              </Text>
            </Text>
          </View>
          <ChevronRight size={20} color="#94A3B8" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.docItem,
            {
              borderColor: colors.lightPrimaryBlueBorder,
            },
          ]}
        >
          <View style={[styles.docIcon, { backgroundColor: "#ECFDF5" }]}>
            <ShieldCheck size={20} color="#10B981" />
          </View>
          <View style={styles.docContent}>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 15,
                  fontFamily: "Bold",
                },
              ]}
            >
              Insurance Certificate
            </Text>
            <Text style={styles.docStatus}>
              Verified{" "}
              <Text
                style={[
                  commonStyling.subtitle,
                  {
                    fontSize: 12,
                    fontFamily: "Medium",
                  },
                ]}
              >
                • Expires: Jan 30, 2025
              </Text>
            </Text>
          </View>
          <ChevronRight size={20} color="#94A3B8" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.docItem,
            {
              borderColor: colors.lightPrimaryBlueBorder,
            },
          ]}
        >
          <View style={[styles.docIcon, { backgroundColor: "#ECFDF5" }]}>
            <CheckCircle2 size={20} color="#10B981" />
          </View>
          <View style={styles.docContent}>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 15,
                  fontFamily: "Bold",
                },
              ]}
            >
              Safety Inspection
            </Text>
            <Text style={styles.docStatus}>
              Verified{" "}
              <Text
                style={[
                  commonStyling.subtitle,
                  {
                    fontSize: 12,
                    fontFamily: "Medium",
                  },
                ]}
              >
                • Expires: Aug 15, 2025
              </Text>
            </Text>
          </View>
          <ChevronRight size={20} color="#94A3B8" />
        </TouchableOpacity>

        {/* Requirements Box */}
        <View
          style={[
            styles.requirementsBox,
            {
              backgroundColor: colors.surfaceBrand,
            },
          ]}
        >
          <Text
            style={[
              styles.reqHeader,
              {
                fontSize: 14,
                fontFamily: "Bold",
                color: colors.primaryColor,
              },
            ]}
          >
            Vehicle Requirements
          </Text>
          {[
            "4-door sedan or SUV",
            "Model year 2015 or newer",
            "Valid registration and insurance",
            "Regular safety inspections",
          ].map((req, index) => (
            <View key={index} style={styles.reqRow}>
              <CheckCircle2 size={16} color="#3B82F6" />
              <Text
                style={{
                  fontSize: 12,
                  color: colors.primaryColor,
                  fontFamily: "Regular",
                }}
              >
                {req}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "800", color: "#1E293B" },
  editLink: { fontSize: 14, fontWeight: "600", color: "#94A3B8" },

  scrollContent: { padding: 20 },

  photoCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
  },
  photoIconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  photoTextGroup: { marginLeft: 16 },
  photoSub: { marginTop: 2 },

  statusBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    padding: 16,
    borderRadius: 16,
    marginBottom: 32,
    overflow: "hidden",
  },
  statusAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: "#10B981",
  },
  statusTextGroup: { marginLeft: 12 },
  statusTitle: { fontSize: 14, fontFamily: "Bold", color: "#065F46" },
  statusSub: {
    fontSize: 12,
    color: "#059669",
    fontFamily: "Regular",
    marginTop: 2,
  },

  sectionLabel: {
    marginBottom: 16,
  },
  infoList: { marginBottom: 32 },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContent: { flex: 1, marginLeft: 12 },
  itemLabel: {
    textTransform: "uppercase",
  },
  itemValue: {
    marginTop: 2,
  },

  docItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  docIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  docContent: { flex: 1, marginLeft: 14 },
  docStatus: {
    fontSize: 12,
    fontFamily: "Medium",
    color: "#10B981",
    marginTop: 2,
  },

  requirementsBox: {
    borderRadius: 20,
    padding: 20,
    marginTop: 12,
  },
  reqHeader: {
    marginBottom: 12,
  },
  reqRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 10,
  },
});

export default VehicleDetails;
