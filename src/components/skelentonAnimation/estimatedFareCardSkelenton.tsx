import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import useTheme from "../../hooks/useThemes";

const RideCardSkeleton = () => {
  const { colors } = useTheme();
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.rideCard,
        { opacity, backgroundColor: colors.surfacePrimary },
      ]}
    >
      <View style={styles.rideInfo}>
        {/* Car Image Placeholder */}
        <View
          style={[styles.imagePlaceholder, { backgroundColor: colors.stroke }]}
        />

        <View style={styles.rideDetails}>
          {/* Title Placeholder */}
          <View
            style={[
              styles.line,
              { width: "60%", backgroundColor: colors.stroke },
            ]}
          />
          {/* Subtitle Placeholder */}
          <View
            style={[
              styles.line,
              { width: "40%", height: 12, backgroundColor: colors.stroke },
            ]}
          />
          {/* Meta Placeholder */}
          <View
            style={[
              styles.line,
              { width: "30%", height: 10, backgroundColor: colors.stroke },
            ]}
          />
        </View>

        <View style={styles.priceContainer}>
          {/* Price Placeholder */}
          <View
            style={[
              styles.line,
              { width: 60, height: 20, backgroundColor: colors.stroke },
            ]}
          />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  rideCard: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    height: 90,
    justifyContent: "center",
  },
  rideInfo: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
  },
  imagePlaceholder: {
    width: 80,
    height: 60,
    borderRadius: 4,
  },
  rideDetails: {
    flex: 1,
    gap: 8,
  },
  line: {
    height: 16,
    borderRadius: 4,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
});

export default RideCardSkeleton;
