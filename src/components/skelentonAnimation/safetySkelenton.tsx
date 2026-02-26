import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import useTheme from "../../hooks/useThemes";

const SafetySkeleton = () => {
  const { colors } = useTheme();
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  const skeletonStyle = {
    backgroundColor: colors.stroke,
    opacity: pulseAnim,
    borderRadius: 4,
  };

  const SkeletonRow = () => (
    <View style={styles.row}>
      <View style={styles.left}>
        {/* Left Icon Placeholder */}
        <Animated.View style={[skeletonStyle, { width: 24, height: 24, borderRadius: 12 }]} />
        
        <View style={{ flex: 1 }}>
          {/* Title Placeholder */}
          <Animated.View style={[skeletonStyle, { width: '60%', height: 18 }]} />
          {/* Subtitle Placeholder */}
          <Animated.View style={[skeletonStyle, { width: '30%', height: 14, marginTop: 8 }]} />
        </View>
      </View>
      
      {/* Right Icon Placeholder */}
      <Animated.View style={[skeletonStyle, { width: 20, height: 20 }]} />
    </View>
  );

  return (
    <View style={{ marginTop: 20 }}>
      <SkeletonRow />
      <SkeletonRow />
      <SkeletonRow />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent', // Match the spacing of your DetailItem
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
});

export default SafetySkeleton;