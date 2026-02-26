import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

export const DriverCardSkeleton = ({ colors }: any) => {
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0.4, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const animatedStyle = { opacity: pulseAnim };
  const skeletonBg = { backgroundColor: colors.stroke || "#E1E9EE" };

  return (
    <View style={styles.cardContainer}>
      {/* Top Row: Vehicle Info & Car Image */}
      <View style={styles.rowBetween}>
        <View style={{ gap: 8 }}>
          <Animated.View style={[styles.textBar, animatedStyle, skeletonBg, { width: 100, height: 20 }]} />
          <Animated.View style={[styles.textBar, animatedStyle, skeletonBg, { width: 80, height: 24 }]} />
          <Animated.View style={[styles.textBar, animatedStyle, skeletonBg, { width: 140, height: 16 }]} />
        </View>
        <Animated.View style={[styles.carPlaceholder, animatedStyle, skeletonBg]} />
      </View>

      {/* Middle Row: Driver Profile & Action Icons */}
      <View style={[styles.rowBetween, { marginVertical: 16 }]}>
        <View style={styles.leftContent}>
          <Animated.View style={[styles.avatarPlaceholder, animatedStyle, skeletonBg]} />
          <View style={{ gap: 6 }}>
            <Animated.View style={[styles.textBar, animatedStyle, skeletonBg, { width: 120, height: 18 }]} />
            <Animated.View style={[styles.textBar, animatedStyle, skeletonBg, { width: 60, height: 12 }]} />
          </View>
        </View>

        <View style={styles.leftContent}>
          <Animated.View style={[styles.iconPlaceholder, animatedStyle, skeletonBg]} />
          <Animated.View style={[styles.iconPlaceholder, animatedStyle, skeletonBg]} />
        </View>
      </View>

      {/* Bottom: Message Button Skeleton */}
      <Animated.View style={[styles.buttonPlaceholder, animatedStyle, skeletonBg]} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: { padding: 4 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  leftContent: { flexDirection: "row", alignItems: "center", gap: 12 },
  textBar: { borderRadius: 4 },
  carPlaceholder: { width: 120, height: 80, borderRadius: 8 },
  avatarPlaceholder: { width: 50, height: 50, borderRadius: 25 },
  iconPlaceholder: { width: 40, height: 40, borderRadius: 5 },
  buttonPlaceholder: { width: "100%", height: 55, borderRadius: 12 },
});