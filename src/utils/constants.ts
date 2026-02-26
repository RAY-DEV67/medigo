export const API_CONFIG = {
  BASE_URL: "https://api.dev.klimateride.com",
  TIMEOUT: 30000,
} as const;

export const STORAGE_KEYS = {
  TOKEN: "auth_token",
  USER: "user_data",
  REFRESH_TOKEN: "refresh_token",
  USER_ID: "user_id",
  PHONE: "userPhoneNumber",
};

export const OTP_DELIVERY_METHODS = {
  SMS: "sms",
  WHATSAPP: "whatsapp",
} as const;
