import { Text, View } from "react-native";
import useTheme from "../../hooks/useThemes";
import { commonStyles } from "../../styles/commonStyles";
import Buttons from "../buttons/buttons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function OutstandingPayment() {
  const { colors } = useTheme();
  const commonStyling = commonStyles(colors);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.highlightRed,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 8,
      }}
    >
      <Text
        style={[
          commonStyling.subtitle,
          {
            color: colors.red,
            width: "70%",
          },
        ]}
      >
        Outstanding ₦3,500
      </Text>
      <View
        style={{
          width: 95,
        }}
      >
        <Buttons
          type="danger"
          height={30}
          title="Details"
          onPress={() => {
            navigation.navigate("Payments", {
              screen: "Outstanding",
            });
          }}
        />
      </View>
    </View>
  );
}
