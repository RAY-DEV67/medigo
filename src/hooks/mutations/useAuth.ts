import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { Alert } from "react-native";
import { AxiosError } from "axios";
import authService from "../../api/services/authService";
import { storage } from "../../utils/storage";
import {
  RequestOTPPayload,
  VerifyOTPPayload,
  AuthResponse,
  ErrorResponse,
  ResendOTPPayload,
  OTPResponse,
} from "../../types/auth.types";
import Toast from "react-native-toast-message";

export const useRequestOTP = (): UseMutationResult<
  OTPResponse,
  AxiosError<ErrorResponse>,
  RequestOTPPayload
> => {
  return useMutation({
    mutationFn: authService.requestOTP,
    onSuccess: (data) => {
      Toast.show({
        text1: data.message,
      });
    },
    onError: (error) => {
      const errorDetail = error?.response?.data?.detail;
      const errorMessage = Array.isArray(errorDetail)
        ? errorDetail[0]?.msg
        : errorDetail || "Failed to send OTP";
      Alert.alert("Error", errorMessage);
      console.log(error.response);
    },
  });
};

export const useLoginRequestOtp = (): UseMutationResult<
  string,
  AxiosError<ErrorResponse>,
  RequestOTPPayload
> => {
  return useMutation({
    mutationFn: authService.loginRequestOTP,
    onSuccess: (data) => {
      Alert.alert("Success", "OTP has been sent to your phone");
    },
    onError: (error) => {
      const errorDetail = error?.response?.data?.detail;
      const errorMessage = Array.isArray(errorDetail)
        ? errorDetail[0]?.msg
        : errorDetail || "Failed to send OTP";
      Alert.alert("Error", errorMessage);
      console.log(error.response?.data);
    },
  });
};

/**
 * Hook for verifying OTP
 */
export const useVerifyOTP = (): UseMutationResult<
  AuthResponse,
  AxiosError<ErrorResponse>,
  VerifyOTPPayload
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.verifyOTP,
    onSuccess: async (data) => {
      // Store token and user data
      if (data.access_token) {
        await storage.setToken(data.access_token);
      }
      if (data.refresh_token) {
        await storage.setRefreshToken(data.refresh_token);
      }
      if (data.user_id) {
        await storage.setUser(data.user_id);
      }

      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.detail || "Invalid OTP";
      const displayMessage =
        typeof errorMessage === "string" ? errorMessage : "Invalid OTP";
      Alert.alert("Error", displayMessage);
    },
  });
};

export const useResendOTP = (): UseMutationResult<
  OTPResponse,
  AxiosError<ErrorResponse>,
  ResendOTPPayload
> => {
  return useMutation({
    mutationFn: authService.resendOTP,
    onSuccess: (data) => {
      Toast.show({
        text1: data.message,
      });
    },
  });
};

export const useLogout = (): UseMutationResult<
  void,
  AxiosError<ErrorResponse>,
  string
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: async () => {
      // Clear all auth data
      await storage.clearAuth();

      // Clear all queries
      queryClient.clear();

      Alert.alert("Success", "Logged out successfully");
    },
    onError: async (error) => {
      // Even if API call fails, clear local data
      await storage.clearAuth();
      queryClient.clear();

      console.error("Logout error:", error);
    },
  });
};
