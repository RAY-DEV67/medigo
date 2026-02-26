import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import useTheme from "../../hooks/useThemes";
import { commonStyles } from "../../styles/commonStyles";

type HeaderProps = {
  title: string;
  icon: React.ReactNode;
  rightText?: React.ReactNode;
};

export default function Header({ title, icon, rightText }: HeaderProps) {
  const { colors } = useTheme();
  const commonStyling = commonStyles(colors);

  return (
    <View style={styles.container}>
      <View>{icon}</View>

      <Text
        style={[
          commonStyling.title,
          styles.title,
          {
            color: colors.titleText,
            marginTop: -4,
            width: rightText ? "70%" : "85%",
            marginLeft: -16,
          },
        ]}
      >
        {title}
      </Text>
      <View>{rightText}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    position: "relative",
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "center",
  },

  title: {
    textAlign: "center",
  },
});
