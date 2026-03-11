import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Shield,
  Info,
  Banknote,
  Gift,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

const NotificationsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft color="#1A1C1E" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.description}>
          View all notifications for your rides and account here
        </Text>
        <Text style={styles.sectionTitle}>Unread</Text>
        <NotificationItem
          icon={<Calendar color="#3B82F6" size={20} />}
          iconBg="#EFF6FF"
          title="Ride Completed"
          description="Your ride to Springfield General Hospital has been completed successfully."
          time="30 minutes ago"
          unread
          onPress={() => {
            navigation.navigate("RideCompletedDetails");
          }}
        />
        <NotificationItem
          icon={<Banknote color="#10B981" size={20} />}
          iconBg="#ECFDF5"
          title="Payment Successful"
          description="Your payment of $28.50 for the ride on March 3 has been processed."
          time="1 day ago"
          unread
          onPress={() => {
            navigation.navigate("PaymentSuccessfulNotificationDetail");
          }}
        />
        <NotificationItem
          icon={<Shield color="#8B5CF6" size={20} />}
          iconBg="#F5F3FF"
          title="Safety Feature Update"
          description="New safety features have been added to your account"
          time="3 days ago"
          unread
        />
        <Text style={styles.sectionTitle}>Today</Text>
        <NotificationItem
          icon={<Gift color="#F59E0B" size={20} />}
          iconBg="#FFFBEB"
          title="Special Offer: 20% Off!"
          description="Enjoy 20% off your next medical appointment ride. Valid until March 10."
          time="2 hours ago"
        />

        {/* Section: Previously */}
        <Text style={styles.sectionTitle}>Previously</Text>
        <NotificationItem
          icon={<Info color="#3B82F6" size={20} />}
          iconBg="#EFF6FF"
          title="Emergency Contact Updated"
          description="Your emergency contact information has been successfully updated."
          time="2 days ago"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Reusable Notification Item ---
const NotificationItem = ({
  icon,
  iconBg,
  title,
  description,
  time,
  unread,
  onPress,
}: any) => (
  <TouchableOpacity style={styles.itemWrapper} onPress={onPress}>
    <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
      {icon}
    </View>
    <View style={styles.textWrapper}>
      <View style={styles.titleRow}>
        <Text style={styles.itemTitle}>{title}</Text>
        {unread && <View style={styles.unreadDot} />}
      </View>
      <Text style={styles.itemDescription} numberOfLines={2}>
        {description}
      </Text>
      <Text style={styles.timeText}>{time}</Text>
    </View>
    <ChevronRight color="#94A3B8" size={18} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
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
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: { fontSize: 20, fontWeight: "800", color: "#1E293B" },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  description: { fontSize: 14, color: "#64748B", marginBottom: 24 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E293B",
    marginTop: 12,
    marginBottom: 16,
  },

  itemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  textWrapper: { flex: 1, marginLeft: 16, marginRight: 8 },
  titleRow: { flexDirection: "row", alignItems: "center" },
  itemTitle: { fontSize: 16, fontWeight: "700", color: "#1E293B" },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3B82F6",
    marginLeft: 8,
  },
  itemDescription: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
    lineHeight: 20,
  },
  timeText: { fontSize: 12, color: "#94A3B8", marginTop: 8 },
});

export default NotificationsScreen;
