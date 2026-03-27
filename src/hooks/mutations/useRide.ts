import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import rideService from "../../api/services/rideService";
import { CreateRideRequest } from "../../types/rides.types";

export const useCreateRide = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRideRequest) => rideService.createRide(data),
    onSuccess: (response) => {
      // Invalidate existing rides list to trigger a refresh
      queryClient.invalidateQueries({ queryKey: ["rides"] });

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
