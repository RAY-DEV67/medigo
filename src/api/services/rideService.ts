import { AxiosResponse } from "axios";
import apiClient from "../client";
import { RidesQueryParams, RidesResponse } from "../../types/rides.types";

const rideService = {
  getRiderRides: async (params: RidesQueryParams): Promise<RidesResponse> => {
    const response: AxiosResponse<RidesResponse> = await apiClient.get(
      "/rides/rider/me",
      { params },
    );
    return response.data;
  },
};

export default rideService;
