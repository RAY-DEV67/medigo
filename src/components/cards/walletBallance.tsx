import { memo, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import BackgroundCar from "../../../assets/icons/backgroundCar";
import FilledWallet from "../../../assets/icons/filledWallet";
import Buttons from "../buttons/buttons";
import { FONT_SIZES } from "../../constants/sizes";

const WalletBalance = memo(
  ({ colors, commonStyling, onTopUp, balance }: any) => {
    const backgroundIcons = useMemo(() => {
      const logos = [];
      const rows = 4;
      const cols = 5;
      const spacingX = 80;
      const spacingY = 30;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          logos.push({
            id: `${row}-${col}`,
            top: row * spacingY,
            left: col * spacingX + (row % 2 === 0 ? 0 : 40),
            opacity: 0.9,
          });
        }
      }
      return logos;
    }, []);

    return (
      <View
        style={[styles.balanceCard, { backgroundColor: colors.nightGreen }]}
      >
        <View style={styles.backgroundContainer}>
          {backgroundIcons.map((icon) => (
            <View
              key={icon.id}
              style={[
                styles.backgroundLogo,
                {
                  top: icon.top,
                  left: icon.left,
                  opacity: icon.opacity,
                },
              ]}
            >
              <BackgroundCar />
            </View>
          ))}
        </View>

        <View style={styles.walletIcon}>
          <FilledWallet color="#000000" />
        </View>

        <View style={styles.balanceContent}>
          <Text style={[commonStyling.title, styles.whiteText]}>
            Total balance
          </Text>
          <View style={styles.balanceRow}>
            <Text style={[commonStyling.title, styles.balanceAmount]}>
              <Text style={styles.currencySymbol}>₦</Text>
              {balance}
              <Text style={styles.decimal}>.00</Text>
            </Text>

            <Buttons
              title="Top up"
              icon={
                <Text
                  style={[
                    styles.plusIcon,
                    {
                      color: colors.buttonPrimaryText,
                    },
                  ]}
                >
                  +
                </Text>
              }
              onPress={onTopUp}
              height={40}
              type="primary"
            />
          </View>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  balanceCard: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    flexDirection: "row",
    columnGap: 8,
    borderRadius: 16,
    alignItems: "center",
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  backgroundLogo: {
    position: "absolute",
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  walletIcon: {
    backgroundColor: "#ffffff",
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },
  balanceContent: {
    width: "83%",
  },
  whiteText: {
    color: "#ffffff",
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  balanceAmount: {
    color: "#ffffff",
    fontSize: FONT_SIZES.HERO,
  },
  currencySymbol: {
    fontSize: FONT_SIZES.BUTTON,
    fontFamily: "Regular",
  },
  decimal: {
    fontSize: FONT_SIZES.BUTTON,
  },
  plusIcon: {
    fontSize: FONT_SIZES.BUTTON,
  },
});

export default WalletBalance;
