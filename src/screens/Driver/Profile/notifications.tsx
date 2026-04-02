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
  Bell,
  MapPin,
  MessageSquare,
  CircleDollarSign,
  LineChart,
  AlertTriangle,
  Smartphone,
  Mail,
  MessageCircle,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "../../../hooks/useThemes";
import { commonStyles } from "../../../styles/commonStyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "../../../components/reuseables/header";

const NotificationsScreen = () => {
  const { colors, theme } = useTheme();
  const commonStyling = commonStyles(colors);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [settings, setSettings] = useState({
    rideRequests: true,
    rideUpdates: true,
    messages: true,
    earningsUpdates: true,
    promotions: false,
    safetyAlerts: true,
    appUpdates: true,
    push: true,
    email: false,
    sms: true,
  });

  const toggleSwitch = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const NotificationRow = ({
    icon,
    title,
    sub,
    value,
    onToggle,
    iconBg,
  }: any) => {
    const { colors, theme } = useTheme();
    const commonStyling = commonStyles(colors);
    return (
      <View
        style={[
          styles.settingRow,
          {
            borderColor: colors.lightPrimaryBlueBorder,
          },
        ]}
      >
        <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
          {icon}
        </View>
        <View style={styles.rowContent}>
          <Text
            style={[
              commonStyling.title,
              {
                fontSize: 15,
                fontFamily: "Bold",
              },
            ]}
          >
            {title}
          </Text>
          <Text
            style={[
              styles.rowSub,
              commonStyling.subtitle,
              {
                fontSize: 12,
              },
            ]}
          >
            {sub}
          </Text>
        </View>
        <Switch
          trackColor={{ false: "#E2E8F0", true: "#3B82F6" }}
          thumbColor="#FFF"
          onValueChange={onToggle}
          value={value}
        />
      </View>
    );
  };

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

      <Header title="Notifications" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Section: Ride Notifications */}
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
          Ride Notifications
        </Text>
        <NotificationRow
          icon={<Bell size={20} color="#3B82F6" />}
          iconBg="#EFF6FF"
          title="Ride Requests"
          sub="New ride requests in your area"
          value={settings.rideRequests}
          onToggle={() => toggleSwitch("rideRequests")}
        />
        <NotificationRow
          icon={<MapPin size={20} color="#3B82F6" />}
          iconBg="#EFF6FF"
          title="Ride Updates"
          sub="Trip changes and cancellations"
          value={settings.rideUpdates}
          onToggle={() => toggleSwitch("rideUpdates")}
        />
        <NotificationRow
          icon={<MessageSquare size={20} color="#3B82F6" />}
          iconBg="#EFF6FF"
          title="Messages"
          sub="New messages from riders"
          value={settings.messages}
          onToggle={() => toggleSwitch("messages")}
        />

        {/* Section: Earnings & Performance */}
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
          Earnings & Performance
        </Text>
        <NotificationRow
          icon={<CircleDollarSign size={20} color="#10B981" />}
          iconBg="#F0FDF4"
          title="Earnings Updates"
          sub="Weekly summaries and payouts"
          value={settings.earningsUpdates}
          onToggle={() => toggleSwitch("earningsUpdates")}
        />
        <NotificationRow
          icon={<LineChart size={20} color="#F59E0B" />}
          iconBg="#FFFBEB"
          title="Promotions & Bonuses"
          sub="Surge pricing and bonus opportunities"
          value={settings.promotions}
          onToggle={() => toggleSwitch("promotions")}
        />

        {/* Section: Safety & Support */}
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
          Safety & Support
        </Text>
        <NotificationRow
          icon={<AlertTriangle size={20} color="#EF4444" />}
          iconBg="#FEF2F2"
          title="Safety Alerts"
          sub="Important safety updates"
          value={settings.safetyAlerts}
          onToggle={() => toggleSwitch("safetyAlerts")}
        />
        <NotificationRow
          icon={<Bell size={20} color="#3B82F6" />}
          iconBg="#EFF6FF"
          title="App Updates"
          sub="New features and improvements"
          value={settings.appUpdates}
          onToggle={() => toggleSwitch("appUpdates")}
        />

        {/* Section: Notification Channels */}
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
          Notification Channels
        </Text>
        <NotificationRow
          icon={<Smartphone size={20} color="#3B82F6" />}
          iconBg="#FFF"
          title="Push Notifications"
          sub="Receive alerts on this device"
          value={settings.push}
          onToggle={() => toggleSwitch("push")}
        />
        <NotificationRow
          icon={<Mail size={20} color="#3B82F6" />}
          iconBg="#FFF"
          title="Email Notifications"
          sub="Receive updates via email"
          value={settings.email}
          onToggle={() => toggleSwitch("email")}
        />
        <NotificationRow
          icon={<MessageCircle size={20} color="#3B82F6" />}
          iconBg="#FFF"
          title="SMS Notifications"
          sub="Receive text message alerts"
          value={settings.sms}
          onToggle={() => toggleSwitch("sms")}
        />

        <View style={{ height: 40 }} />
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
    marginTop: 8,
    marginBottom: 20,
  },

  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  rowContent: { flex: 1, marginLeft: 16, marginRight: 8 },
  rowSub: { marginTop: 4 },
});

export default NotificationsScreen;
