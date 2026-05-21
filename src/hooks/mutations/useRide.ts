import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert, Linking, Share } from "react-native";
import rideService from "../../api/services/rideService";
import {
  CancelRidePayload,
  CreateRideRequest,
  ShareRideResponse,
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
        queryKey: ["my-rides"],
      });
    },
    onError: (error: any) => {},
  });
};

export const useShareRide = () => {
  return useMutation({
    mutationFn: (rideId: string) => rideService.shareRideLink(rideId),
    onSuccess: async (response: ShareRideResponse) => {
      const shareUrl = response?.data?.share_url;

      if (!shareUrl) {
        Alert.alert("Error", "Could not generate tracking link.");
        return;
      }

      try {
        // Triggers the iOS / Android native system share sheet
        const result = await Share.share({
          message: `Hey! You can track my ride live using this link: ${shareUrl}`,
          url: shareUrl, // Optional fallback property tailored heavily for iOS share sheets
          title: "Track My Medigo Ride", // Pre-fills the subject line for Email shares
        });

        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // Shared successfully via a specific activity type (iOS only)
            console.log(`Shared via ${result.activityType}`);
          } else {
            // Shared successfully generally
            console.log("Link shared successfully!");
          }
        } else if (result.action === Share.dismissedAction) {
          // User dismissed/canceled the share sheet tray
          console.log("Share sheet dismissed");
        }
      } catch (err: any) {
        Alert.alert(
          "Error",
          "An error occurred while opening the share option.",
        );
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.detail?.[0]?.msg ||
        error?.response?.data?.message ||
        "Failed to generate share link. Please try again.";

      Alert.alert("Error", errorMessage);
    },
  });
};
