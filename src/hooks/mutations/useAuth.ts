import { useMutation } from "@tanstack/react-query";
import authService from "../../api/services/authService";
import {
  DriverRegisterRequest,
  RegisterPayload,
  ResendOtpParams,
  VerifyOTPPayload,
} from "../../types/auth.types";
import { Alert } from "react-native";
import { storage } from "../../utils/storage";
import { ForgotPasswordRequest } from "../../types/user.types";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: (data) => {
      // Handle success (e.g., redirect to OTP verification or show toast)
      console.log("Registration successful:", data.message);
    },
    onError: (error: any) => {
      // Handle error (e.g., show validation errors from the 422 response)
      console.error(
        "Registration failed:",
        error.response?.data?.detail || error.message,
      );
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: any) => authService.login(payload),
    onSuccess: async (data) => {
      // Handle success (e.g., redirect to OTP verification or show toast)
      console.log("Registration successful:", data.message);
      console.log("OTP Verified:", data);
      if (data.data.access_token) {
        await storage.setToken(data.data.access_token);
      }
      if (data.data.refresh_token) {
        await storage.setRefreshToken(data.data.refresh_token);
      }
      if (data.data.user_id) {
        await storage.setUser(data.data.user_id);
      }
    },
    onError: (error: any) => {
      // Handle error (e.g., show validation errors from the 422 response)
      console.error(
        "Registration failed:",
        error.response?.data?.detail || error.message,
      );
    },
  });
};

export const useVerifyOTPMutation = () => {
  return useMutation({
    mutationFn: (payload: VerifyOTPPayload) =>
      authService.verifyRegistrationOTP(payload),
    onSuccess: async (data) => {
      // Logic for when verification is successful
      console.log("OTP Verified:", data);
    },
    onError: (error: any) => {
      // Logic for 422 Validation errors or invalid codes
      const errorMsg = error.response?.data?.detail?.[0]?.msg || "Invalid OTP";
      console.error("Verification Error:", errorMsg);
      Alert.alert("Verification Error:", errorMsg);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) =>
      authService.forgotPassword(data),

    onSuccess: (response) => {
      Alert.alert(
        "Check your inbox",
        response.message || "A reset link has been sent.",
      );
    },

    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.detail?.[0]?.msg ||
        "Something went wrong. Please try again.";
      Alert.alert("Error", errorMessage);
    },
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: (params: ResendOtpParams) => authService.resendOtp(params),

    onSuccess: (response) => {
      Alert.alert("Success", response.message || "OTP resent successfully.");
    },

    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.detail?.[0]?.msg ||
        "Failed to resend OTP. Please try again later.";
      Alert.alert("Error", errorMessage);
    },
  });
};

export const useRegisterDriver = () => {
  return useMutation({
    mutationFn: (data: DriverRegisterRequest) =>
      authService.registerDriver(data),

    onSuccess: (response) => {
      Alert.alert(
        "Success",
        response.data.message || "Account created successfully.",
      );
    },

    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.detail?.[0]?.msg ||
        "Registration failed. Please check your token and try again.";
      Alert.alert("Registration Error", errorMessage);
    },
  });
};
