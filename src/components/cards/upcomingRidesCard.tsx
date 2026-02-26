import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import useTheme from "../../hooks/useThemes";
import { commonStyles } from "../../styles/commonStyles";
import Buttons from "../buttons/buttons";
import RideInformation from "../reuseables/rideInformation";
import { formatTripDate } from "../../utils/formatTripDate";
import { formatTripTime } from "../../utils/formatTripTime";
import { FONT_SIZES } from "../../constants/sizes";

interface UpcomingRideCardProps {
  image: any;
  category: string;
  price: string;
  riders: number;
  destination: string;
  date: string;
  onPress: () => void;
}

function UpcomingRidesCard({
  image,
  category,
  price,
  riders,
  destination,
  date,
  onPress,
}: UpcomingRideCardProps) {
  const { colors } = useTheme();
  const commonStyling = commonStyles(colors);

  return (
    <View style={[styles.card, { backgroundColor: colors.lightGray }]}>
      <RideInformation
        image={image}
        category={category}
        price={price}
        riders={riders}
      />
      <View style={styles.footer}>
        <View style={styles.infoContainer}>
          <Text style={[commonStyling.subtitle, { color: colors.titleText }]}>
            {destination}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 4,
            }}
          >
            <Text style={[styles.dateText, { color: colors.inputText }]}>
              {formatTripDate(date)}
            </Text>
            <View style={[styles.dot, { backgroundColor: colors.gray }]} />
            <Text style={[styles.dateText, { color: colors.inputText }]}>
              {formatTripTime(date)}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Buttons title="View" type="primary" onPress={onPress} height={35} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    marginRight: 8,
  },
  buttonContainer: {
    width: "30%",
  },
  dateText: {
    fontSize: FONT_SIZES.SMALL,
    fontFamily: "Regular",
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});

export default memo(UpcomingRidesCard);
