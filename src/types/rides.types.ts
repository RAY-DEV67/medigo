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

export interface UpcomingRide {
  id: string;
  ride_type: string;
  trip_type: string;
  pickup_address: string;
  destination_address: string;
  scheduled_at: string;
  status: string;
  estimated_distance_miles: number;
  estimated_duration_minutes: number;
  estimated_fare: number;
  facility_name?: string;
}

export interface UpcomingRidesResponse {
  success: boolean;
  data: UpcomingRide[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface RideRating {
  id: string;
  ride_id: string;
  rated_user_id: string;
  rated_by_user_id: string;
  rating_type: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface RideDetail {
  id: string;
  rider_id: string;
  driver_id: string;
  ride_type: string;
  pickup_address: string;
  pickup_latitude: number;
  pickup_longitude: number;
  destination_address: string;
  destination_latitude: number;
  destination_longitude: number;
  status: string;
  estimated_fare: number;
  final_fare: number;
  rider_name: string;
  rider_rating: number;
  special_instructions: string;
  mobility_level: string;
  assistance_level: string;
  driver_rating?: RideRating; // Rating driver gave rider
  rider_rating_given?: RideRating; // Rating rider gave driver
  timeline: any[];
  scheduled_at: string;
  created_at: string;
}

export interface RideDetailResponse {
  success: boolean;
  message: string;
  data: RideDetail;
}

export type RideStatus =
  | "accepted"
  | "arrived"
  | "picked_up"
  | "dropped_off"
  | "cancelled";

export interface UpdateStatusPayload {
  status: RideStatus;
  notes?: string;
}

export interface TimelineEvent {
  from_status: string;
  to_status: string;
  timestamp: string;
  notes: string | null;
}

export interface TimelineResponse {
  success: boolean;
  message: string;
  data: TimelineEvent[];
}

export interface CancelRidePayload {
  reason: string;
}

export interface ActiveRideResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    rider_id: string;
    driver_id: string | null;
    pickup_address: string;
    destination_address: string;
    status: string;
    estimated_fare: number;
    scheduled_at: string;
  } | null;
}

