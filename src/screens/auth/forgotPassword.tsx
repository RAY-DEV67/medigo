import { Eye, EyeOff, Info } from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
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
import { useForgotPassword, useLogin } from "../../hooks/mutations/useAuth";

function ForgotPassword() {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const commonStyling = commonStyles(colors);
  const [formData, setFormData] = useState<any>({
    identifier: "",
  });
  const { mutate, isPending } = useForgotPassword();

  const handleReset = () => {
    if (!formData.identifier)
      return Alert.alert(
        "Required",
        "Please enter your email or phone number.",
      );

    // Simple logic to determine if input is email or phone
    const isEmail = formData.identifier.includes("@");
    const payload = isEmail
      ? { email: formData.identifier }
      : { phone: formData.identifier };

    mutate(payload, {
      onSuccess: () => {
        navigation.navigate("Login");
      },
    });
  };

  const updateFields = (fields: Partial<any>) => {
    setFormData((prev: any) => ({ ...prev, ...fields }));
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.surfacePrimary,
        },
      ]}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          flexDirection: "column",
          justifyContent: "space-between",
          paddingBottom: 30,
          paddingTop: 16,
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
                  fontSize: 30,
                  fontFamily: "Bold",
                },
              ]}
            >
              Forgot Password?
            </Text>
            <Text style={[commonStyling.subtitle, styles.subTitle]}>
              Enter your email address or phone number and we'll send you a link
              to reset your password.
            </Text>
          </View>
          <View>
            <View style={styles.inputContainer}>
              <Input
                title="Phone Number / Email Address"
                placeholder=""
                value={formData.identifier}
                onChangeText={(val) => updateFields({ identifier: val })}
              />
            </View>

            <View
              style={[
                {
                  backgroundColor: colors.lightYellow,
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
              <Info color="#F59E0B" fill="#F59E0B" />
              <View>
                <Text
                  style={[
                    commonStyling.title,
                    {
                      fontSize: 14,
                      color: colors.darkYellow,
                      fontFamily: "Medium",
                      marginBottom: 2,
                    },
                  ]}
                >
                  Check Your Inbox
                </Text>
                <Text
                  style={[
                    commonStyling.subtitle,
                    {
                      fontSize: 12,
                      color: colors.darkYellow,
                      lineHeight: 20,
                      paddingRight: 16,
                    },
                  ]}
                >
                  The reset link will expire in 15 minutes. Check your spam
                  folder if you don't see it.
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Buttons
            title="Send Reset Link"
            onPress={handleReset}
            loading={isPending}
            rightIcon={<RightArrow />}
          />
          <TouchableOpacity
            style={{
              marginTop: 12,
            }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text
              style={[
                commonStyling.subtitle,
                styles.footerText,
                {
                  fontSize: FONT_SIZES.BODY,
                  fontFamily: "SemiBold",
                  marginTop: 8,
                },
              ]}
            >
              Back to login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
    marginBottom: 8,
  },
  subTitle: {
    lineHeight: 22,
  },
  inputContainer: { marginBottom: 8 },
  label: { marginBottom: 8 },
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

export default ForgotPassword;
