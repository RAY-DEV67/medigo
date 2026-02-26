import { Text, TouchableOpacity, View } from "react-native";
import useTheme from "../../hooks/useThemes";
import IncomingTransaction from "../../../assets/icons/incomingTransaction";
import OutgoingTransaction from "../../../assets/icons/outgoingTransaction";
import { commonStyles } from "../../styles/commonStyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FONT_SIZES } from "../../constants/sizes";

interface TransactionCardProps {
  transaction: any;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const { colors } = useTheme();
  const commonStyling = commonStyles(colors);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: 16,
      }}
      onPress={() => {
        navigation.navigate("Payments", {
          screen: "TransactionDetails",
          params: {
            status: transaction.status,
          },
        });
      }}
      key={transaction.id}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          columnGap: 8,
        }}
      >
        <View
          style={{
            backgroundColor: "#ffffff",
            padding: 5,
            borderRadius: 50,
          }}
        >
          {transaction.status === "Credit" ? (
            <IncomingTransaction />
          ) : (
            <OutgoingTransaction />
          )}
        </View>
        <View>
          <Text
            style={[
              commonStyling.subtitle,
              {
                width: 200,
                color: colors.titleText,
              },
            ]}
          >
            {transaction.description}
          </Text>
          <Text
            style={[
              commonStyling.subtitle,
              {
                marginTop: 4,
                fontSize: FONT_SIZES.BODY,
              },
            ]}
          >
            {transaction.date}
          </Text>
        </View>
      </View>
      <Text
        style={[
          commonStyling.subtitle,
          {
            color:
              transaction.status === "Credit" ? colors.krGreen : colors.red,
          },
        ]}
      >
        {transaction.status === "Credit" ? "+" : "-"}
        {transaction.amount}
      </Text>
    </TouchableOpacity>
  );
}
