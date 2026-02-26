import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import useTheme from "../../hooks/useThemes";

const SkeletonItem = () => {
  const { colors } = useTheme();
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.7, { duration: 800 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={[styles.row, { borderBottomColor: colors.stroke }]}>
      {/* Icon Circle */}
      <Animated.View
        style={[
          styles.iconPlaceholder,
          animatedStyle,
          { backgroundColor: colors.lightGray },
        ]}
      />

      <View style={{ flex: 1, gap: 8 }}>
        {/* Title Line */}
        <Animated.View
          style={[
            styles.line,
            animatedStyle,
            { backgroundColor: colors.lightGray, width: "60%" },
          ]}
        />
        {/* Subtitle Line */}
        <Animated.View
          style={[
            styles.line,
            animatedStyle,
            { backgroundColor: colors.lightGray, width: "90%", height: 15 },
          ]}
        />
      </View>
    </View>
  );
};

export default function SuggestionSkeleton() {
  return (
    <View>
      {[1, 2, 3].map((key) => (
        <SkeletonItem key={key} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    columnGap: 16,
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  line: {
    height: 25,
    borderRadius: 4,
  },
});
