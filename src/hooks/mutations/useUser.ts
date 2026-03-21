import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UpdateProfilePayload,
  UserProfileResponse,
} from "../../types/auth.types";
import userService from "../../api/services/userService";
import {
  CreateLocationPayload,
  UpdateConsentPayload,
} from "../../types/user.types";

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      userService.updateProfile(payload),
    onSuccess: (data) => {
      // Invalidate the 'user-profile' query to refresh data across the app
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      console.log("Profile updated successfully");
    },
    onError: (error: any) => {
      const errorMsg =
        error.response?.data?.detail?.[0]?.msg || "Failed to update profile";
      console.error("Update Error:", errorMsg);
    },
  });
};

export const useUpdateConsentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateConsentPayload) =>
      userService.updateConsent(payload),
    onSuccess: (data) => {
      // Refresh user profile to reflect that onboarding/consent is complete
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      console.log("Consents updated successfully");
    },
    onError: (error: any) => {
      const errorMsg =
        error.response?.data?.detail?.[0]?.msg || "Failed to update consent";
      console.error("Consent Error:", errorMsg);
    },
  });
};

export const useCreateLocationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateLocationPayload) =>
      userService.createSavedLocation(payload),
    onSuccess: (data) => {
      // Invalidate the list query to trigger a background refetch
      queryClient.invalidateQueries({ queryKey: ["saved-locations"] });
      console.log("Location saved:", data.message);
    },
    onError: (error: any) => {
      const errorMsg =
        error.response?.data?.detail?.[0]?.msg || "Failed to save location";
      console.error("Save Location Error:", errorMsg);
    },
  });
};
