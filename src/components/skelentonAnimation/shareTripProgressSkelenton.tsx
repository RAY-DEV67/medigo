import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

export const ContactSharingSkeleton = ({ colors }: any) => {
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const sharedAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ]),
    );
    sharedAnimation.start();

    return () => sharedAnimation.stop();
  }, [pulseAnim]);

  const animatedStyle = { opacity: pulseAnim };

  return (
    <View style={[styles.card, { backgroundColor: colors.surfacePrimary }]}>
      {/* HEADER SKELETON */}
      <View style={styles.contactHeader}>
        <Animated.View
          style={[
            styles.skeletonTitle,
            animatedStyle,
            { backgroundColor: colors.lightGray },
          ]}
        />
        <Animated.View
          style={[
            styles.skeletonTextLine,
            animatedStyle,
            { backgroundColor: colors.lightGray, width: "90%" },
          ]}
        />
        <Animated.View
          style={[
            styles.skeletonTextLine,
            animatedStyle,
            { backgroundColor: colors.lightGray, width: "70%" },
          ]}
        />
      </View>

      {/* CONTACT LIST SKELETON */}
      <View style={styles.contactsList}>
        {[1, 2, 3, 4].map((i) => (
          <Animated.View
            key={i}
            style={[
              styles.contactAvatar,
              animatedStyle,
              { backgroundColor: colors.lightGray },
            ]}
          />
        ))}
      </View>

      {/* BUTTONS SKELETON */}
      <View style={styles.buttonsContainer}>
        <Animated.View
          style={[
            styles.skeletonButton,
            animatedStyle,
            { backgroundColor: colors.lightGray },
          ]}
        />
        <Animated.View
          style={[
            styles.skeletonButton,
            animatedStyle,
            { backgroundColor: colors.lightGray },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 20,
    marginBottom: 16,
  },
  contactHeader: {
    marginBottom: 24,
  },
  skeletonTitle: {
    height: 20,
    width: "50%",
    borderRadius: 4,
    marginBottom: 12,
  },
  skeletonTextLine: {
    height: 12,
    borderRadius: 4,
    marginTop: 8,
  },
  contactsList: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  contactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  buttonsContainer: {
    gap: 12,
  },
  skeletonButton: {
    height: 50,
    borderRadius: 12,
    width: "100%",
  },
});
