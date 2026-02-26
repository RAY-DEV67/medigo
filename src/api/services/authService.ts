import { AxiosResponse } from "axios";
import apiClient from "../client";
import { AUTH_ENDPOINTS } from "../endpoints";
import {
  RequestOTPPayload,
  VerifyOTPPayload,
  AuthResponse,
  ResendOTPPayload,
  OTPResponse,
} from "../../types/auth.types";

const authService = {
  requestOTP: async (payload: RequestOTPPayload): Promise<OTPResponse> => {
    const response: AxiosResponse<OTPResponse> = await apiClient.post(
      AUTH_ENDPOINTS.REQUEST_OTP,
      {
        phone_number: payload.phone_number,
        otp_delivery_method: payload.otp_delivery_method,
      },
    );
    return response.data;
  },

  loginRequestOTP: async (payload: RequestOTPPayload): Promise<string> => {
    const response: AxiosResponse<string> = await apiClient.post(
      AUTH_ENDPOINTS.LOGIN_REQUEST_OTP,
      payload,
    );
    return response.data;
  },

  verifyOTP: async (payload: VerifyOTPPayload): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await apiClient.post(
      AUTH_ENDPOINTS.VERIFY_OTP,
      {
        phone_number: payload.phoneNumber,
        otp: payload.otp,
        device_id: payload.device_id,
      },
    );
    return response.data;
  },

  resendOTP: async (payload: ResendOTPPayload): Promise<OTPResponse> => {
    const response: AxiosResponse<OTPResponse> = await apiClient.post(
      AUTH_ENDPOINTS.REQUEST_OTP,
      {
        phone_number: payload.phoneNumber,
        otp_delivery_method: payload.otp_delivery_method,
      },
    );

    return response.data;
  },

  logout: async (refreshToken: string): Promise<void> => {
    await apiClient.post(AUTH_ENDPOINTS.LOGOUT, {
      refresh_token: refreshToken,
    });
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await apiClient.post(
      AUTH_ENDPOINTS.REFRESH_TOKEN,
      {
        refresh_token: refreshToken,
      },
    );
    return response.data;
  },
};

export default authService;
