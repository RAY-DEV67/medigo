import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import rideService from "../../api/services/rideService";
import {
  CancelRidePayload,
  CreateRideRequest,
  UpdateStatusPayload,
} from "../../types/rides.types";

export const useCreateRide = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRideRequest) => rideService.createRide(data),
    onSuccess: (response) => {
      // Invalidate existing rides list to trigger a refresh
      queryClient.invalidateQueries({ queryKey: ["my-rides"] });

      Alert.alert("Success", "Your ride has been scheduled successfully!");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.detail?.[0]?.msg || "Failed to create ride";
      Alert.alert("Booking Error", errorMessage);
      console.error("Ride Creation Error:", error.response?.data);
    },
  });
};

export const useUpdateRideStatus = (rideId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateStatusPayload) =>
      rideService.updateRideStatus(rideId, payload),
    onSuccess: (response) => {
      // Refresh the specific ride details
      queryClient.invalidateQueries({ queryKey: ["ride-detail", rideId] });

      // Also refresh the general driver status if you have a "current ride" query
      queryClient.invalidateQueries({ queryKey: ["active-rides"] });
    },
    onError: (error: any) => {},
  });
};

export const useCancelRide = (rideId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CancelRidePayload) =>
      rideService.cancelRide(rideId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-rides", "upcoming-rides", rideId],
      });
    },
    onError: (error: any) => {},
  });
};
