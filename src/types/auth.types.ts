export interface User {
  id: string;
  phone_number: string;
  email?: string;
  name?: string;
  profile_picture?: string;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  user_id: User;
  message?: string;
}

export interface RequestOTPPayload {
  phone_number: string;
  otp_delivery_method: "sms" | "whatsapp";
  role: "rider";
}

export interface VerifyOTPPayload {
  phoneNumber: string;
  otp: string;
  device_id: string;
}

export interface ResendOTPPayload {
  phoneNumber: string;
  otp_delivery_method: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  phone_number: string;
  email?: string;
  name?: string;
  password?: string;
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface ErrorResponse {
  detail: string | ValidationError[];
}
export interface OTPResponse {
  message: string;
  status?: string; // Optional if not always present
}
