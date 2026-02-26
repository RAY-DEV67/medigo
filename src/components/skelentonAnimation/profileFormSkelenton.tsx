import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import useTheme from "../../hooks/useThemes";

const ProfileFormSkeleton = () => {
  const { colors } = useTheme();
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const sharedAnimation = Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 0.8,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 0.4,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(sharedAnimation).start();
  }, [pulseAnim]);

  const SkeletonItem = ({ style }: { style?: any }) => (
    <Animated.View
      style={[
        style,
        {
          backgroundColor: colors.lightGray,
          opacity: pulseAnim,
          borderRadius: 8,
        },
      ]}
    />
  );

  return (
    <View style={styles.container}>
      {/* Full Name Field */}
      <View style={styles.fieldContainer}>
        <SkeletonItem style={styles.label} />
        <SkeletonItem style={styles.inputField} />
      </View>

      {/* Email Field */}
      <View style={styles.fieldContainer}>
        <SkeletonItem style={styles.label} />
        <SkeletonItem style={styles.inputField} />
      </View>

      {/* Phone Number Field */}
      <View style={styles.fieldContainer}>
        <SkeletonItem style={styles.label} />
        <SkeletonItem style={styles.inputField} />
      </View>

      {/* Gender & Date Row */}
      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <SkeletonItem style={styles.label} />
          <SkeletonItem style={styles.inputField} />
        </View>
        <View style={styles.halfWidth}>
          <SkeletonItem style={styles.label} />
          <SkeletonItem style={styles.inputField} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    width: 100,
    height: 14,
    marginBottom: 10,
  },
  inputField: {
    width: "100%",
    height: 52,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  halfWidth: {
    width: "48%",
  },
});

export default ProfileFormSkeleton;
