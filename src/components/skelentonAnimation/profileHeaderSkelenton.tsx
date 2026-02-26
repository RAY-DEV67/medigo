import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

const ProfileHeaderSkeleton = ({ colors }: { colors: any }) => {
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

  return (
    <View style={[styles.header, { borderColor: colors.stroke }]}>
      {/* User Info Row */}
      <View style={styles.userInfo}>
        <Animated.View style={[skeletonStyle, styles.avatar]} />
        <View style={{ gap: 8 }}>
          <Animated.View style={[skeletonStyle, { width: 140, height: 20 }]} />
          <Animated.View style={[skeletonStyle, { width: 80, height: 16 }]} />
        </View>
      </View>

      {/* Referral Row */}
      <View style={styles.referralRow}>
        <Animated.View style={[skeletonStyle, { width: 100, height: 16 }]} />
        <Animated.View style={[skeletonStyle, { width: 60, height: 16 }]} />
      </View>

      {/* Progress Bar Placeholder */}
      <View style={{ paddingHorizontal: 20, marginVertical: 16 }}>
        <Animated.View style={[skeletonStyle, { width: "100%", height: 10, borderRadius: 5 }]} />
      </View>

      {/* Invite Row */}
      <View style={styles.inviteRow}>
        <View style={styles.inviteLeft}>
          <Animated.View style={[skeletonStyle, { width: 18, height: 18, borderRadius: 9 }]} />
          <Animated.View style={[skeletonStyle, { width: 150, height: 14 }]} />
        </View>
        <Animated.View style={[skeletonStyle, { width: 80, height: 14 }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 10,
  },
  avatar: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  referralRow: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inviteRow: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  inviteLeft: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
});

export default ProfileHeaderSkeleton;