import { useQuery } from "@tanstack/react-query";
import rideService from "../../api/services/rideService";

export const useRideTimeline = (rideId: string) => {
  return useQuery({
    queryKey: ["ride-timeline", rideId],
    queryFn: () => rideService.getRideTimeline(rideId),
    enabled: !!rideId,
    staleTime: 1000 * 60, // Refresh logic: 1 minute
  });
};
