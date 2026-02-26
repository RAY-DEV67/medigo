import { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CloseIcon from "../../../assets/icons/close";
import { FONT_SIZES } from "../../constants/sizes";

interface PromoCardProps {
  colors: any;
  commonStyling: any;
  onClose: () => void;
}

// Memoized components
const PromoCard = memo<PromoCardProps>(({ colors, commonStyling, onClose }) => (
  <View
    style={[
      styles.promoContainer,
      {
        backgroundColor: colors.highlightPurple,
        borderRadius: 12,
      },
    ]}
  >
    <View style={styles.promoTextsContainer}>
      <Image
        source={require("../../../assets/images/promoImage.png")}
        style={styles.promoImage}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text style={[commonStyling.subtitle, { color: colors.titleText }]}>
          New promo
        </Text>
        <Text
          style={[
            commonStyling.subtitle,
            styles.promoSubtitle,
            { color: colors.titleText },
          ]}
        >
          Get 20% off your first ride!
        </Text>
      </View>
    </View>

    <TouchableOpacity onPress={onClose} hitSlop={30}>
      <CloseIcon size={11} color={colors.titleText} />
    </TouchableOpacity>
  </View>
));

export default PromoCard;

const styles = StyleSheet.create({
  promoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  promoTextsContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  promoSubtitle: {
    fontSize: FONT_SIZES.SMALL,
    marginTop: 2,
  },
  promoImage: {
    width: 34,
    height: 34,
    backgroundColor: "#ffffff",
    borderRadius: 70,
  },
});
