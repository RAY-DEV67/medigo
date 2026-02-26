import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import useTheme from "../../hooks/useThemes";
import { commonStyles } from "../../styles/commonStyles";
import Phone from "../../../assets/icons/phone";
import Options from "../../../assets/icons/options";
import Buttons from "./../buttons/buttons";
import SMSIcon from "../../../assets/icons/sms";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FONT_SIZES } from "../../constants/sizes";
import { formatPrice } from "../../utils/formatPrice";
import { useDriverDetails } from "../../hooks/queries/getDriverDetails";
import { DriverCardSkeleton } from "../skelentonAnimation/driverDetailsCardSkelenton";
import { useUserStore } from "../../store/userStore";

interface driverDetailsProps {
  estimated_fare: any;
  driverId: string;
  tripId: string;
}

export default function DriverDetailsCard({
  estimated_fare,
  driverId,
  tripId,
}: driverDetailsProps) {
  const { colors } = useTheme();
  const commonStyling = commonStyles(colors);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { data, isLoading } = useDriverDetails(driverId);
  const { user } = useUserStore();

  return (
    <View>
      {!data ? (
        <DriverCardSkeleton colors={colors} />
      ) : (
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={[commonStyling.title, { fontSize: FONT_SIZES.BUTTON }]}
              >
                {data?.plate_number}
              </Text>

              <Text
                style={[
                  commonStyling.title,
                  {
                    fontSize: FONT_SIZES.SUBTITLE,
                    fontFamily: "Regular",
                    marginVertical: 4,
                  },
                ]}
              >
                {formatPrice(estimated_fare)}
              </Text>

              <Text
                style={[commonStyling.subtitle, { fontSize: FONT_SIZES.BODY }]}
              >
                {data?.vehicle_color} {data?.vehicle_make} {data?.vehicle_model}
              </Text>
            </View>

            <Image
              style={styles.car}
              source={require("../../../assets/images/soloCar.png")}
            />
          </View>
          {/* Driver Row */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 16,
            }}
          >
            <View style={styles.container}>
              {data?.profile_photo_url ? (
                <Image
                  source={{ uri: data?.profile_photo_url }}
                  style={styles.avatar}
                />
              ) : (
                <Image
                  source={require("../../../assets/images/noProfileImage.jpg")}
                  style={styles.avatar}
                />
              )}
              <View>
                <Text
                  style={[
                    commonStyling.title,
                    { fontSize: FONT_SIZES.SUBTITLE, fontFamily: "Regular" },
                  ]}
                >
                  {data?.full_name}
                </Text>

                <Text
                  style={[
                    commonStyling.subtitle,
                    { fontSize: FONT_SIZES.SMALL },
                  ]}
                >
                  {data?.total_trips} trips
                </Text>
              </View>
            </View>

            {/* Action Icons */}
            <View style={styles.container}>
              <TouchableOpacity
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: colors.lightGray,
                    borderWidth: 1,
                    borderColor: colors.gray,
                  },
                ]}
              >
                <Phone />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("DriverDetails", {
                    currentUserId: user?.id,
                    driverDetails: data,
                    tripId: tripId,
                    userType: "RIDER",
                    driverId,
                  })
                }
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: colors.lightGray,
                    borderWidth: 1,
                    borderColor: colors.gray,
                  },
                ]}
              >
                <Options />
              </TouchableOpacity>
            </View>
          </View>

          <Buttons
            icon={<SMSIcon color={colors.buttonPrimary} />}
            type="message"
            title="Send a message"
            onPress={() => {
              navigation.navigate("ChatScreen", {
                currentUserId: user?.id,
                driverDetails: data,
                tripId: tripId,
                userType: "RIDER",
              });
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  car: {
    width: 150,
    height: 100,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  avatar: {
    borderRadius: 40,
    width: 50,
    height: 50,
  },
});
