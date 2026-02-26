import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, ScrollView } from "react-native";
import useTheme from "../../hooks/useThemes";

const UpcomingRideDetailsSkeleton = () => {
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

  const Block = ({
    width,
    height,
    borderRadius = 8,
    marginBottom = 0,
    style,
  }: any) => (
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
      style={{ flex: 1, backgroundColor: colors.surfacePrimary, opacity }}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Map Placeholder */}
        <Block width="100%" height={180} borderRadius={16} marginBottom={16} />

        {/* Ride Info Placeholder */}
        <View style={styles.row}>
          <Block width={60} height={45} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Block width="40%" height={16} marginBottom={8} />
            <Block width="20%" height={12} />
          </View>
          <Block width={60} height={20} />
        </View>

        {/* Banner Placeholder */}
        <Block width="100%" height={80} borderRadius={12} marginBottom={24} />

        {/* Schedule Card Placeholder */}
        <View style={[styles.card, { backgroundColor: colors.lightGray }]}>
          <View
            style={[
              styles.row,
              {
                borderBottomWidth: 1,
                borderColor: colors.stroke,
                paddingBottom: 16,
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Block width="50%" height={14} marginBottom={8} />
              <Block width="80%" height={22} marginBottom={8} />
              <Block width="60%" height={14} />
            </View>
            <Block width={80} height={34} borderRadius={20} />
          </View>

          {/* Route Placeholder */}
          <View style={{ marginTop: 16 }}>
            <Block width="90%" height={14} marginBottom={12} />
            <Block width="90%" height={14} marginBottom={12} />
          </View>
        </View>

        {/* Reminder Items */}
        <Block
          width="40%"
          height={20}
          marginBottom={16}
          style={{ marginTop: 24 }}
        />
        <View style={styles.row}>
          <Block width={24} height={24} borderRadius={12} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Block width="30%" height={14} marginBottom={8} />
            <Block width="90%" height={12} />
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  card: {
    padding: 20,
    borderRadius: 20,
  },
});

export default UpcomingRideDetailsSkeleton;
