import React, { useRef, useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import useTheme from "../../hooks/useThemes";

const ITEM_HEIGHT = 40;
const SCREEN_WIDTH = Dimensions.get("window").width;

interface TimePickerProps {
  initialHour?: number;
  initialMinute?: number;
  onChange?: (time: string) => void;
  selectedDate?: string;
  minMinutesFromNow?: number;
}

const TimePicker: React.FC<TimePickerProps> = ({
  initialHour = new Date().getHours(),
  initialMinute = new Date().getMinutes(),
  onChange,
  selectedDate,
  minMinutesFromNow = 20,
}) => {
  const { colors } = useTheme();

  // Check if selected date is today
  const isToday = () => {
    if (!selectedDate) return false;
    const today = new Date().toISOString().split("T")[0];
    return selectedDate === today;
  };

  // Calculate minimum time (20 minutes from now)
  const getMinTime = () => {
    if (!isToday()) return { hour: 0, minute: 0 };

    const now = new Date();
    const minTime = new Date(now.getTime() + minMinutesFromNow * 60 * 1000);
    return {
      hour: minTime.getHours(),
      minute: minTime.getMinutes(),
    };
  };

  const minTime = getMinTime();

  // Filter hours based on minimum time
  const getAvailableHours = () => {
    if (!isToday()) {
      return Array.from({ length: 24 }, (_, i) => i);
    }
    return Array.from({ length: 24 }, (_, i) => i).filter(
      (hour) => hour >= minTime.hour,
    );
  };

  // Filter minutes based on selected hour and minimum time
  const getAvailableMinutes = (hour: number) => {
    const allMinutes = Array.from({ length: 60 }, (_, i) => i);

    if (!isToday()) {
      return allMinutes;
    }

    // If selected hour is the minimum hour, filter minutes
    if (hour === minTime.hour) {
      return allMinutes.filter((minute) => minute >= minTime.minute);
    }

    // If selected hour is after minimum hour, all minutes are available
    if (hour > minTime.hour) {
      return allMinutes;
    }

    return [];
  };

  const hours = getAvailableHours();
  const [selectedHour, setSelectedHour] = useState(() => {
    // Ensure initial hour is valid
    if (isToday() && initialHour < minTime.hour) {
      return minTime.hour;
    }
    return initialHour;
  });

  const minutes = getAvailableMinutes(selectedHour);
  const [selectedMinute, setSelectedMinute] = useState(() => {
    // Ensure initial minute is valid
    if (
      isToday() &&
      selectedHour === minTime.hour &&
      initialMinute < minTime.minute
    ) {
      return minTime.minute;
    }
    return initialMinute;
  });

  const hourRef = useRef<ScrollView>(null);
  const minuteRef = useRef<ScrollView>(null);

  // Update minutes when hour changes
  useEffect(() => {
    const availableMinutes = getAvailableMinutes(selectedHour);

    // If current selected minute is no longer available, select the first available minute
    if (!availableMinutes.includes(selectedMinute)) {
      const newMinute = availableMinutes[0] || 0;
      setSelectedMinute(newMinute);

      if (onChange) {
        const formatted = `${String(selectedHour).padStart(2, "0")}:${String(
          newMinute,
        ).padStart(2, "0")}`;
        onChange(formatted);
      }
    }
  }, [selectedHour, selectedDate]);

  // Snap to closest item
  const onScrollEnd = (
    e: any,
    list: number[],
    setter: (n: number) => void,
    type: "hour" | "minute",
  ) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);

    const value = list[index];
    setter(value);

    if (onChange) {
      const formatted = `${String(
        type === "hour" ? value : selectedHour,
      ).padStart(2, "0")}:${String(
        type === "minute" ? value : selectedMinute,
      ).padStart(2, "0")}`;

      onChange(formatted);
    }
  };

  const renderList = (list: number[], selectedValue: number) =>
    list.map((item, index) => (
      <View key={index} style={styles.item}>
        <Text
          style={[
            styles.itemText,
            selectedValue === item && styles.selectedText,
            {
              color: colors.inputText,
            },
          ]}
        >
          {String(item).padStart(2, "0")}
        </Text>
      </View>
    ));

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: colors.stroke,
          backgroundColor: colors.surfacePrimary,
        },
      ]}
    >
      <View
        style={[
          styles.centerHighlight,
          {
            backgroundColor: colors.lightGray,
          },
        ]}
      />

      {/* Hours */}
      <ScrollView
        ref={hourRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={(e) =>
          onScrollEnd(e, hours, setSelectedHour, "hour")
        }
        contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 1.5 }}
      >
        {renderList(hours, selectedHour)}
      </ScrollView>

      {/* Minutes */}
      <ScrollView
        ref={minuteRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={(e) =>
          onScrollEnd(e, minutes, setSelectedMinute, "minute")
        }
        contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 1.5 }}
      >
        {renderList(minutes, selectedMinute)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT * 4,
    flexDirection: "row",
    width: SCREEN_WIDTH * 0.7,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    paddingHorizontal: 50,
  },

  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },

  itemText: {
    fontSize: 20,
    color: "#5a5a5a",
    fontFamily: "Medium",
  },

  selectedText: {
    color: "#2d2d2d",
    fontFamily: "Medium",
  },

  centerHighlight: {
    position: "absolute",
    height: ITEM_HEIGHT,
    width: "100%",
    top: "50%",
    left: "28%",
    marginTop: -ITEM_HEIGHT / 2,
    zIndex: -1,
    borderRadius: 5,
  },
});

export default TimePicker;
