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
import {
  ChevronLeft,
  Eye,
  EyeOff,
  ShieldCheck,
  CreditCard,
  X,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import OtpInputField from "../../components/inputs/otpInput";

const { width } = Dimensions.get("window");

// --- Types ---
type RiderStep = "initial" | "otp" | "password" | "bio" | "payment" | "success";

export default function RiderRegistrationFlow() {
  const [step, setStep] = useState<RiderStep>("initial");
  const [showPassword, setShowPassword] = useState(false);
  const [signUpMethod, setsignUpMethod] = useState("phone");
  const navigation = useNavigation();

  // Reusable Step Header
  const StepHeader = ({ current, total, title, subTitle }: any) => (
    <View style={styles.header}>
      {/* Update the back button to use navigation.goBack() */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
      >
        <ChevronLeft color="#1A1C1E" size={24} />
      </TouchableOpacity>
      <View style={styles.stepIndicator}>
        <Text style={styles.stepText}>
          Step {current} of {total}
        </Text>
      </View>
      <Text style={styles.mainTitle}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
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
              <StepHeader
                current={1}
                total={3}
                title="Create Account"
                subTitle="Sign up to book safe, reliable rides to your medical appointments."
              />

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  borderWidth: 1,
                  padding: 12,
                  columnGap: 8,
                  borderRadius: 8,
                }}
                onPress={() => {
                  setsignUpMethod("phone");
                }}
              >
                <View
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor: "blue",
                    borderRadius: 50,
                  }}
                ></View>
                <View>
                  <Text>Phone Number</Text>
                  <Text>We will send you a verification code</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  borderWidth: 1,
                  padding: 12,
                  columnGap: 8,
                  borderRadius: 8,
                  marginVertical: 16,
                }}
                onPress={() => {
                  setsignUpMethod("email");
                }}
              >
                <View
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor: "blue",
                    borderRadius: 50,
                  }}
                ></View>
                <View>
                  <Text>Email Address</Text>
                  <Text>Sign up with your email</Text>
                </View>
              </TouchableOpacity>
              {signUpMethod === "phone" && (
                <InputLabel
                  label="Phone Number"
                  icon="phone"
                  placeholder="(555) 000-0000"
                />
              )}
              {signUpMethod === "email" && (
                <InputLabel
                  label="Email Address"
                  icon="mail"
                  placeholder="you@example.com"
                />
              )}
              <Text style={styles.legalText}>
                By signing up, you agree to our{" "}
                <Text style={styles.link}>Terms of Service</Text> and{" "}
                <Text style={styles.link}>Privacy Policy</Text>.
              </Text>
            </View>
            <PrimaryButton
              text="Continue"
              onPress={() => setStep("otp")}
              active
            />
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
                <Text style={styles.resendText}>Code expires in 0:56 </Text>
                <Text style={styles.link}>Resend Code</Text>
              </View>
            </View>
            <PrimaryButton
              text="Verify and Continue"
              onPress={() => setStep("password")}
              active
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
              <View style={styles.securityNote}>
                <ShieldCheck size={16} color="#3B82F6" />
                <Text style={styles.securityText}>
                  Your password is encrypted using industry-standard security
                  protocols.
                </Text>
              </View>
            </View>
            <PrimaryButton
              text="Create Account"
              onPress={() => setStep("bio")}
              active
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
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backBtn}
              >
                <ChevronLeft color="#1A1C1E" size={24} />
              </TouchableOpacity>
            </View>

            <Text
              style={[
                styles.mainTitle,
                {
                  marginTop: -16,
                },
              ]}
            >
              Your Information
            </Text>
            <Text style={styles.subTitle}>
              Help us provide you with the best care during your rides.
            </Text>
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <InputLabel label="First Name" placeholder="John" />
              </View>
              <View style={{ flex: 1 }}>
                <InputLabel label="Last Name" placeholder="Doe" />
              </View>
            </View>
            <InputLabel label="Date of Birth" placeholder="MM/DD/YYYY" />
            <InputLabel label="Gender" placeholder="Select your gender" />
            <InputLabel
              label="Emergency Contact (Optional)"
              icon="phone"
              placeholder="(555) 000-0000"
            />
            <InputLabel label="Medical Notes (Optional)" placeholder="John" />

            <View style={styles.securityNote}>
              <ShieldCheck size={16} color="#3B82F6" />
              <Text style={styles.securityText}>
                Your password is encrypted using industry-standard security
                protocols.
              </Text>
            </View>
            <PrimaryButton
              text="Continue"
              onPress={() => setStep("payment")}
              active
            />
          </ScrollView>
        )}

        {step === "payment" && (
          <ScrollView
            style={{
              flex: 1,
              paddingHorizontal: 24,
              paddingBottom: 40,
            }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backBtn}
              >
                <ChevronLeft color="#1A1C1E" size={24} />
              </TouchableOpacity>
            </View>
            <Text
              style={[
                styles.mainTitle,
                {
                  marginTop: -16,
                },
              ]}
            >
              Payment Method
            </Text>
            <Text style={styles.subTitle}>
              Add a payment method to complete your setup.
            </Text>
            <View style={styles.creditCardVisual}>
              <CreditCard color="#FFF" size={32} />
              <Text style={styles.cardDigits}>**** **** **** 3456</Text>
              <View style={styles.cardRow}>
                <Text style={styles.cardInfo}>JOHN DOE</Text>
                <Text style={styles.cardInfo}>05/28</Text>
              </View>
            </View>
            <InputLabel label="Card Number" placeholder="1234 5678 9012 3456" />
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <InputLabel label="Expiry date" placeholder="mm/yy" />
              </View>
              <View style={{ flex: 1 }}>
                <InputLabel label="CVV" placeholder="123" />
              </View>
            </View>
            <InputLabel label="Cardholder Name" placeholder="Jhon" />
            <View style={styles.securityNote}>
              <ShieldCheck size={16} color="#3B82F6" />
              <Text style={styles.securityText}>
                Your password is encrypted using industry-standard security
                protocols.
              </Text>
            </View>
            <View>
              <PrimaryButton
                text="Save & Continue"
                onPress={() => setStep("success")}
                active
              />
              <Text
                style={{
                  marginTop: 16,
                  textAlign: "center",
                }}
              >
                Skip for now
              </Text>
            </View>
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
    fontSize: 28,
    fontWeight: "800",
    color: "#1A1C1E",
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 15,
    color: "#6C7278",
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
  securityNote: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 8,
    marginBottom: 32,
  },
  securityText: { fontSize: 12, color: "#6C7278", marginLeft: 8, flex: 1 },
  btn: { padding: 18, borderRadius: 50, alignItems: "center", marginTop: 10 },
  btnActive: { backgroundColor: "#3B82F6" },
  btnInactive: { backgroundColor: "#BFDBFE" },
  btnText: { color: "#FFF", fontWeight: "700", fontSize: 16 },
  legalText: {
    fontSize: 12,
    color: "#6C7278",
    marginBottom: 24,
  },
  link: { color: "#3B82F6", fontWeight: "700" },
  row: { flexDirection: "row", marginBottom: 10 },
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
  cardInfo: { color: "#FFF", fontSize: 12, opacity: 0.8 },
  resendText: { textAlign: "center", color: "#6C7278" },
});
