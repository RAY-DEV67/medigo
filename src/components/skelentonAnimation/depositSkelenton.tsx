import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, ScrollView } from "react-native";

export const DepositSkeleton = ({ colors }: any) => {
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const animatedStyle = { opacity: pulseAnim };
  const skeletonBg = { backgroundColor: colors.stroke };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 40,
        paddingTop: 50,
        flexGrow: 1,
        backgroundColor: colors.lightGray,
      }}
    >
      <Animated.View
        style={[
          styles.headerSkeleton,
          animatedStyle,
          skeletonBg,
          { alignSelf: "center" },
        ]}
      />

      <View style={[styles.card, { backgroundColor: colors.surfacePrimary }]}>
        <Animated.View
          style={[
            styles.textLine,
            animatedStyle,
            skeletonBg,
            { width: "80%", marginBottom: 24 },
          ]}
        />

        <View style={styles.rideCardSkeleton}>
          <Animated.View
            style={[styles.iconSkeleton, animatedStyle, skeletonBg]}
          />
          <View style={{ flex: 1, gap: 8 }}>
            <Animated.View
              style={[
                styles.textLine,
                animatedStyle,
                skeletonBg,
                { width: "60%" },
              ]}
            />
            <Animated.View
              style={[
                styles.textLine,
                animatedStyle,
                skeletonBg,
                { width: "40%", height: 10 },
              ]}
            />
            <Animated.View
              style={[
                styles.textLine,
                animatedStyle,
                skeletonBg,
                { width: "30%", height: 10 },
              ]}
            />
          </View>
          <View style={{ alignItems: "flex-end", gap: 8 }}>
            <Animated.View
              style={[
                styles.textLine,
                animatedStyle,
                skeletonBg,
                { width: 60, height: 20 },
              ]}
            />
            <Animated.View
              style={[
                styles.textLine,
                animatedStyle,
                skeletonBg,
                { width: 40, height: 10 },
              ]}
            />
          </View>
        </View>

        <View style={{ marginTop: 24, gap: 20 }}>
          <Animated.View
            style={[
              styles.textLine,
              animatedStyle,
              skeletonBg,
              { width: "40%", height: 18 },
            ]}
          />
          {[1, 2, 3].map((i) => (
            <View key={i} style={styles.row}>
              <Animated.View
                style={[
                  styles.textLine,
                  animatedStyle,
                  skeletonBg,
                  { width: "30%" },
                ]}
              />
              <Animated.View
                style={[
                  styles.textLine,
                  animatedStyle,
                  skeletonBg,
                  { width: "40%" },
                ]}
              />
            </View>
          ))}
        </View>

        <Animated.View
          style={[
            styles.buttonSkeleton,
            animatedStyle,
            skeletonBg,
            { marginTop: 40 },
          ]}
        />
        <Animated.View
          style={[
            styles.textLine,
            animatedStyle,
            skeletonBg,
            { width: "90%", marginTop: 16, alignSelf: "center" },
          ]}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 20,
    marginHorizontal: 16,
  },
  headerSkeleton: { height: 28, width: 120, borderRadius: 4, marginBottom: 16 },
  textLine: { height: 14, borderRadius: 4 },
  rideCardSkeleton: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    gap: 12,
  },
  iconSkeleton: { width: 80, height: 60, borderRadius: 8 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonSkeleton: { height: 55, borderRadius: 12, width: "100%" },
});
