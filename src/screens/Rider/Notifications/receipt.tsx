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
  X,
  FileText,
  Calendar,
  Clock,
  MapPin,
  User,
  Car,
  CreditCard,
  Share2,
  Download,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "../../../hooks/useThemes";
import { commonStyles } from "../../../styles/commonStyles";
import { FONT_SIZES } from "../../../constants/sizes";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const ReceiptScreen = () => {
  const { colors, theme } = useTheme();
  const commonStyling = commonStyles(colors);
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

      {/* Header with Close Button */}
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
            Receipt
          </Text>
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
            Trip #000001
          </Text>
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
        {/* Payment Status Badge */}
        <View style={styles.badgeContainer}>
          <View
            style={[
              styles.successBadge,
              {
                backgroundColor: colors.darkGreen,
              },
            ]}
          >
            <Text style={styles.successBadgeText}>✓ PAYMENT COMPLETE</Text>
          </View>
        </View>

        {/* TRIP DETAILS Section */}
        <SectionHeader
          icon={<FileText size={16} color="#3B82F6" />}
          title="TRIP DETAILS"
        />

        <DetailRow
          icon={<Calendar size={18} color="#64748B" />}
          label="Date"
          value="Feb 20, 2026"
        />
        <DetailRow
          icon={<Clock size={18} color="#64748B" />}
          label="Time"
          value="2:30 PM"
        />

        {/* Pickup/Destination Timeline */}
        <View style={styles.timelineRow}>
          <View style={styles.timelineGraphic}>
            <View style={styles.dotBlue} />
            <View style={styles.line} />
            <View style={styles.dotBlue} />
          </View>
          <View style={styles.addressWrapper}>
            <View>
              <Text
                style={[
                  commonStyling.subtitle,
                  {
                    fontSize: FONT_SIZES.SMALL,
                  },
                ]}
              >
                PICKUP
              </Text>
              <Text
                style={[
                  styles.addressText,
                  commonStyling.title,
                  {
                    fontSize: FONT_SIZES.SMALL,
                    fontFamily: "SemiBold",
                  },
                ]}
              >
                2847 Maple Avenue
              </Text>
            </View>
            <View style={[{ marginTop: 16 }]}>
              <Text
                style={[
                  commonStyling.subtitle,
                  {
                    fontSize: FONT_SIZES.SMALL,
                  },
                ]}
              >
                DESTINATION
              </Text>
              <Text
                style={[
                  styles.addressText,
                  commonStyling.title,
                  {
                    fontSize: FONT_SIZES.SMALL,
                    fontFamily: "SemiBold",
                  },
                ]}
              >
                Springfield General Hospital
              </Text>
            </View>
          </View>
        </View>

        <DetailRow
          icon={<User size={18} color="#64748B" />}
          label="Driver"
          value="John Smith"
        />
        <DetailRow
          icon={<Car size={18} color="#64748B" />}
          label="Service Type"
          value="Standard Ride"
        />

        <View
          style={[
            styles.sectionDivider,
            { backgroundColor: colors.lightPrimaryBlueBorder },
          ]}
        />

        {/* FARE BREAKDOWN Section */}
        <SectionHeader
          icon={<CreditCard size={16} color="#3B82F6" />}
          title="FARE BREAKDOWN"
        />

        <View
          style={[
            styles.breakdownCard,
            {
              backgroundColor: colors.surfaceElevated,
            },
          ]}
        >
          <View style={styles.fareRow}>
            <Text style={[commonStyling.subtitle]}>Base Fare</Text>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: FONT_SIZES.BODY,
                  fontFamily: "SemiBold",
                },
              ]}
            >
              $38.25
            </Text>
          </View>
          <View style={styles.fareRow}>
            <Text style={[commonStyling.subtitle]}>Service Fee</Text>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: FONT_SIZES.BODY,
                  fontFamily: "SemiBold",
                },
              ]}
            >
              $6.75
            </Text>
          </View>
          <View style={styles.totalDivider} />
          <View style={styles.fareRow}>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: FONT_SIZES.BODY,
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
                  fontSize: FONT_SIZES.TITLE,
                  color: colors.primaryColor,
                  fontFamily: "Bold",
                },
              ]}
            >
              $45.00
            </Text>
          </View>
        </View>

        {/* Payment Method Card */}
        <View
          style={[
            styles.paymentMethodCard,
            {
              backgroundColor: colors.surfaceBrand,
            },
          ]}
        >
          <View style={styles.iconBox}>
            <CreditCard color="#3B82F6" size={20} />
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.paidWithLabel}>Paid with</Text>
            <Text
              style={[
                commonStyling.title,
                {
                  color: colors.primaryColor,
                  fontSize: FONT_SIZES.BODY,
                  fontFamily: "SemiBold",
                },
              ]}
            >
              Visa •••• 4242
            </Text>
          </View>
        </View>

        <Text style={styles.footerContact}>
          Questions about this receipt? Contact support@medigo.com
        </Text>
      </ScrollView>

      {/* Action Buttons */}
      <View
        style={[
          styles.footerActions,
          {
            backgroundColor: colors.surfacePrimary,
            borderTopColor: colors.lightPrimaryBlueBorder,
          },
        ]}
      >
        <TouchableOpacity style={styles.outlineButton}>
          <Share2 color={colors.titleText} size={20} />
          <Text
            style={[
              commonStyling.title,
              {
                fontSize: FONT_SIZES.SUBTITLE,
              },
            ]}
          >
            Share
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filledButton}>
          <Download color="#FFF" size={20} />
          <Text
            style={[
              commonStyling.title,
              {
                fontSize: FONT_SIZES.SUBTITLE,
                color: "#ffffff",
              },
            ]}
          >
            Download PDF
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const SectionHeader = ({ icon, title }: any) => {
  const { colors } = useTheme();
  const commonStyling = commonStyles(colors);

  return (
    <View style={styles.sectionHeader}>
      {icon}
      <Text
        style={[
          styles.sectionHeaderText,
          commonStyling.title,
          {
            fontSize: FONT_SIZES.BODY,
            fontFamily: "SemiBold",
          },
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

const DetailRow = ({ icon, label, value }: any) => {
  const { colors } = useTheme();
  const commonStyling = commonStyles(colors);
  return (
    <View style={styles.detailRow}>
      <View>{icon}</View>
      <View style={{ marginLeft: 12 }}>
        <Text
          style={[
            styles.rowLabel,
            commonStyling.subtitle,
            {
              fontSize: FONT_SIZES.BODY,
            },
          ]}
        >
          {label}
        </Text>
        <Text
          style={[
            styles.rowValue,
            commonStyling.title,
            {
              fontSize: FONT_SIZES.BODY,
              fontFamily: "SemiBold",
            },
          ]}
        >
          {value}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 24,
    alignItems: "center",
  },
  tripId: { marginTop: 2 },
  closeButton: { padding: 8 },

  scrollContent: { paddingHorizontal: 24, paddingBottom: 120 },
  badgeContainer: { marginBottom: 32 },
  successBadge: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  successBadgeText: { color: "#10B981", fontSize: 12, fontWeight: "700" },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionHeaderText: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  detailRow: { flexDirection: "row", alignItems: "center", marginBottom: 18 },
  rowLabel: { fontSize: 12, color: "#94A3B8" },
  rowValue: { fontSize: 15, fontWeight: "700", color: "#1E293B", marginTop: 2 },

  timelineRow: { flexDirection: "row", marginBottom: 20 },
  timelineGraphic: { width: 20, alignItems: "center", marginTop: 6 },
  dotBlue: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#3B82F6" },
  line: { width: 1, flex: 1, backgroundColor: "#E2E8F0", marginVertical: 4 },
  addressWrapper: { flex: 1, marginLeft: 12 },
  addressLabel: { fontSize: 10, color: "#94A3B8", letterSpacing: 1 },
  addressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
    marginTop: 2,
  },

  sectionDivider: { height: 1, marginVertical: 24 },

  breakdownCard: { borderRadius: 16, padding: 20 },
  fareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  totalDivider: { height: 1, backgroundColor: "#E2E8F0", marginVertical: 12 },
  totalLabel: { fontSize: 18, fontWeight: "800", color: "#1E293B" },

  paymentMethodCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
  },
  iconBox: {
    width: 40,
    height: 40,
    backgroundColor: "#FFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  paidWithLabel: { fontSize: 12, color: "#3B82F6" },

  footerContact: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 24,
  },

  footerActions: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    gap: 12,
  },
  outlineButton: {
    flex: 1,
    flexDirection: "row",
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  filledButton: {
    flex: 1,
    flexDirection: "row",
    height: 56,
    borderRadius: 16,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  filledButtonText: { fontSize: 16, fontWeight: "700", color: "#FFF" },
});

export default ReceiptScreen;
