import { AxiosResponse } from "axios";
import apiClient from "../client";
import {
  UpdateProfilePayload,
  UserProfileResponse,
} from "../../types/auth.types";
import {
  ConsentResponse,
  CreateLocationPayload,
  CreateLocationResponse,
  EmergencyContactsResponse,
  SavedLocationsResponse,
  UpdateConsentPayload,
} from "../../types/user.types";

const userService = {
  userProfile: async (): Promise<UserProfileResponse> => {
    const response: AxiosResponse<UserProfileResponse> =
      await apiClient.get("/users/me");
    return response.data;
  },

  updateProfile: async (
    payload: UpdateProfilePayload,
  ): Promise<UserProfileResponse> => {
    const response: AxiosResponse<UserProfileResponse> = await apiClient.put(
      "/users/me",
      payload,
    );
    return response.data;
  },

  getEmergencyContacts: async (): Promise<EmergencyContactsResponse> => {
    const response: AxiosResponse<EmergencyContactsResponse> =
      await apiClient.get("/users/me/emergency-contacts");
    return response.data;
  },

  updateConsent: async (
    payload: UpdateConsentPayload,
  ): Promise<ConsentResponse> => {
    const response: AxiosResponse<ConsentResponse> = await apiClient.put(
      "/users/me/consent",
      payload,
    );
    return response.data;
  },

  getSavedLocations: async (): Promise<SavedLocationsResponse> => {
    const response: AxiosResponse<SavedLocationsResponse> = await apiClient.get(
      "/users/me/saved-locations",
    );
    return response.data;
  },

  createSavedLocation: async (
    payload: CreateLocationPayload,
  ): Promise<CreateLocationResponse> => {
    const response: AxiosResponse<CreateLocationResponse> =
      await apiClient.post("/users/me/saved-locations", payload);
    return response.data;
  },

  getSavedLocationById: async (
    locationId: string,
  ): Promise<CreateLocationResponse> => {
    const response: AxiosResponse<CreateLocationResponse> = await apiClient.get(
      `/users/me/saved-locations/${locationId}`,
    );
    return response.data;
  },
};

export default userService;
