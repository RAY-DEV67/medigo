import React, { useEffect, useRef, useMemo } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import useTheme from "../hooks/useThemes";

const BAR_WIDTH = Dimensions.get("window").width - 40;
const MAX_POINTS = 100;
const EMOJI_SIZE = 28;

interface Props {
  points: number;
}

const EMOJIS = {
  verySad: require("../../assets/images/angryEmoji.png"),
  sad: require("../../assets/images/sadEmoji.png"),
  neutral: require("../../assets/images/coolEmoji.png"),
  happy: require("../../assets/images/smilingEmoji.png"),
  veryHappy: require("../../assets/images/smilingTeethEmoji.png"),
};

export default function ReferralProgress({ points }: Props) {
  const { colors } = useTheme();
  const progressAnim = useRef(new Animated.Value(0)).current;

  const progressRatio = Math.min(points / MAX_POINTS, 1);

  const emojiTranslateX = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, BAR_WIDTH - EMOJI_SIZE],
  });

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progressRatio,
      duration: 900,
      useNativeDriver: false,
    }).start();
  }, [points]);

  const emojiSource = useMemo(() => {
    if (points <= 20) return EMOJIS.verySad;
    if (points <= 40) return EMOJIS.sad;
    if (points <= 60) return EMOJIS.neutral;
    if (points <= 80) return EMOJIS.happy;
    return EMOJIS.veryHappy;
  }, [points]);

  return (
    <View style={styles.wrapper}>
      {/* Progress bar */}
      <View style={styles.bar}>
        <View style={[styles.segment, { backgroundColor: colors.red }]} />
        <View style={[styles.segment, { backgroundColor: colors.red }]} />
        <View style={[styles.segment, { backgroundColor: colors.krGreen }]} />
        <View style={[styles.segment, { backgroundColor: colors.krGreen }]} />
        <View style={[styles.segment, { backgroundColor: colors.krGreen }]} />
        <View style={[styles.segment, { backgroundColor: colors.krGreen }]} />
        <View style={[styles.segment, { backgroundColor: colors.spotBlue }]} />
        <View style={[styles.segment, { backgroundColor: colors.spotBlue }]} />
        <View style={[styles.segment, { backgroundColor: colors.spotBlue }]} />
      </View>

      {/* Animated emoji */}
      <Animated.Image
        source={emojiSource}
        resizeMode="contain"
        style={[
          styles.emoji,
          {
            transform: [{ translateX: emojiTranslateX }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    marginVertical: 12,
  },
  bar: {
    flexDirection: "row",
    height: 8,
    borderRadius: 6,
    overflow: "hidden",
  },
  segment: {
    flex: 1,
    marginRight: 4,
    borderRadius: 4,
  },
  emoji: {
    position: "absolute",
    top: -12,
    width: EMOJI_SIZE,
    height: EMOJI_SIZE,
    zIndex: 9999,
    left: 20,
  },
});
