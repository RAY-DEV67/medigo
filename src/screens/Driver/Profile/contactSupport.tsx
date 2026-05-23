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
  MessageCircle,
  Phone,
  Mail,
  Clock,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "../../../hooks/useThemes";
import { commonStyles } from "../../../styles/commonStyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "../../../components/reuseables/header";
import Buttons from "../../../components/buttons/buttons";

const ContactSupport = () => {
  const { colors, theme } = useTheme();
  const commonStyling = commonStyles(colors);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const supportChannels = [
    {
      id: 1,
      title: "Live Chat",
      description: "Chat with our support team",
      availability: "Available 24/7",
      icon: <MessageCircle size={22} color={colors.primaryColor} />,
    },
    {
      id: 2,
      title: "Phone Support",
      description: "Call our driver support line",
      availability: "Mon-Sun, 6AM-10PM",
      icon: <Phone size={22} color={colors.primaryColor} />,
    },
    {
      id: 3,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "Response within 24 hours",
      icon: <Mail size={22} color={colors.primaryColor} />,
    },
  ];

  const recentTickets = [
    {
      id: "t1",
      title: "Payment Issue",
      date: "Feb 26, 2026",
      status: "Resolved",
      statusColor: "#10B981",
      statusBg: "#ECFDF5",
    },
    {
      id: "t2",
      title: "Vehicle Document Update",
      date: "Feb 25, 2026",
      status: "In Progress",
      statusColor: "#3B82F6",
      statusBg: "#EFF6FF",
    },
  ];

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

      <Header title="Contact Support" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
          Get in Touch
        </Text>

        {/* Support Channels */}
        {supportChannels.map((channel) => (
          <TouchableOpacity
            key={channel.id}
            style={[
              styles.channelCard,
              {
                borderColor: colors.lightPrimaryBlueBorder,
              },
            ]}
          >
            <View
              style={[
                styles.iconCircle,
                {
                  backgroundColor: colors.surfaceBrand,
                },
              ]}
            >
              {channel.icon}
            </View>
            <View style={styles.channelDetails}>
              <Text
                style={[
                  commonStyling.title,
                  {
                    fontSize: 15,
                    fontFamily: "Bold",
                  },
                ]}
              >
                {channel.title}
              </Text>
              <Text
                style={[
                  styles.channelDescription,
                  commonStyling.subtitle,
                  {
                    fontSize: 14,
                    fontFamily: "Medium",
                  },
                ]}
              >
                {channel.description}
              </Text>
              <View style={styles.availabilityRow}>
                <Clock size={14} color={colors.subTitleText} />
                <Text
                  style={[
                    commonStyling.subtitle,
                    {
                      fontSize: 12,
                      fontFamily: "Medium",
                    },
                  ]}
                >
                  {channel.availability}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <Text
          style={[
            styles.sectionLabel,
            commonStyling.title,
            {
              fontSize: 18,
              fontFamily: "Bold",
              marginTop: 32,
            },
          ]}
        >
          Recent Tickets
        </Text>

        {/* Tickets List */}
        {recentTickets.map((ticket) => (
          <TouchableOpacity
            key={ticket.id}
            style={[
              styles.ticketCard,
              {
                borderColor: colors.lightPrimaryBlueBorder,
              },
            ]}
          >
            <View style={styles.ticketMain}>
              <View>
                <Text
                  style={[
                    commonStyling.title,
                    {
                      fontSize: 15,
                      fontFamily: "Bold",
                    },
                  ]}
                >
                  {ticket.title}
                </Text>
                <Text
                  style={[
                    styles.ticketDate,
                    commonStyling.subtitle,
                    {
                      fontSize: 12,
                      fontFamily: "Medium",
                    },
                  ]}
                >
                  {ticket.date}
                </Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: ticket.statusBg },
                ]}
              >
                <Text
                  style={[styles.statusText, { color: ticket.statusColor }]}
                >
                  {ticket.status}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Emergency Support Section */}
        <View
          style={[
            styles.emergencyBox,
            {
              backgroundColor: colors.surfaceBrand,
            },
          ]}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Bold",
              color: colors.primaryColor,
            }}
          >
            Need Immediate Help?
          </Text>
          <Text
            style={[
              styles.emergencySub,
              {
                fontSize: 12,
                color: colors.primaryColor,
                fontFamily: "Regular",
                marginBottom: 16,
              },
            ]}
          >
            For urgent issues during a ride, use the emergency button in the
            active ride screen.
          </Text>
          <View
            style={{
              width: "100%",
            }}
          >
            <Buttons
              title="Emergency Support"
              onPress={() => {
                navigation.navigate("RiderProfileContentsStack", {
                  screen: "LiveChatScreen",
                });
              }}
            />
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
    marginBottom: 16,
  },

  channelCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  channelDetails: { flex: 1, marginLeft: 16 },
  channelDescription: {
    marginTop: 2,
  },
  availabilityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },

  ticketCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  ticketMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ticketDate: {
    marginTop: 4,
  },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: "800" },

  emergencyBox: {
    marginTop: 24,
    padding: 24,
    borderRadius: 20,
  },
  emergencySub: {
    marginTop: 8,
    lineHeight: 20,
  },
  emergencyButton: {
    backgroundColor: "#3B82F6",
    width: "100%",
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  emergencyButtonText: { color: "#FFF", fontSize: 15, fontWeight: "800" },
});

export default ContactSupport;
