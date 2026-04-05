import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Switch,
} from "react-native";
import {
  ChevronLeft,
  Lock,
  Smartphone,
  Key,
  MapPin,
  Eye,
  Share2,
  Download,
  Trash2,
  ShieldCheck,
  ChevronRight,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/reuseables/header";
import useTheme from "../../../hooks/useThemes";
import { commonStyles } from "../../../styles/commonStyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUpdatePrivacy } from "../../../hooks/mutations/useUser";
import { UpdatePrivacyPayload } from "../../../types/user.types";
import { useDriverSettings } from "../../../hooks/queries/useDriverSettings";
import { NotificationsSettingsSkeleton } from "../../../components/skelentonAnimation/notificationSettingsSkelenton";

const PrivacySecurityScreen = () => {
  const { colors, theme } = useTheme();
  const commonStyling = commonStyles(colors);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { data, isLoading } = useDriverSettings();
  const settingsValue = data?.data;
  const { mutate: updatePrivacy } = useUpdatePrivacy();

  const handlePrivacyToggle = (
    key: keyof UpdatePrivacyPayload,
    value: boolean,
  ) => {
    updatePrivacy({ [key]: value });
  };

  const [settings, setSettings] = useState({
    twoFactor: true,
    shareLocation: true,
    historyVisibility: false,
    phoneSharing: true,
  });

  const toggleSwitch = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (isLoading) {
    return <NotificationsSettingsSkeleton />;
  }

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

      <Header title="Privacy & Security" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* SECTION: Security */}
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
          Security
        </Text>

        <TouchableOpacity
          style={[
            styles.listItem,
            {
              borderColor: colors.lightPrimaryBlueBorder,
            },
          ]}
        >
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: colors.surfaceBrand },
            ]}
          >
            <Lock size={20} color={colors.primaryColor} />
          </View>
          <View style={styles.itemTextContainer}>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 15,
                  fontFamily: "Bold",
                },
              ]}
            >
              Change Password
            </Text>
            <Text
              style={[
                styles.itemSub,
                commonStyling.subtitle,
                {
                  fontSize: 12,
                },
              ]}
            >
              Update your account password
            </Text>
          </View>
          <ChevronRight size={18} color="#CBD5E1" />
        </TouchableOpacity>

        <View
          style={[
            styles.listItem,
            {
              borderColor: colors.lightPrimaryBlueBorder,
            },
          ]}
        >
          <View style={[styles.iconCircle, { backgroundColor: "#F0FDF4" }]}>
            <Smartphone size={20} color="#10B981" />
          </View>
          <View style={styles.itemTextContainer}>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 15,
                  fontFamily: "Bold",
                },
              ]}
            >
              Two-Factor Authentication
            </Text>
            <Text
              style={[
                styles.itemSub,
                commonStyling.subtitle,
                {
                  fontSize: 12,
                },
              ]}
            >
              Extra security for your account
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#E2E8F0", true: "#3B82F6" }}
            thumbColor="#FFF"
            onValueChange={() => toggleSwitch("twoFactor")}
            value={settings.twoFactor}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.listItem,
            {
              borderColor: colors.lightPrimaryBlueBorder,
            },
          ]}
        >
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: colors.surfaceBrand },
            ]}
          >
            <Key size={20} color={colors.primaryColor} />
          </View>
          <View style={styles.itemTextContainer}>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 15,
                  fontFamily: "Bold",
                },
              ]}
            >
              Active Sessions
            </Text>
            <Text
              style={[
                styles.itemSub,
                commonStyling.subtitle,
                {
                  fontSize: 12,
                },
              ]}
            >
              Manage logged-in devices
            </Text>
          </View>
          <ChevronRight size={18} color="#CBD5E1" />
        </TouchableOpacity>

        {/* SECTION: Privacy */}
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
          Privacy
        </Text>

        <View
          style={[
            styles.listItem,
            {
              borderColor: colors.lightPrimaryBlueBorder,
            },
          ]}
        >
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: colors.surfaceBrand },
            ]}
          >
            <MapPin size={20} color={colors.primaryColor} />
          </View>
          <View style={styles.itemTextContainer}>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 15,
                  fontFamily: "Bold",
                },
              ]}
            >
              Share Location
            </Text>
            <Text
              style={[
                styles.itemSub,
                commonStyling.subtitle,
                {
                  fontSize: 12,
                },
              ]}
            >
              Share your location during rides
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#E2E8F0", true: "#3B82F6" }}
            thumbColor="#FFF"
            value={!!settings?.share_location_with_rider}
            onValueChange={(val: boolean) =>
              handlePrivacyToggle("share_location_with_rider", val)
            }
          />
        </View>

        <View
          style={[
            styles.listItem,
            {
              borderColor: colors.lightPrimaryBlueBorder,
            },
          ]}
        >
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: colors.surfaceBrand },
            ]}
          >
            <Eye size={20} color={colors.primaryColor} />
          </View>
          <View style={styles.itemTextContainer}>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 15,
                  fontFamily: "Bold",
                },
              ]}
            >
              Ride History Visibility
            </Text>
            <Text
              style={[
                styles.itemSub,
                commonStyling.subtitle,
                {
                  fontSize: 12,
                },
              ]}
            >
              Allow riders to see your trip count
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#E2E8F0", true: "#3B82F6" }}
            thumbColor="#FFF"
            onValueChange={() => toggleSwitch("historyVisibility")}
            value={settings.historyVisibility}
          />
        </View>

        <View
          style={[
            styles.listItem,
            {
              borderColor: colors.lightPrimaryBlueBorder,
            },
          ]}
        >
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: colors.surfaceBrand },
            ]}
          >
            <Share2 size={20} color={colors.primaryColor} />
          </View>
          <View style={styles.itemTextContainer}>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 15,
                  fontFamily: "Bold",
                },
              ]}
            >
              Phone Number Sharing
            </Text>
            <Text
              style={[
                styles.itemSub,
                commonStyling.subtitle,
                {
                  fontSize: 12,
                },
              ]}
            >
              Share phone with riders during trips
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#E2E8F0", true: "#3B82F6" }}
            thumbColor="#FFF"
            onValueChange={() => toggleSwitch("phoneSharing")}
            value={settings.phoneSharing}
          />
        </View>

        {/* SECTION: Data & Account */}
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
          Data & Account
        </Text>

        <TouchableOpacity
          style={[
            styles.listItem,
            {
              borderColor: colors.lightPrimaryBlueBorder,
            },
          ]}
        >
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: colors.surfaceBrand },
            ]}
          >
            <Download size={20} color={colors.primaryColor} />
          </View>
          <View style={styles.itemTextContainer}>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 15,
                  fontFamily: "Bold",
                },
              ]}
            >
              Download Your Data
            </Text>
            <Text
              style={[
                styles.itemSub,
                commonStyling.subtitle,
                {
                  fontSize: 12,
                },
              ]}
            >
              Get a copy of your account data
            </Text>
          </View>
          <ChevronRight size={18} color="#CBD5E1" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.listItem,
            {
              borderColor: colors.lightPrimaryBlueBorder,
            },
          ]}
        >
          <View style={[styles.iconCircle, { backgroundColor: "#FEF2F2" }]}>
            <Trash2 size={20} color="#EF4444" />
          </View>
          <View style={styles.itemTextContainer}>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 15,
                  fontFamily: "Bold",
                },
              ]}
            >
              Delete Account
            </Text>
            <Text
              style={[
                styles.itemSub,
                commonStyling.subtitle,
                {
                  fontSize: 12,
                },
              ]}
            >
              Permanently delete your account
            </Text>
          </View>
          <ChevronRight size={18} color="#CBD5E1" />
        </TouchableOpacity>

        {/* Footer Note */}
        <View
          style={[
            styles.footerNote,
            {
              backgroundColor: colors.surfaceBrand,
            },
          ]}
        >
          <ShieldCheck
            size={20}
            color={colors.primaryColor}
            style={{ marginTop: 2 }}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.footerTitle,
                {
                  fontSize: 14,
                  fontFamily: "Bold",
                  color: colors.primaryColor,
                },
              ]}
            >
              Your Privacy Matters
            </Text>
            <Text
              style={[
                styles.footerText,
                {
                  fontSize: 12,
                  fontFamily: "Regular",
                  color: colors.primaryColor,
                },
              ]}
            >
              We take your privacy seriously. Your data is encrypted and never
              shared without your explicit consent. Learn more in our Privacy
              Policy.
            </Text>
          </View>
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

  scrollContent: { padding: 20 },
  sectionLabel: {
    marginTop: 12,
    marginBottom: 16,
  },

  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  itemTextContainer: { flex: 1, marginLeft: 16, marginRight: 8 },
  itemSub: { marginTop: 4 },

  footerNote: {
    flexDirection: "row",
    gap: 12,
    padding: 20,
    borderRadius: 16,
    marginTop: 12,
    marginBottom: 30,
  },
  footerTitle: {
    marginBottom: 4,
  },
  footerText: {
    lineHeight: 18,
  },
});

export default PrivacySecurityScreen;
