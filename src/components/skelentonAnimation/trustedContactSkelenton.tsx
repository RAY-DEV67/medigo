import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import useTheme from "../../hooks/useThemes";

const TrustedContactSkeleton = () => {
  const { colors } = useTheme();
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    // A simple looping opacity animation to create the "shimmer" effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  // Helper to apply the animation style
  const skeletonStyle = {
    backgroundColor: colors.stroke, // or any light gray
    opacity: pulseAnim,
    borderRadius: 4,
  };

  return (
    <View style={styles.container}>
      {/* Header Area */}
      <View style={styles.headerSkeleton}>
        <Animated.View
          style={[skeletonStyle, { width: 30, height: 30, borderRadius: 15 }]}
        />
        <Animated.View style={[skeletonStyle, { width: 60, height: 20 }]} />
      </View>

      <View style={{ alignItems: "center" }}>
        {/* Avatar Circle */}
        <Animated.View style={[skeletonStyle, styles.avatarCircle]} />

        {/* Text Lines */}
        <Animated.View style={[skeletonStyle, styles.nameLine]} />
        <Animated.View style={[skeletonStyle, styles.subLine]} />
        <Animated.View style={[skeletonStyle, styles.phoneLine]} />
        <Animated.View style={[skeletonStyle, styles.editLine]} />

        {/* Detail Rows */}
        <View style={styles.rowContainer}>
          <Animated.View style={[skeletonStyle, styles.rowText]} />
          <Animated.View style={[skeletonStyle, styles.rowTextSmall]} />
        </View>

        <View style={styles.rowContainer}>
          <Animated.View style={[skeletonStyle, styles.rowText]} />
          <Animated.View style={[skeletonStyle, styles.rowTextSmall]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  headerSkeleton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 32,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  nameLine: {
    width: 150,
    height: 22,
    marginTop: 12,
  },
  subLine: {
    width: 100,
    height: 16,
    marginTop: 8,
  },
  phoneLine: {
    width: 120,
    height: 16,
    marginTop: 8,
  },
  editLine: {
    width: 80,
    height: 14,
    marginTop: 16,
  },
  rowContainer: {
    width: "100%",
    marginTop: 40,
  },
  rowText: {
    width: "50%",
    height: 20,
  },
  rowTextSmall: {
    width: "100%",
    height: 40, // Match the height of your DetailItem
    marginTop: 10,
    borderRadius: 12,
  },
});

export default TrustedContactSkeleton;
