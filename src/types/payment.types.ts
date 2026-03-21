export interface AddPaymentPayload {
  method_type: string; // e.g., "card"
  card_number: string;
  expiry_month: string;
  expiry_year: string;
  holder_name: string;
  cvd: string;
}

export interface PaymentMethodResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    user_id: string;
    method_type: string;
    last_four: string;
    brand: string;
    holder_name: string;
    is_default: boolean;
    created_at: string;
  };
}

export interface PaymentMethod {
  id: string;
  user_id: string;
  method_type: string;
  last_four: string;
  brand: string;
  holder_name: string;
  is_default: boolean;
  created_at: string;
}

export interface PaymentMethodsResponse {
  success: boolean;
  message: string;
  data: PaymentMethod[];
}
