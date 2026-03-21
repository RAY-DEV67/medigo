import { AxiosResponse } from "axios";
import apiClient from "../client";
import { AUTH_ENDPOINTS } from "../endpoints";
import {
  RequestOTPPayload,
  VerifyOTPPayload,
  AuthResponse,
  ResendOTPPayload,
  OTPResponse,
  RegisterPayload,
  RegisterResponse,
  VerifyOTPResponse,
  ResendOtpParams,
  ResendOtpResponse,
  DriverRegisterRequest,
  DriverRegisterResponse,
} from "../../types/auth.types";
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from "../../types/user.types";

const authService = {
  register: async (payload: RegisterPayload): Promise<RegisterResponse> => {
    const response: AxiosResponse<RegisterResponse> = await apiClient.post(
      AUTH_ENDPOINTS.REGISTER,
      payload,
    );
    return response.data;
  },

  login: async (payload: any): Promise<any> => {
    const response: AxiosResponse<any> = await apiClient.post(
      AUTH_ENDPOINTS.LOGIN,
      payload,
    );
    return response.data;
  },

  verifyRegistrationOTP: async (payload: any): Promise<VerifyOTPResponse> => {
    const response: AxiosResponse<VerifyOTPResponse> = await apiClient.post(
      AUTH_ENDPOINTS.VERIFY_OTP,
      payload,
    );
    return response.data;
  },

  forgotPassword: async (
    data: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> => {
    const response: AxiosResponse<ForgotPasswordResponse> =
      await apiClient.post("/auth/forgot-password", data);
    return response.data;
  },

  resendOtp: async ({
    user_id,
    purpose = "registration",
  }: ResendOtpParams): Promise<ResendOtpResponse> => {
    const response: AxiosResponse<ResendOtpResponse> = await apiClient.post(
      "/auth/resend-otp",
      null, // No request body
      {
        params: {
          user_id,
          purpose,
        },
      },
    );
    return response.data;
  },

  registerDriver: async (
    data: DriverRegisterRequest,
  ): Promise<DriverRegisterResponse> => {
    const response: AxiosResponse<DriverRegisterResponse> =
      await apiClient.post("/auth/driver/register", data);
    return response.data;
  },
};

export default authService;
