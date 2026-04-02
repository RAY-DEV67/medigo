export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship_type: string;
  is_primary: boolean;
}

export interface EmergencyContactsResponse {
  success: boolean;
  message: string;
  data: EmergencyContact[];
}

export interface UpdateConsentPayload {
  consent_emergency_services: boolean;
  consent_privacy_policy: boolean;
  consent_terms_of_service: boolean;
  consent_data_location: boolean;
}

export interface ConsentResponse {
  success: boolean;
  message: string;
  data: {
    consent_emergency_services: boolean;
    consent_privacy_policy: boolean;
    consent_terms_of_service: boolean;
    consent_data_location: boolean;
    consent_accepted_at: string;
  };
}

export interface SavedLocation {
  id: string;
  label: string; // e.g., "Home", "General Hospital"
  location_type: string; // e.g., "home", "work", "other"
  address: string;
  latitude: number;
  longitude: number;
  place_id?: string;
  notes?: string;
  is_default: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SavedLocationsResponse {
  success: boolean;
  message: string;
  data: SavedLocation[];
}

export interface CreateLocationPayload {
  label: string;
  location_type: "home" | "work" | "other" | string;
  address: string;
  latitude: number;
  longitude: number;
  place_id?: string;
  notes?: string;
  is_default: boolean;
}

export interface CreateLocationResponse {
  success: boolean;
  message: string;
  data: SavedLocation;
}

export interface ForgotPasswordRequest {
  email?: string;
  phone?: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  data: string;
}

export interface UpdateLocationRequest {
  label: string;
  location_type: "home" | "work" | "other" | string;
  address: string;
  latitude: number;
  longitude: number;
  place_id?: string;
  notes?: string;
  is_default: boolean;
}

export interface CreateEmergencyContactRequest {
  name: string;
  phone: string;
  relationship_type: string;
  is_primary: boolean;
}

export interface UpdateStatusPayload {
  is_online: boolean;
}

export interface DriverStatusResponse {
  success: boolean;
  message: string;
  data: {
    is_online: boolean;
    user_id: string;
  };
}

export interface DriverProfile {
  user_id: string;
  business_id: string;
  license_number: string;
  license_expiry: string;
  vehicle_type: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: number;
  vehicle_plate: string;
  vehicle_color: string;
  vehicle_vin: string;
  vehicle_photo_url: string;
  vehicle_verified: boolean;
  background_check_status: string;
  is_approved: boolean;
  is_online: boolean;
  rating: number;
  total_trips: number;
}

export interface DriverProfileResponse {
  success: boolean;
  message: string;
  data: DriverProfile;
}
