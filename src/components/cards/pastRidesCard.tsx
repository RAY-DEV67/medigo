import React, { memo } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import useTheme from "../../hooks/useThemes";
import { commonStyles } from "../../styles/commonStyles";
import Buttons from "../buttons/buttons";
import { formatHumanReadableDate } from "../../utils/formatHumanReadableDate";
import { formatPrice } from "../../utils/formatPrice";
import { FONT_SIZES } from "../../constants/sizes";

interface PastRideCardProps {
  image: any;
  status: string;
  price: string;
  destination: string;
  date: string;
  onPress: () => void;
}

const getStatusStyles = (status: string, colors: any) => {
  const statusKey = status?.toUpperCase();

  // Define the type for the status objects
  interface StatusStyle {
    text: string;
    bg: string;
  }

  const map: Record<string, StatusStyle> = {
    CANCELLED: {
      text: colors.cancelledRed,
      bg: colors.highlightRed50,
    },
    COMPLETED: {
      text: colors.krGreen,
      bg: colors.highlightGreen,
    },
    DEFAULT: {
      text: colors.titleText,
      bg: colors.stroke,
    },
  };

  return map[statusKey] || map.DEFAULT;
};

function PastRidesCard({
  image,
  status,
  price,
  destination,
  date,
  onPress,
}: PastRideCardProps) {
  const { colors } = useTheme();
  const commonStyling = commonStyles(colors);
  const statusStyle = getStatusStyles(status, colors);

  console.log(destination);

  return (
    <View
      style={[
        {
          backgroundColor: colors.lightGray,
          padding: 20,
          borderRadius: 16,
          marginBottom: 16,
        },
      ]}
    >
      <View style={[styles.card]}>
        <View
          style={[
            {
              backgroundColor: "#000000",
              width: 54,
              height: 62,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Image
            source={require("../../../assets/images/soloCar.png")}
            style={styles.carImage}
          />
        </View>

        <View style={styles.infoSection}>
          <View style={styles.textContainer}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={[
                commonStyling.subtitle,
                {
                  color: colors.titleText,
                  textAlign: "right",
                },
              ]}
            >
              {destination}
            </Text>
            <Text style={[styles.dateText, { color: colors.inputText }]}>
              {formatHumanReadableDate(date)}
            </Text>

            <View style={styles.metaRow}>
              <Text style={[styles.metaText, { color: colors.inputText }]}>
                {formatPrice(price)}
              </Text>
              <View
                style={[commonStyling.dot, { backgroundColor: colors.gray }]}
              />
              <Text
                style={[
                  styles.metaText,
                  {
                    color: statusStyle.text,
                    backgroundColor: statusStyle.bg,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    borderRadius: 50,
                    overflow: "hidden",
                    textAlign: "center",
                    fontWeight: "600",
                    textTransform: "capitalize",
                  },
                ]}
              >
                {status}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <Buttons title="View" type="primary" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  carImage: {
    width: 48,
    height: 54,
    resizeMode: "contain",
    borderRadius: 10,
  },
  infoSection: {
    flex: 1,
    alignItems: "flex-end",
  },
  textContainer: {
    rowGap: 4,
    alignItems: "flex-end",
    marginLeft: 16,
  },
  dateText: {
    fontSize: FONT_SIZES.BODY,
    fontFamily: "Regular",
    marginVertical: 1,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
  },
  metaText: {
    fontSize: FONT_SIZES.BODY,
    fontFamily: "Regular",
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});

export default memo(PastRidesCard);
