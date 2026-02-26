import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

const SkeletonItem = ({ width, height, borderRadius = 8, style }: any) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
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
  }, []);

  return (
    <Animated.View
      style={[
        { width, height, borderRadius, backgroundColor: "#E1E9EE", opacity },
        style,
      ]}
    />
  );
};

export const ConfirmDriverSkeleton = ({ colors }: any) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.lightGray,
        paddingTop: 50,
        paddingHorizontal: 16,
      }}
    >
      {/* Header Skeleton */}
      <SkeletonItem
        width="60%"
        height={30}
        style={{ alignSelf: "center", marginBottom: 20 }}
      />

      {/* Driver Card Skeleton */}
      <View
        style={[
          styles.skeletonCard,
          { backgroundColor: colors.surfacePrimary },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <SkeletonItem width={60} height={60} borderRadius={30} />
          <View style={{ marginLeft: 16, flex: 1 }}>
            <SkeletonItem width="70%" height={20} style={{ marginBottom: 8 }} />
            <SkeletonItem width="40%" height={15} />
          </View>
        </View>
      </View>

      {/* PIN Card Skeleton */}
      <View
        style={[
          styles.skeletonCard,
          { backgroundColor: colors.surfacePrimary },
        ]}
      >
        <SkeletonItem
          width="50%"
          height={20}
          style={{ alignSelf: "center", marginBottom: 12 }}
        />
        <SkeletonItem width="80%" height={60} style={{ alignSelf: "center" }} />
      </View>

      {/* Route Card Skeleton */}
      <View
        style={[
          styles.skeletonCard,
          { backgroundColor: colors.surfacePrimary },
        ]}
      >
        <SkeletonItem width="40%" height={20} style={{ marginBottom: 20 }} />
        <View style={{ flexDirection: "row" }}>
          <SkeletonItem width={20} height={80} style={{ marginRight: 15 }} />
          <View style={{ flex: 1 }}>
            <SkeletonItem
              width="90%"
              height={20}
              style={{ marginBottom: 25 }}
            />
            <SkeletonItem width="90%" height={20} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonCard: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
  },
});
