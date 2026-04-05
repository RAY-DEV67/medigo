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
import {
  X,
  Clock,
  Star,
  AlertCircle,
  Headphones,
  Phone,
  Share2,
  Info,
  CheckCircle,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useTheme from "../../../hooks/useThemes";
import { commonStyles } from "../../../styles/commonStyles";
import { FONT_SIZES } from "../../../constants/sizes";
import { useRideDetail } from "../../../hooks/queries/useRideDetails";
import { formatHumanReadableDate } from "../../../utils/formatHumanReadableDate";
import { RideDetailsSkeleton } from "../../../components/skelentonAnimation/rideDetailsSkelenton";

const RideDetails = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { colors, theme } = useTheme();
  const commonStyling = commonStyles(colors);
  const route = useRoute<any>();
  const { id } = route.params;
  const { data, isLoading } = useRideDetail(id);

  if (isLoading || !data) {
    return <RideDetailsSkeleton />;
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

      {/* Modal Header */}
      <View style={styles.header}>
        <View>
          <Text
            style={[
              commonStyling.title,
              {
                fontSize: FONT_SIZES.TITLE2,
                fontFamily: "Bold",
              },
            ]}
          >
            Ride Details
          </Text>
          <View style={styles.headerSubRow}>
            <Clock size={14} color="#3B82F6" />
            <Text
              style={[
                styles.tripId,
                commonStyling.subtitle,
                {
                  color: colors.textSecondary,
                  fontSize: FONT_SIZES.BODY,
                },
              ]}
            >
              {formatHumanReadableDate(data.data.scheduled_at)}
            </Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>Confirmed</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <X color={colors.textSecondary} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Route Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.homelightPrimaryBlue50,
              borderColor: colors.lightPrimaryBlueBorder,
            },
          ]}
        >
          <Text
            style={[
              styles.sectionLabel,
              commonStyling.title,
              {
                fontSize: 14,
                fontFamily: "Bold",
              },
            ]}
          >
            Route
          </Text>
          <View style={styles.routeContainer}>
            <View style={styles.timeline}>
              <View style={styles.dotBlue} />
              <View style={styles.line} />
              <View style={styles.dotBlue} />
            </View>
            <View style={styles.addressContainer}>
              <Text
                style={[
                  commonStyling.subtitle,
                  {
                    fontSize: 11,
                  },
                ]}
              >
                Pickup
              </Text>
              <Text
                style={[
                  styles.addrText,
                  commonStyling.title,
                  {
                    fontSize: 14,
                  },
                ]}
              >
                {data?.data.pickup_address}
              </Text>
              <Text
                style={[
                  commonStyling.subtitle,
                  {
                    fontSize: 11,
                    marginTop: 16,
                  },
                ]}
              >
                Destination
              </Text>
              <Text
                style={[
                  styles.addrText,
                  commonStyling.title,
                  {
                    fontSize: 14,
                  },
                ]}
              >
                {data?.data.destination_address}
              </Text>
            </View>
          </View>
        </View>

        {/* Driver Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.homelightPrimaryBlue50,
              borderColor: colors.lightPrimaryBlueBorder,
            },
          ]}
        >
          <Text
            style={[
              styles.sectionLabel,
              commonStyling.title,
              {
                fontSize: 14,
                fontFamily: "Bold",
              },
            ]}
          >
            Your Driver
          </Text>
          <View style={styles.driverProfileRow}>
            <Image
              source={{ uri: "https://i.pravatar.cc/100?u=john" }}
              style={styles.driverAvatar}
            />
            <View style={styles.driverTextContainer}>
              <View style={styles.rowBetween}>
                <View style={styles.rowCenter}>
                  <Text
                    style={[
                      commonStyling.title,
                      {
                        fontSize: 15,
                        fontFamily: "Bold",
                      },
                    ]}
                  >
                    John Smith
                  </Text>
                  <CheckCircle
                    size={14}
                    color="#3B82F6"
                    style={{ marginLeft: 4 }}
                  />
                </View>
                <View style={styles.rowCenter}>
                  <Text
                    style={[
                      commonStyling.subtitle,
                      {
                        fontSize: 18,
                        fontFamily: "Bold",
                      },
                    ]}
                  >
                    4.9
                  </Text>
                  <Star
                    size={14}
                    color="#F59E0B"
                    fill="#F59E0B"
                    style={{ marginLeft: 2 }}
                  />
                </View>
              </View>
              <Text
                style={[
                  commonStyling.subtitle,
                  {
                    fontSize: 14,
                    marginTop: 2,
                  },
                ]}
              >
                Verified Driver
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.vehicleBox,
              {
                backgroundColor: colors.cardBackground,
              },
            ]}
          >
            <Text
              style={[
                commonStyling.subtitle,
                {
                  fontSize: 14,
                  marginTop: 2,
                },
              ]}
            >
              Vehicle
            </Text>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 14,
                  marginTop: 2,
                },
              ]}
            >
              Toyota Camry • Blue
            </Text>
          </View>
        </View>

        {/* Estimated Pickup Card */}
        <View
          style={[
            styles.card,
            styles.rowBetween,
            {
              backgroundColor: colors.homelightPrimaryBlue50,
              borderColor: colors.lightPrimaryBlueBorder,
            },
          ]}
        >
          <View>
            <Text
              style={[
                commonStyling.subtitle,
                {
                  fontSize: 11,
                },
              ]}
            >
              Estimated Pickup
            </Text>
            <Text
              style={[
                styles.etaTextLarge,
                commonStyling.title,
                {
                  fontSize: 18,
                  fontFamily: "Bold",
                },
              ]}
            >
              1h 20m
            </Text>
          </View>
          <View style={styles.iconCircleLightBlue}>
            <Clock size={24} color="#3B82F6" />
          </View>
        </View>

        {/* Fare Details Card */}
        <View
          style={[
            styles.card,

            {
              backgroundColor: colors.homelightPrimaryBlue50,
              borderColor: colors.lightPrimaryBlueBorder,
            },
          ]}
        >
          <Text
            style={[
              styles.sectionLabel,
              commonStyling.title,
              {
                fontSize: 14,
                fontFamily: "Bold",
              },
            ]}
          >
            Fare Details
          </Text>
          <FareRow label="Base fare" value="$37.00" />
          <FareRow label="Service fee" value="$5.00" />
          <FareRow label="Medical support" value="$3.00" />
          <View style={styles.fareDivider} />
          <View style={styles.rowBetween}>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 15,
                  fontFamily: "Bold",
                },
              ]}
            >
              Total
            </Text>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 16,
                  fontFamily: "Bold",
                  color: colors.primaryColor,
                },
              ]}
            >
              $45.00
            </Text>
          </View>
          <View style={styles.paymentRow}>
            <Image
              source={{ uri: "https://img.icons8.com/color/48/visa.png" }}
              style={styles.paymentIcon}
            />
            <Text
              style={[
                commonStyling.subtitle,
                {
                  fontSize: 13,
                  fontFamily: "Bold",
                },
              ]}
            >
              Visa •••• 4242
            </Text>
          </View>
        </View>

        {/* Cancellation Policy Warning */}
        <View style={styles.policyCard}>
          <AlertCircle size={20} color="#F59E0B" />
          <View style={styles.policyTextContainer}>
            <Text style={styles.policyTitle}>Cancellation Policy</Text>
            <Text style={styles.policySub}>
              Free cancellation up to 1 hour before pickup. Late cancellations
              may incur a $10 fee.
            </Text>
          </View>
        </View>

        {/* Need Assistance Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.homelightPrimaryBlue50,
              borderColor: colors.lightPrimaryBlueBorder,
            },
          ]}
        >
          <Text
            style={[
              styles.sectionLabel,
              commonStyling.title,
              {
                fontSize: 14,
                fontFamily: "Bold",
              },
            ]}
          >
            Need Assistance?
          </Text>
          <AssistanceRow
            icon={<Headphones size={20} color="#3B82F6" />}
            title="24/7 Support"
            sub="Get help anytime"
          />
          <AssistanceRow
            icon={<Info size={20} color="#3B82F6" />}
            title="Emergency Contact"
            sub="Share trip details"
          />
        </View>

        <TouchableOpacity style={styles.contactBtn}>
          <Phone size={20} color="#FFF" />
          <Text style={styles.contactBtnText}>Contact Driver</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareBtn}>
          <Share2 size={20} color="#3B82F6" />
          <Text style={styles.shareBtnText}>Share Trip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelLink}>
          <Text style={styles.cancelLinkText}>Cancel Ride</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Reusable Sub-components ---
const FareRow = ({ label, value }: any) => {
  const { colors } = useTheme();
  const commonStyling = commonStyles(colors);

  return (
    <View style={[styles.rowBetween, { marginBottom: 10 }]}>
      <Text
        style={[
          commonStyling.subtitle,
          {
            fontSize: 13,
          },
        ]}
      >
        {label}
      </Text>
      <Text
        style={[
          commonStyling.title,
          {
            fontSize: 13,
            fontFamily: "Bold",
          },
        ]}
      >
        {value}
      </Text>
    </View>
  );
};

const AssistanceRow = ({ icon, title, sub }: any) => {
  const { colors } = useTheme();
  const commonStyling = commonStyles(colors);

  return (
    <TouchableOpacity
      style={[
        styles.assistanceItem,
        {
          backgroundColor: colors.cardBackground,
        },
      ]}
    >
      <View style={styles.iconCircleGray}>{icon}</View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text
          style={[
            commonStyling.title,
            {
              fontSize: 14,
            },
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            commonStyling.subtitle,
            {
              fontSize: 12,
              fontFamily: "Medium",
            },
          ]}
        >
          {sub}
        </Text>
      </View>
      <X
        size={16}
        color="#94A3B8"
        style={{ transform: [{ rotate: "45deg" }] }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
  },
  headerTitle: { fontSize: 20, fontWeight: "800", color: "#1E293B" },
  headerSubRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  headerTimeText: { fontSize: 13, color: "#64748B", marginLeft: 6 },
  statusBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 10,
  },
  statusBadgeText: { color: "#10B981", fontSize: 11, fontWeight: "700" },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  card: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  sectionLabel: {
    marginBottom: 16,
  },

  routeContainer: { flexDirection: "row" },
  timeline: { width: 20, alignItems: "center", marginTop: 5 },
  dotBlue: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3B82F6",
  },
  dotBlueDark: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1E293B",
  },
  line: { width: 1, flex: 1, backgroundColor: "#F1F5F9", marginVertical: 4 },
  addressContainer: { flex: 1, marginLeft: 12 },
  addrText: { marginTop: 2 },

  driverProfileRow: { flexDirection: "row", alignItems: "center" },
  driverAvatar: { width: 50, height: 50, borderRadius: 25 },
  driverTextContainer: { flex: 1, marginLeft: 12 },

  vehicleBox: {
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
  },
  vehicleLabel: { fontSize: 11, color: "#94A3B8" },
  vehicleText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 2,
  },

  etaTextLarge: {
    marginTop: 4,
  },
  iconCircleLightBlue: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },

  fareLabel: { fontSize: 14, color: "#64748B" },
  fareValue: { fontSize: 14, fontWeight: "700", color: "#1E293B" },
  fareDivider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 12 },
  totalLabel: { fontSize: 16, fontWeight: "800", color: "#1E293B" },
  totalValue: { fontSize: 20, fontWeight: "800", color: "#3B82F6" },
  paymentRow: { flexDirection: "row", alignItems: "center", marginTop: 16 },
  paymentIcon: { width: 32, height: 20, resizeMode: "contain" },
  paymentText: { fontSize: 14, color: "#64748B", marginLeft: 8 },

  policyCard: {
    flexDirection: "row",
    backgroundColor: "#FFFBEB",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: "flex-start",
  },
  policyTextContainer: { flex: 1, marginLeft: 12 },
  policyTitle: { fontSize: 13, fontWeight: "800", color: "#92400E" },
  policySub: { fontSize: 12, color: "#B45309", marginTop: 4, lineHeight: 18 },

  assistanceItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  iconCircleGray: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  assistanceSub: { fontSize: 12, color: "#64748B" },

  contactBtn: {
    backgroundColor: "#3B82F6",
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
  contactBtnText: { color: "#FFF", fontSize: 16, fontWeight: "800" },
  shareBtn: {
    backgroundColor: "#EFF6FF",
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    gap: 10,
  },
  shareBtnText: { color: "#3B82F6", fontSize: 16, fontWeight: "800" },
  cancelLink: { marginTop: 24, alignItems: "center", marginBottom: 20 },
  cancelLinkText: { color: "#EF4444", fontWeight: "800", fontSize: 15 },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowCenter: { flexDirection: "row", alignItems: "center" },

  tripId: { marginTop: 2, marginLeft: 4 },
});

export default RideDetails;
