import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Eye, EyeOff, X, Mail } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import OtpInputField from "../../components/inputs/otpInput";
import useTheme from "../../hooks/useThemes";
import { commonStyles } from "../../styles/commonStyles";
import { FONT_SIZES } from "../../constants/sizes";
import Phone from "../../../assets/icons/phone";
import Input from "../../components/inputs/input";
import Buttons from "../../components/buttons/buttons";
import RightArrow from "../../../assets/icons/rightArrow";
import Padlock from "../../../assets/icons/padlock";
import Dropdown from "../../components/inputs/dropdown";
import MultilineInput from "../../components/inputs/multilineInput";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BackButton from "../../components/buttons/backButton";

const { width } = Dimensions.get("window");

// --- Types ---
type RiderStep = "initial" | "otp" | "password" | "bio" | "payment" | "success";

export default function RiderRegistrationFlow() {
  const [step, setStep] = useState<RiderStep>("initial");
  const [showPassword, setShowPassword] = useState(false);
  const [signUpMethod, setsignUpMethod] = useState("phone");
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { colors } = useTheme();
  const commonStyling = commonStyles(colors);
  const [selectedGender, setselectedGender] = useState("");

  // Reusable Step Header
  const StepHeader = ({ current, total, title, subTitle }: any) => (
    <View style={styles.header}>
      <BackButton />
      <View style={styles.stepIndicator}>
        <Text style={styles.stepText}>
          Step {current} of {total}
        </Text>
      </View>
      <Text
        style={[
          commonStyling.title,
          styles.mainTitle,
          {
            marginTop: 16,
          },
        ]}
      >
        {title}
      </Text>
      <Text style={[commonStyling.subtitle, styles.subTitle]}>{subTitle}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {step === "initial" && (
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
              </View>

              <Text style={[commonStyling.title, styles.mainTitle]}>
                Create Account
              </Text>
              <Text style={[commonStyling.subtitle, styles.subTitle]}>
                Sign up to book safe, reliable rides to your medical
                appointments.
              </Text>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  borderWidth: 1,
                  padding: 16,
                  columnGap: 12,
                  borderRadius: 16,
                  borderColor:
                    signUpMethod === "phone"
                      ? colors.primaryColor
                      : colors.stroke,
                  backgroundColor:
                    signUpMethod === "phone"
                      ? colors.highlightBlue50
                      : colors.surfacePrimary,
                }}
                onPress={() => {
                  setsignUpMethod("phone");
                }}
              >
                <View
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor:
                      signUpMethod === "phone"
                        ? colors.primaryColor
                        : colors.lightGray,
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Phone color={signUpMethod === "phone" ? "white" : "black"} />
                </View>
                <View>
                  <Text
                    style={[
                      commonStyling.subtitle,
                      {
                        color: colors.titleText,
                        fontFamily: "Medium",
                        marginBottom: 4,
                      },
                    ]}
                  >
                    Phone Number
                  </Text>
                  <Text
                    style={[
                      commonStyling.subtitle,
                      {
                        fontSize: FONT_SIZES.BODY,
                        fontFamily: "Medium",
                      },
                    ]}
                  >
                    We will send you a verification code
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  borderWidth: 1,
                  padding: 16,
                  columnGap: 12,
                  borderRadius: 16,
                  borderColor:
                    signUpMethod === "email"
                      ? colors.primaryColor
                      : colors.stroke,
                  marginTop: 16,
                  marginBottom: 24,
                  backgroundColor:
                    signUpMethod === "email"
                      ? colors.highlightBlue50
                      : colors.surfacePrimary,
                }}
                onPress={() => {
                  setsignUpMethod("email");
                }}
              >
                <View
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor:
                      signUpMethod === "email"
                        ? colors.primaryColor
                        : colors.lightGray,
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Mail color={signUpMethod === "email" ? "white" : "black"} />
                </View>
                <View>
                  <Text
                    style={[
                      commonStyling.subtitle,
                      {
                        color: colors.titleText,
                        fontFamily: "Medium",
                        marginBottom: 4,
                      },
                    ]}
                  >
                    Email Address
                  </Text>
                  <Text
                    style={[
                      commonStyling.subtitle,
                      {
                        fontSize: FONT_SIZES.BODY,
                        fontFamily: "Medium",
                      },
                    ]}
                  >
                    Sign up with your email
                  </Text>
                </View>
              </TouchableOpacity>

              {signUpMethod === "phone" && (
                <Input
                  title="Phone Number"
                  placeholder="(555) 000-0000"
                  value=""
                  onChangeText={() => {}}
                />
              )}
              {signUpMethod === "email" && (
                <Input
                  title="Email Address"
                  placeholder="you@example.com"
                  value=""
                  onChangeText={() => {}}
                />
              )}
              <Text
                style={[
                  commonStyling.subtitle,
                  styles.legalText,
                  {
                    fontSize: FONT_SIZES.BODY,
                  },
                ]}
              >
                By signing up, you agree to our{" "}
                <Text
                  style={{
                    color: colors.primaryColor,
                    fontFamily: "Medium",
                  }}
                >
                  Terms of Service
                </Text>{" "}
                and{" "}
                <Text
                  style={{
                    color: colors.primaryColor,
                    fontFamily: "Medium",
                  }}
                >
                  Privacy Policy
                </Text>
                . Your health information is protected under HIPAA.
              </Text>
            </View>

            <View>
              <Buttons
                title="Continue"
                onPress={() => setStep("otp")}
                rightIcon={<RightArrow />}
              />

              <TouchableOpacity
                style={{ marginTop: 16 }}
                onPress={() => {
                  navigation.navigate("Login");
                }}
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
                  Already have an account?{" "}
                  <Text
                    style={[
                      styles.linkText,
                      {
                        color: colors.primaryColor,
                      },
                    ]}
                  >
                    Log in
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {step === "otp" && (
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
              <StepHeader
                current={2}
                total={3}
                title="Enter OTP Code"
                subTitle="We've sent a 6-digit code to you@example.com"
              />
              <View style={styles.otpContainer}>
                <OtpInputField onFilled={() => {}} />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={[
                    commonStyling.subtitle,
                    styles.resendText,
                    {
                      fontSize: FONT_SIZES.BODY,
                    },
                  ]}
                >
                  Code expires in 0:56{" "}
                </Text>
                <Text
                  style={[
                    commonStyling.subtitle,
                    {
                      color: colors.primaryColor,
                      fontSize: FONT_SIZES.BODY,
                    },
                  ]}
                >
                  Resend Code
                </Text>
              </View>
            </View>

            <Buttons
              title="Verify and Continue"
              onPress={() => setStep("password")}
              rightIcon={<RightArrow />}
            />
          </View>
        )}

        {step === "password" && (
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
              <StepHeader
                current={3}
                total={3}
                title="Create Password"
                subTitle="Secure your account with a strong password."
              />
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordWrapper}>
                  <TextInput
                    secureTextEntry={!showPassword}
                    style={styles.inputFlex}
                    placeholder="Enter password"
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

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.passwordWrapper}>
                  <TextInput
                    secureTextEntry={!showPassword}
                    style={styles.inputFlex}
                    placeholder="Re-enter password"
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
                    Encryption & Security
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
                    Your password is encrypted using industry-standard security
                    protocols.
                  </Text>
                </View>
              </View>
            </View>

            <Buttons
              title="Create Account"
              onPress={() => setStep("bio")}
              rightIcon={<RightArrow />}
            />
          </View>
        )}

        {step === "bio" && (
          <ScrollView
            style={{
              flex: 1,
              paddingHorizontal: 24,
              paddingBottom: 40,
            }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <BackButton />
            </View>

            <Text style={[commonStyling.title, styles.mainTitle]}>
              Your Information
            </Text>
            <Text style={[commonStyling.subtitle, styles.subTitle]}>
              Help us provide you with the best care during your rides.
            </Text>
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Input
                  title="First Name"
                  placeholder="Jhon"
                  value=""
                  onChangeText={() => {}}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Input
                  title="Last Name"
                  placeholder="Doe"
                  value=""
                  onChangeText={() => {}}
                />
              </View>
            </View>
            <Dropdown
              label="Gender"
              data={["Male", "Female", "Others"]}
              selected={selectedGender}
              onSelect={(val) => setselectedGender(val)}
            />
            <Input
              title="Emergency Contact (Optional)"
              placeholder="(555) 000-0000"
              value=""
              onChangeText={() => {}}
            />

            <View
              style={{
                marginTop: 12,
              }}
            >
              <MultilineInput
                title="Medical Notes (Optional)"
                value=""
                onChangeText={() => {}}
                placeholder="Any special requirements or medical conditions we should know about..."
              />
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
                  marginTop: 32,
                  marginBottom: 16,
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
                  Privacy Protected
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
                  Your information is encrypted and HIPAA compliant. Only shared
                  with your assigned driver for safety.
                </Text>
              </View>
            </View>

            <Buttons
              title="Continue"
              rightIcon={<RightArrow />}
              onPress={() => navigation.navigate("ReviewAndAccept")}
            />
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// --- Internal Components ---

const InputLabel = ({ label, placeholder }: any) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#A0A6AD"
    />
  </View>
);

const PrimaryButton = ({ text, onPress, active }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.btn, active ? styles.btnActive : styles.btnInactive]}
  >
    <Text style={styles.btnText}>{text}</Text>
  </TouchableOpacity>
);

// --- Styles ---
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
