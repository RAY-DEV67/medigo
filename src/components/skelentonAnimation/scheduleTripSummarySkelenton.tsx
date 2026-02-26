import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, ScrollView } from "react-native";
import useTheme from "../../hooks/useThemes";
import { commonStyles } from "../../styles/commonStyles";

const ScheduledTripSummarySkeleton = () => {
  const { colors } = useTheme();
  const commonStyling = commonStyles(colors);
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

  const SkeletonLine = ({
    width,
    height,
    marginBottom,
    borderRadius = 4,
  }: any) => (
    <View
      style={{
        width,
        height,
        marginBottom,
        borderRadius,
        backgroundColor: colors.stroke,
      }}
    />
  );

  return (
    <ScrollView
      style={{ backgroundColor: colors.lightGray }}
      contentContainerStyle={{ paddingBottom: 100, flexGrow: 1 }}
    >
      <View style={[commonStyling.container, { flex: 1 }]}>
        {/* "Upcoming trip" label placeholder */}
        <SkeletonLine width={120} height={18} marginBottom={32} />

        <Animated.View
          style={[
            styles.card,
            { backgroundColor: colors.surfacePrimary, opacity },
          ]}
        >
          {/* Date & Time Placeholders */}
          <View style={{ alignItems: "center", gap: 8, marginBottom: 24 }}>
            <SkeletonLine width="60%" height={16} />
            <SkeletonLine width="45%" height={22} />
          </View>

          {/* Ride Info Placeholder (Car image + Category) */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <SkeletonLine width={100} height={70} borderRadius={12} />
            <View style={{ flex: 1, gap: 10 }}>
              <SkeletonLine width="70%" height={16} />
              <SkeletonLine width="40%" height={14} />
            </View>
          </View>

          {/* Route Card Placeholder */}
          <SkeletonLine width={130} height={20} marginBottom={16} />
          <SkeletonLine width="100%" height={120} borderRadius={12} />

          {/* Deposit Fee Row */}
          <View style={styles.rowBetween}>
            <SkeletonLine width={100} height={18} />
            <SkeletonLine width={60} height={18} />
          </View>

          {/* Edit Button & Policy Row */}
          <View style={[styles.rowBetween, { marginTop: 32 }]}>
            <SkeletonLine width={100} height={34} borderRadius={20} />
            <SkeletonLine width={120} height={16} />
          </View>
        </Animated.View>

        {/* Bottom Button Placeholder */}
        <View style={{ marginTop: 32 }}>
          <SkeletonLine width="100%" height={50} borderRadius={10} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 20,
    marginBottom: 16,
    marginTop: 32,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
});

export default ScheduledTripSummarySkeleton;
