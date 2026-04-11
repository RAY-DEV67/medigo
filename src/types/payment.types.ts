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

export interface WalletBalance {
  available_balance: number;
  total_earned: number;
  total_withdrawn: number;
  pending_withdrawal: number;
}

export interface WalletResponse {
  success: boolean;
  message: string;
  data: WalletBalance;
}

export interface EarningsSummary {
  available_balance: number;
  next_payout_date: string;
  next_payout_method: string;
  earnings_today: number;
  earnings_today_change_percent: number;
  trips_today: number;
  hours_today: number;
  avg_earnings_per_trip: number;
}

export interface EarningsSummaryResponse {
  success: boolean;
  message: string;
  data: EarningsSummary;
}

export interface EarningsHistoryItem {
  date: string;
  label: string; // e.g., "Mon", "Tue"
  trip_count: number;
  earnings: number;
  change_percent: number;
}

export interface EarningsHistoryResponse {
  success: boolean;
  message: string;
  data: EarningsHistoryItem[];
}

export interface FareEstimatePayload {
  pickup_address?: string;
  pickup_latitude?: number;
  pickup_longitude?: number;
  destination_address?: string;
  destination_latitude?: number;
  destination_longitude?: number;
  scheduled_at?: string;
  use_highway_407?: boolean;
  is_dialysis_trip?: boolean;
}

export interface FareEstimateResponse {
  success: boolean;
  data: {
    distance_km: number;
    distance_miles: number;
    duration_minutes: number;
    base_fare: number;
    distance_charge: number;
    total_fare: number;
    currency: string;
    surcharge_details: any[];
  };
}
