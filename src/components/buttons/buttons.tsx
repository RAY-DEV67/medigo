import React from "react";
import { Text, View, GestureResponderEvent, Pressable } from "react-native";
import useTheme from "../../hooks/useThemes";
import { commonStyles } from "../../styles/commonStyles";
import LoadingSpinner from "../reuseables/loadingSpinner";
import { FONT_SIZES } from "../../constants/sizes";

type ButtonType =
  | "primary"
  | "danger"
  | "inactive"
  | "onboarding"
  | "cancel"
  | "message"
  | "icon";

interface ButtonsProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  type?: ButtonType;
  icon?: React.ReactNode;
  height?: number;
  loading?: boolean;
}

const Buttons: React.FC<ButtonsProps> = ({
  title,
  onPress,
  type = "primary",
  icon,
  height = 50,
  loading,
}) => {
  const { colors } = useTheme();
  const commonStyling = commonStyles(colors);

  const buttonTypes: Record<
    ButtonType,
    {
      backgroundColor: string;
      textColor: string;
      borderColor?: string;
      borderWidth?: number;
      borderRadius?: number;
    }
  > = {
    primary: {
      backgroundColor: colors.buttonSecondary,
      textColor: colors.buttonPrimaryText,
    },
    danger: {
      backgroundColor: colors.buttonDanger,
      textColor: colors.buttonDangerText,
    },
    inactive: {
      backgroundColor: colors.buttonPrimaryInactive,
      textColor: colors.inactiveButtonText,
    },
    onboarding: {
      backgroundColor: colors.buttonPrimary,
      textColor: colors.buttonPrimaryText,
    },
    cancel: {
      backgroundColor: colors.lightGray,
      textColor: colors.red,
      borderWidth: 1,
      borderColor: colors.stroke,
    },
    message: {
      backgroundColor: colors.lightGray,
      textColor: colors.subTitleText,
      borderRadius: 8,
    },
    icon: {
      backgroundColor: "transparent",
      textColor: colors.titleText,
      borderColor: colors.stroke,
      borderWidth: 1,
    },
  };

  const current = buttonTypes[type];

  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: current.backgroundColor,
        borderColor: current.borderColor,
        paddingHorizontal: 12,
        borderRadius: current.borderRadius ? current.borderRadius : 50,
        borderWidth: current.borderWidth ?? 0,
        height: height,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        {loading ? (
          <LoadingSpinner color={current.textColor} />
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon && (
              <View
                style={{
                  marginRight: 6,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {icon}
              </View>
            )}

            <Text
              style={[
                commonStyling.title,
                {
                  color: current.textColor,
                  textAlign: "center",
                  fontSize:
                    title === "Sign up with Google" ||
                    title === "Sign up with Apple"
                      ? FONT_SIZES.SUBTITLE
                      : FONT_SIZES.BUTTONTEXT,
                },
              ]}
            >
              {title}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default Buttons;
