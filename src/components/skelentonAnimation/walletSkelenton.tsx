import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import useTheme from "../../hooks/useThemes";
import SkeletonPlaceholder from "./walletSkelentonPlaceholder";

const WalletSkeleton = () => {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      {/* Wallet Title */}
      <SkeletonPlaceholder
        style={{
          width: 100,
          height: 30,
          marginTop: 24,
          marginBottom: 24,
          borderRadius: 4,
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Balance Card Skeleton */}
        <View style={[styles.card, { backgroundColor: colors.lightGray }]}>
          <SkeletonPlaceholder
            style={{
              width: 120,
              height: 15,
              marginBottom: 10,
              borderRadius: 4,
            }}
          />
          <SkeletonPlaceholder
            style={{
              width: 180,
              height: 40,
              marginBottom: 20,
              borderRadius: 4,
            }}
          />
          <SkeletonPlaceholder
            style={{ width: "100%", height: 50, borderRadius: 12 }}
          />
        </View>

        {/* Payment Methods Skeleton */}
        <View style={[styles.card, { backgroundColor: colors.lightGray }]}>
          <SkeletonPlaceholder
            style={{
              width: 140,
              height: 20,
              marginBottom: 15,
              borderRadius: 4,
            }}
          />
          {[1, 2, 3].map((i) => (
            <View key={i} style={styles.listItem}>
              <SkeletonPlaceholder
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
              <SkeletonPlaceholder
                style={{ flex: 1, height: 20, marginLeft: 15, borderRadius: 4 }}
              />
            </View>
          ))}
        </View>

        {/* Transaction History Skeleton */}
        <View style={[styles.card, { backgroundColor: colors.lightGray }]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <SkeletonPlaceholder
              style={{ width: 150, height: 20, borderRadius: 4 }}
            />
            <SkeletonPlaceholder
              style={{ width: 60, height: 20, borderRadius: 4 }}
            />
          </View>
          {[1, 2, 3].map((i) => (
            <View key={i} style={[styles.listItem, { marginBottom: 20 }]}>
              <View style={{ flex: 1 }}>
                <SkeletonPlaceholder
                  style={{
                    width: "80%",
                    height: 15,
                    marginBottom: 8,
                    borderRadius: 4,
                  }}
                />
                <SkeletonPlaceholder
                  style={{ width: "40%", height: 12, borderRadius: 4 }}
                />
              </View>
              <SkeletonPlaceholder
                style={{ width: 60, height: 20, borderRadius: 4 }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default WalletSkeleton;
