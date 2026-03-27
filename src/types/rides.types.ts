export interface Ride {
  id: string;
  rider_id: string;
  driver_id: string | null;
  business_id: string;
  ride_type: string;
  trip_type: string;
  trip_structure: string;
  pickup_address: string;
  destination_address: string;
  scheduled_at: string;
  status:
    | "pending"
    | "accepted"
    | "in_progress"
    | "completed"
    | "cancelled"
    | string;
  estimated_distance_miles: number;
  estimated_duration_minutes: number;
  estimated_fare: number;
  final_fare: number;
  special_instructions: string;
  visit_type: string;
  facility_name: string;
  created_at: string;
}

export interface RidesResponse {
  success: boolean;
  data: Ride[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface RidesQueryParams {
  status?: string | null;
  page?: number;
  limit?: number;
}

export interface CreateRideRequest {
  ride_type: string;
  trip_type: "transport_only" | string;
  trip_structure: "one_way" | "round_trip";
  pickup_address: string;
  pickup_latitude: number;
  pickup_longitude: number;
  destination_address: string;
  destination_latitude: number;
  destination_longitude: number;
  scheduled_at: string; // ISO String
  passenger_id: string;
  visit_type: string;
  appointment_time: string; // ISO String
  facility_name: string;
  special_instructions: string;
  mobility_level: string;
  assistance_level: string;
  estimated_distance_miles: number;
  estimated_duration_minutes: number;
  estimated_fare: number;
  business_id: string;
}


