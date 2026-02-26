import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import useTheme from "../../hooks/useThemes";
import { commonStyles } from "../../styles/commonStyles";
import { FONT_SIZES } from "../../constants/sizes";

export interface SuggestionItemProps {
  id: string | number;
  title: string;
  subtitle: string;
  distance?: string;
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  onPress?: () => void;
}

export default function SuggestionItem({
  id,
  title,
  subtitle,
  distance,
  icon,
  leftIcon,
  onPress,
}: SuggestionItemProps) {
  const { colors } = useTheme();
  const commonStyling = commonStyles(colors);

  return (
    <TouchableOpacity
      key={id}
      onPress={onPress}
      style={[
        styles.wrapper,
        {
          backgroundColor: colors.surfacePrimary,
          borderBottomColor: colors.stroke,
        },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.leftSection}>
          {icon && <View>{icon}</View>}

          <View style={{ flex: 1 }}>
            <Text
              numberOfLines={1}
              style={[
                commonStyling.title,
                {
                  fontSize: FONT_SIZES.BUTTON,
                  fontFamily: "Regular",
                },
              ]}
            >
              {title}
            </Text>

            <Text
              style={[
                commonStyling.subtitle,
                {
                  fontSize: FONT_SIZES.BODY,
                  color: colors.inputText,
                  marginTop: 4,
                },
              ]}
            >
              {subtitle}
            </Text>
          </View>
        </View>

        {/* Right Section Content */}
        <View style={styles.rightSection}>
          {leftIcon && <View>{leftIcon}</View>}
          {distance && (
            <Text
              style={[
                commonStyling.subtitle,
                { fontSize: FONT_SIZES.BODY, color: colors.inputText },
              ]}
            >
              {distance}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  leftSection: {
    flex: 1, // Allow this section to grow
    flexDirection: "row",
    alignItems: "center",
    columnGap: 16,
    paddingRight: 8, // Space before distance/right icon
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
});
