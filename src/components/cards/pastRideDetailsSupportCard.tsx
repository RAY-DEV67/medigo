import { Image, Text, View } from "react-native";
import useTheme from "../../hooks/useThemes";
import { commonStyles } from "../../styles/commonStyles";
import { FONT_SIZES } from "../../constants/sizes";

interface RideCardProps {
  status: string;
  price: string;
  destination: string;
  date: string;
  time: string;
}

export default function PastRideDetailsSupportCard({
  status,
  price,
  destination,
  date,
  time,
}: RideCardProps) {
  const { colors } = useTheme();
  const commonStyling = commonStyles(colors);
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: colors.highlightBlue50,
        borderWidth: 1,
        borderColor: colors.highlightBlue150,
        borderRadius: 8,
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        columnGap: 8,
      }}
    >
      <Image
        source={require("../../../assets/images/whiteBgCar.png")}
        style={{
          width: 60,
          height: 60,
        }}
      />
      <View>
        <Text
          style={[
            commonStyling.subtitle,
            {
              color: colors.spotBlue,
            },
          ]}
        >
          {destination}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 4,
            marginTop: -2,
          }}
        >
          <Text
            style={[
              commonStyling.subtitle,
              {
                color: colors.spotBlue,
                fontSize: FONT_SIZES.SMALL,
              },
            ]}
          >
            {date}
          </Text>
          <Text style={{ fontSize: 22, color: colors.highlightBlue150 }}>
            •
          </Text>
          <Text
            style={[
              commonStyling.subtitle,
              {
                color: colors.spotBlue,
                fontSize: FONT_SIZES.SMALL,
              },
            ]}
          >
            {time}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 4,
            marginTop: -8,
          }}
        >
          <Text
            style={[
              commonStyling.subtitle,
              {
                color: colors.spotBlue,
                fontSize: FONT_SIZES.SMALL,
              },
            ]}
          >
            {price}
          </Text>
          <Text style={{ fontSize: 22, color: colors.highlightBlue150 }}>
            •
          </Text>
          <Text
            style={[
              commonStyling.subtitle,
              {
                color: colors.spotBlue,
                fontSize: FONT_SIZES.SMALL,
              },
            ]}
          >
            {status}
          </Text>
        </View>
      </View>
    </View>
  );
}
