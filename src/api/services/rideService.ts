import { AxiosResponse } from "axios";
import apiClient from "../client";
import {
  CreateRideRequest,
  RidesQueryParams,
  RidesResponse,
  UpcomingRidesResponse,
} from "../../types/rides.types";

const rideService = {
  getRiderRides: async (params: RidesQueryParams): Promise<RidesResponse> => {
    const response: AxiosResponse<RidesResponse> = await apiClient.get(
      "/rides/rider/me",
      { params },
    );
    return response.data;
  },

  createRide: async (payload: any): Promise<any> => {
    const response: AxiosResponse<any> = await apiClient.post(
      "/rides/",
      payload,
    );
    return response.data;
  },

  getUpcomingRides: async (
    page = 1,
    limit = 20,
  ): Promise<UpcomingRidesResponse> => {
    const response = await apiClient.get("/rides/driver/upcoming", {
      params: { page, limit },
    });
    return response.data;
  },
};

export default rideService;
