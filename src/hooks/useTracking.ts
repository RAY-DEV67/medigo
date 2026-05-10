import { useEffect, useState } from "react";
import RideTrackingService from "../services/rideTrackingService";

interface DriverLocation {
  latitude: number;
  longitude: number;
  heading?: number;
}

export const useRideTracking = (rideId: string, token: string) => {
  const [driverLocation, setDriverLocation] = useState<DriverLocation | null>(
    null,
  );

  useEffect(() => {
    if (!token || !rideId) return;

    RideTrackingService.connect(token, () => {
      // ✅ GUARANTEED connection
      RideTrackingService.joinRide(rideId);
    });

    RideTrackingService.onLocationUpdate((data) => {
      console.log("LIVE DRIVER:", data);
    });

    return () => {
      RideTrackingService.leaveRide(rideId);
      RideTrackingService.removeLocationListener();
      RideTrackingService.disconnect();
    };
  }, [token, rideId]);

  return { driverLocation };
};
