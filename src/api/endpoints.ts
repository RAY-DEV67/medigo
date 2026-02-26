export const AUTH_ENDPOINTS = {
  REQUEST_OTP: "/auth/otp/signup-request-otp",
  LOGIN_REQUEST_OTP: "/auth/otp/login-request-otp",
  VERIFY_OTP: "/auth/otp/verify-otp",
  RESEND_OTP: "/auth/otp/resend-otp",
  LOGOUT: "/auth/logout",
  REFRESH_TOKEN: "/auth/token/refresh",
} as const;
