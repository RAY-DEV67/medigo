import { memo } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { FONT_SIZES } from "../../constants/sizes";

interface SuggestionItem {
  id: string;
  title: string;
  subtitle: string;
  image: any;
  onPress: () => void;
}

interface SuggestionCardProps {
  item: SuggestionItem;
  colors: any;
  commonStyling: any;
  onPress: () => void;
}
const { width } = Dimensions.get("window");

const SuggestionCard = memo<SuggestionCardProps>(
  ({ item, colors, commonStyling, onPress }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.lightGray }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={item.image}
        style={styles.cardImage}
        resizeMode="contain"
      />
      <Text
        style={[
          commonStyling.subtitle,
          {
            color: colors.titleText,
            width: "100%",
            textAlign: "center",
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
            fontSize: FONT_SIZES.SMALL,
            width: "100%",
            textAlign: "center",
          },
        ]}
      >
        {item.subtitle}
      </Text>
    </TouchableOpacity>
  )
);

export default SuggestionCard;

/** --- Styles --- */
const CARD_WIDTH = width * 0.28;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: "center",
  },
  cardImage: {
    width: 110,
    height: 60,
    marginBottom: 8,
  },
});
