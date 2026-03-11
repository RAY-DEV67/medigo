import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, StatusBar } from "react-native";
import { CreditCard, Shield } from "lucide-react-native";
import useTheme from "../../hooks/useThemes";
import { commonStyles } from "../../styles/commonStyles";
import { FONT_SIZES } from "../../constants/sizes";
import { SafeAreaView } from "react-native-safe-area-context";
import Buttons from "../../components/buttons/buttons";
import BackButton from "../../components/buttons/backButton";
import Input from "../../components/inputs/input";
import RightArrow from "../../../assets/icons/rightArrow";
import SucccessCheckmark from "../../../assets/icons/successCheckmark";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ModalComponent from "../../components/modals/modal";

const PaymentMethod = () => {
  const { colors } = useTheme();
  const commonStyling = commonStyles(colors);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (showModal) {
      timer = setTimeout(() => {
        setShowModal(false);
        navigation.navigate("RiderMainTabs");
      }, 1500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showModal]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.surfacePrimary,
      }}
    >
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <BackButton />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[commonStyling.title, styles.title]}>Payment Method</Text>
        <Text style={[commonStyling.subtitle, styles.subtitle]}>
          Add a payment method to complete your setup.
        </Text>

        <LinearGradient
          colors={["#2F6FED", "#1E4DB7"]}
          style={styles.creditCardVisual}
        >
          <CreditCard color="#FFF" size={32} />
          <Text style={styles.cardDigits}>**** **** **** ****</Text>
          <View style={styles.cardRow}>
            <View>
              <Text
                style={[
                  commonStyling.subtitle,
                  styles.cardInfo,
                  {
                    opacity: 0.7,
                    fontSize: FONT_SIZES.BODY,
                    marginBottom: 4,
                  },
                ]}
              >
                Card Holder
              </Text>
              <Text style={[commonStyling.subtitle, styles.cardInfo]}>
                YOUR NAME
              </Text>
            </View>

            <View>
              <Text
                style={[
                  commonStyling.subtitle,
                  styles.cardInfo,
                  {
                    opacity: 0.7,
                    fontSize: FONT_SIZES.BODY,
                    marginBottom: 4,
                  },
                ]}
              >
                Expires
              </Text>
              <Text style={[commonStyling.subtitle, styles.cardInfo]}>
                05/28
              </Text>
            </View>
          </View>
        </LinearGradient>

        <Input
          title="Card Number"
          placeholder="1234 5678 9012 3456"
          value=""
          onChangeText={() => {}}
        />
        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Input
              title="Expiry date"
              placeholder="mm/yy"
              value=""
              onChangeText={() => {}}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Input
              title="CVV"
              placeholder="123"
              value=""
              onChangeText={() => {}}
            />
          </View>
        </View>
        <Input
          title="Cardholder Name"
          placeholder="Jhon"
          value=""
          onChangeText={() => {}}
        />
        <View
          style={[
            {
              backgroundColor: colors.highlightBlue50,
              flexDirection: "row",
              columnGap: 8,
              alignItems: "flex-start",
              padding: 16,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#2F6FED33",
              marginTop: 16,
              marginBottom: 32,
            },
          ]}
        >
          <Shield color="#3B82F6" size={20} />
          <View>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: FONT_SIZES.SUBTITLE,
                  color: colors.primaryColor,
                  fontFamily: "Medium",
                  marginBottom: 8,
                },
              ]}
            >
              Secure Payment
            </Text>
            <Text
              style={[
                commonStyling.subtitle,
                {
                  fontSize: FONT_SIZES.BODY,
                  color: colors.primaryColor,
                  lineHeight: 20,
                },
              ]}
            >
              Your card information is encrypted and stored securely. We use
              industry-standard PCI compliance.
            </Text>
          </View>
        </View>
        <View>
          <Buttons
            title="Save & Continue"
            onPress={() => {
              setShowModal(true);
            }}
            rightIcon={<RightArrow />}
          />
        </View>
      </ScrollView>

      <ModalComponent
        title=""
        visible={showModal}
        onClose={() => setShowModal(false)}
      >
        <View style={styles.padlockContainer}>
          <SucccessCheckmark />
        </View>

        <Text
          style={[
            commonStyling.title,
            styles.modalTitle,
            {
              fontFamily: "Bold",
            },
          ]}
        >
          Card Added Successfully
        </Text>

        <Text style={[commonStyling.subtitle, styles.modalSubtitle]}>
          Your card has been securely saved and is ready for future bookings.
        </Text>
      </ModalComponent>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 10 },

  scrollContent: { paddingHorizontal: 24, paddingBottom: 100 },
  title: { marginTop: 24, fontSize: FONT_SIZES.HERO, fontFamily: "Bold" },
  subtitle: {
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 22,
  },

  row: { flexDirection: "row", marginVertical: 16 },

  creditCardVisual: {
    backgroundColor: "#1E3A8A",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  cardDigits: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 20,
    letterSpacing: 2,
  },
  cardRow: { flexDirection: "row", justifyContent: "space-between" },
  cardInfo: { color: "#FFF" },

  modalTitle: {
    marginBottom: 12,
    textAlign: "center",
    marginTop: 16,
  },
  modalSubtitle: {
    marginBottom: 32,
    textAlign: "center",
  },
  padlockContainer: {
    alignItems: "center",
  },
});

export default PaymentMethod;
