import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useTheme from "../../hooks/useThemes";
import { commonStyles } from "../../styles/commonStyles";

const GridCard = ({ title, icon, selected, onPress }: any) => {
  const { colors } = useTheme();
  const commonStyling = commonStyles(colors);
  return (
    <TouchableOpacity
      style={[
        styles.gridCard,
        {
          borderColor: selected
            ? colors.primaryColor
            : colors.lightPrimaryBlueBorder,
        },
      ]}
      onPress={onPress}
    >
      <View style={styles.gridIcon}>{icon}</View>
      <Text
        style={[
          commonStyling.title,
          {
            fontSize: 14,
            fontFamily: "Bold",
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: -150,
  },
  gridCard: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  gridIcon: { marginBottom: 12 },
});

export default GridCard;
