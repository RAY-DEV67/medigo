import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import BackArrow from "../../../assets/icons/backArrow";
import useTheme from "../../hooks/useThemes";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FONT_SIZES } from "../../constants/sizes";

const BackButton: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={30}>
      <View style={styles.backButtonContainer}>
        <BackArrow />
        <Text
          style={{
            fontSize: FONT_SIZES.SUBTITLE,
            color: colors.titleText,
            fontFamily: "Regular",
          }}
        >
          Back
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
});
