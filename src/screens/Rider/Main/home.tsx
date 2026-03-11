import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bell,
  MapPin,
  Search,
  Calendar,
  Plus,
  Headphones,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const RiderHomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header Profile Section */}
          <View style={styles.header}>
            <View style={styles.profileInfo}>
              <Image
                source={{ uri: "https://i.pravatar.cc/150?u=sarah" }}
                style={styles.avatar}
              />
              <View style={styles.greetingBox}>
                <Text style={styles.greetingText}>Good afternoon,</Text>
                <Text style={styles.userName}>Sarah</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.notificationBtn}
              onPress={() => {
                navigation.navigate("RiderNotificationStack");
              }}
            >
              <Bell color="#1A1C1E" size={24} />
              <View style={styles.notifBadge} />
            </TouchableOpacity>
          </View>

          {/* Quick Book Card */}
          <View style={styles.mainCard}>
            <Text style={styles.sectionTitle}>Quick Book a Ride</Text>

            <View style={styles.inputWrapper}>
              <View style={styles.locationRow}>
                <View style={styles.iconCircleBlue}>
                  <MapPin color="#3B82F6" size={18} />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.labelSmall}>Pickup Location</Text>
                  <Text style={styles.locationText}>2847 Maple Avenue</Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.searchBox}>
                <Search color="#94A3B8" size={20} />
                <TextInput
                  placeholder="Where to?"
                  style={styles.textInput}
                  placeholderTextColor="#94A3B8"
                />
              </View>

              <TouchableOpacity style={styles.scheduleBox}>
                <View style={styles.rowCenter}>
                  <Calendar color="#3B82F6" size={20} />
                  <Text style={styles.scheduleText}>Schedule for later</Text>
                </View>
                <Plus color="#94A3B8" size={18} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.bookNowBtn}>
                <Text style={styles.bookNowText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Upcoming Rides Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Rides</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.emptyStateCard}>
            <Text style={styles.emptyTitle}>No Upcoming Rides</Text>
            <Text style={styles.emptySub}>
              You do not have any upcoming ride yet.
            </Text>
            <TouchableOpacity style={styles.emptyAction}>
              <Plus color="#3B82F6" size={16} />
              <Text style={styles.emptyActionText}>Book Ride</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.supportFloat}>
              <Headphones color="#3B82F6" size={24} />
            </TouchableOpacity>
          </View>

          {/* Saved Locations Section */}
          <Text style={styles.sectionTitle}>Saved Locations</Text>
          <View style={styles.emptyStateCard}>
            <Text style={styles.emptyTitle}>No Saved Location</Text>
            <Text style={styles.emptySub}>
              You do not have any saved location yet.
            </Text>
            <TouchableOpacity
              style={styles.emptyAction}
              onPress={() => {
                navigation.navigate("RiderProfileContentsStack", {
                  screen: "AddLocationScreen",
                });
              }}
            >
              <Plus color="#3B82F6" size={16} />
              <Text style={styles.emptyActionText}>Add Location</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { padding: 20, paddingBottom: 120 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  profileInfo: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  greetingBox: { marginLeft: 12 },
  greetingText: { fontSize: 13, color: "#64748B" },
  userName: { fontSize: 18, fontWeight: "800", color: "#1E293B" },
  notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  notifBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
    borderWidth: 1,
    borderColor: "#FFF",
  },

  mainCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 16,
  },
  inputWrapper: { gap: 12 },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
  },
  iconCircleBlue: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  labelSmall: { fontSize: 11, color: "#64748B" },
  locationText: { fontSize: 14, fontWeight: "600", color: "#1E293B" },
  editText: { color: "#3B82F6", fontSize: 12, fontWeight: "600" },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
  },
  textInput: { flex: 1, marginLeft: 12, fontSize: 15 },
  scheduleBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
  },
  rowCenter: { flexDirection: "row", alignItems: "center", gap: 12 },
  scheduleText: { fontSize: 14, color: "#64748B" },
  bookNowBtn: {
    backgroundColor: "#93C5FD",
    padding: 16,
    borderRadius: 24,
    alignItems: "center",
    marginTop: 8,
  },
  bookNowText: { color: "#FFF", fontWeight: "700", fontSize: 16 },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  viewAllText: { color: "#3B82F6", fontSize: 13, fontWeight: "600" },
  emptyStateCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  emptyTitle: { fontSize: 15, fontWeight: "700", color: "#1E293B" },
  emptySub: {
    fontSize: 13,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 12,
  },
  emptyAction: { flexDirection: "row", alignItems: "center", gap: 6 },
  emptyActionText: { color: "#3B82F6", fontSize: 14, fontWeight: "600" },
  supportFloat: {
    position: "absolute",
    bottom: -20,
    right: 10,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});

export default RiderHomeScreen;
