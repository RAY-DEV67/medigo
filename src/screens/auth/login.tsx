import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "../../hooks/useThemes";
import Padlock from "../../../assets/icons/padlock";
import { FONT_SIZES } from "../../constants/sizes";
import Buttons from "../../components/buttons/buttons";
import RightArrow from "../../../assets/icons/rightArrow";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { commonStyles } from "../../styles/commonStyles";
import BackButton from "../../components/buttons/backButton";
import Input from "../../components/inputs/input";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const commonStyling = commonStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          flexDirection: "column",
          justifyContent: "space-between",
          paddingBottom: 30,
        }}
      >
        <View>
          <View style={styles.header}>
            <BackButton />

            <Text
              style={[
                commonStyling.title,
                styles.mainTitle,
                {
                  marginTop: 16,
                },
              ]}
            >
              Welcome Back
            </Text>
            <Text style={[commonStyling.subtitle, styles.subTitle]}>
              Log in to your rider account to start booking rides.
            </Text>
          </View>
          <View>
            <View style={styles.inputContainer}>
              <Input
                title="Phone Number"
                placeholder="(555) 000-0000"
                value=""
                onChangeText={() => {}}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  secureTextEntry={!showPassword}
                  style={styles.inputFlex}
                  placeholder="Enter your password"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#6C7278" />
                  ) : (
                    <Eye size={20} color="#6C7278" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                marginBottom: 32,
                alignItems: "flex-end",
              }}
            >
              <Text
                style={[
                  styles.linkText,
                  {
                    color: colors.primaryColor,
                  },
                ]}
              >
                Forgot Password?
              </Text>
            </View>

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
                },
              ]}
            >
              <Padlock />
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
                  Secure Login
                </Text>
                <Text
                  style={[
                    commonStyling.subtitle,
                    {
                      fontSize: FONT_SIZES.BODY,
                      color: colors.primaryColor,
                      lineHeight: 20,
                      paddingRight: 16,
                    },
                  ]}
                >
                  Your credentials are encrypted and protected. We never share
                  your information.
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Buttons
            title="Log in"
            onPress={() => navigation.navigate("RiderMain")}
            rightIcon={<RightArrow />}
          />
          <TouchableOpacity
            style={{
              marginTop: 12,
            }}
            onPress={() => navigation.navigate("RiderRegistrationFlow")}
          >
            <Text
              style={[
                commonStyling.subtitle,
                styles.footerText,
                {
                  fontSize: FONT_SIZES.BODY,
                  fontFamily: "SemiBold",
                },
              ]}
            >
              Don't have an account?{" "}
              <Text
                style={[
                  styles.linkText,
                  {
                    color: colors.primaryColor,
                  },
                ]}
              >
                Sign Up
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  scrollContent: { padding: 24 },
  header: { marginBottom: 24 },
  backBtn: { marginBottom: 20 },
  stepIndicator: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  stepText: { color: "#3B82F6", fontSize: 12, fontWeight: "700" },
  mainTitle: {
    fontSize: FONT_SIZES.HERO,
    fontFamily: "Bold",
    marginBottom: 8,
  },
  subTitle: {
    lineHeight: 22,
    marginBottom: 20,
  },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", color: "#1A1C1E", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#E5E9EF",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E9EF",
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  inputFlex: { flex: 1, paddingVertical: 16, fontSize: 16 },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: "#E5E9EF",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },

  btn: { padding: 18, borderRadius: 50, alignItems: "center", marginTop: 10 },
  btnActive: { backgroundColor: "#3B82F6" },
  btnInactive: { backgroundColor: "#BFDBFE" },
  btnText: { color: "#FFF", fontWeight: "700", fontSize: 16 },
  legalText: {
    marginBottom: 24,
  },
  row: { flexDirection: "row", marginBottom: 10 },

  resendText: { textAlign: "center" },
  // footerContainer: { marginTop: "auto", paddingBottom: 20 },
  footerText: { textAlign: "center" },
  linkText: { fontWeight: "700" },
});

export default Login;
