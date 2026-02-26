import { memo } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { FONT_SIZES } from "../../constants/sizes";

interface RecentHappeningsItem {
  id: string;
  title: string;
  subtitle: string;
  image: any;
  onPress: () => void;
}

interface RecentHappeningsCardProps {
  item: RecentHappeningsItem;
  colors: any;
  commonStyling: any;
  onPress: () => void;
}
const { width } = Dimensions.get("window");

const RecentHappeningsCard = memo<RecentHappeningsCardProps>(
  ({ item, colors, commonStyling, onPress }) => (
    <TouchableOpacity
      style={[styles.card]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={item.image}
        style={[
          styles.cardImage,
          {
            borderWidth: 1,
            borderRadius: 12,
            borderColor: colors.lightGray,
          },
        ]}
      />
      <Text
        style={[
          commonStyling.subtitle,
          {
            color: colors.titleText,
            width: "100%",
          },
        ]}
      >
        {item.title}
      </Text>
      <Text
        style={[
          commonStyling.subtitle,
          {
            color: colors.inputText,
            fontSize: FONT_SIZES.BODY,
            width: "100%",
          },
        ]}
      >
        {item.subtitle}
      </Text>
    </TouchableOpacity>
  )
);

export default RecentHappeningsCard;

/** --- Styles --- */
const CARD_WIDTH = width * 0.6;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 18,
    alignItems: "center",
  },
  cardImage: {
    width: CARD_WIDTH,
    height: 150,
    marginBottom: 8,
  },
});
