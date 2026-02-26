import React, { ReactNode } from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import useTheme from "../../hooks/useThemes";
import { commonStyles } from "../../styles/commonStyles";
import { FONT_SIZES } from "../../constants/sizes";

type BannerProps = {
  icon?: ReactNode;
  title?: string;
  subtitle: string;
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
};

const Banner: React.FC<BannerProps> = ({
  icon,
  title,
  subtitle,
  backgroundColor,
  titleColor,
  subtitleColor,
}) => {
  const { colors } = useTheme();
  const commonStyling = commonStyles(colors);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Icon */}
      <View>{icon}</View>

      {/* Text */}
      <View style={styles.textWrapper}>
        {title && (
          <Text
            style={[
              commonStyling.title,
              { color: titleColor, fontSize: FONT_SIZES.SUBTITLE },
            ]}
          >
            {title}
          </Text>
        )}

        <Text
          style={[
            commonStyling.subtitle,
            {
              color: subtitleColor,
              fontSize: FONT_SIZES.BODY,
              marginTop: 4,
            },
          ]}
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
    gap: 12,
    marginTop: 16,
  } as ViewStyle,
  textWrapper: {
    flex: 1,
  } as ViewStyle,
});
