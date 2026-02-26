import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import useTheme from "../../hooks/useThemes";

const UpcomingRidesCardSkeleton = () => {
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
      ])
    ).start();
  }, [opacity]);

  const SkeletonBlock = ({ width, height, borderRadius = 4, marginBottom = 0, style }: any) => (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          marginBottom,
          backgroundColor: colors.stroke,
        },
        style,
      ]}
    />
  );

  return (
    <Animated.View 
      style={[styles.card, { backgroundColor: colors.lightGray, opacity }]}
    >
      {/* Mimicking RideInformation Row */}
      <View style={styles.topRow}>
        <SkeletonBlock width={60} height={45} borderRadius={8} />
        <View style={{ flex: 1, marginLeft: 12, gap: 8 }}>
          <SkeletonBlock width="50%" height={16} />
          <SkeletonBlock width="30%" height={12} />
        </View>
        <SkeletonBlock width={50} height={20} />
      </View>

      {/* Mimicking Footer Row */}
      <View style={styles.footer}>
        <View style={styles.infoContainer}>
          <SkeletonBlock width="80%" height={16} marginBottom={6} />
          <SkeletonBlock width="60%" height={14} />
        </View>

        <View style={styles.buttonContainer}>
          <SkeletonBlock width="100%" height={35} borderRadius={8} />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
  },
  buttonContainer: {
    width: "30%",
  },
});

export default UpcomingRidesCardSkeleton;