import { io, Socket } from "socket.io-client";

interface LocationUpdate {
  ride_id: string;
  driver_id: string;
  latitude: number;
  longitude: number;
  heading?: number;
  speed?: number;
  eta_minutes?: number;
  distance_remaining?: number;
}

class RideTrackingService {
  private socket: Socket | null = null;

  // ✅ CONNECT
  connect(
    jwtToken: string,
    onConnected?: () => void,
    backendUrl: string = "https://staging.getmedigo.com",
  ) {
    if (this.socket?.connected) {
      console.log("⚠️ Socket already connected");
      return;
    }

    console.log("🚀 Initializing socket connection...");
    console.log("🌐 URL:", backendUrl);
    console.log("🛣️ Path:", "/ws/socket.io/tracking");
    console.log("🔑 Token present:", !!jwtToken);

    this.socket = io("https://staging.getmedigo.com/tracking", {
      // URL + Namespace
      path: "/api/v1/ws/socket.io", // Matches documentation exactly
      transports: ["websocket", "polling"],
      auth: { token: jwtToken },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000, // Added based on docs
    });

    // ─────────────────────────────────────────
    // CONNECTION EVENTS
    // ─────────────────────────────────────────

    this.socket.on("connect", () => {
      console.log("✅ CONNECTED");
      console.log("🆔 Socket ID:", this.socket?.id);
      console.log("🚚 Transport:", this.socket?.io?.engine?.transport?.name);

      onConnected?.();
    });

    this.socket.on("disconnect", (reason) => {
      console.log("🔌 DISCONNECTED:", reason);
    });

    this.socket.on("connect_error", (err: any) => {
      console.log("❌ ===== CONNECT ERROR START =====");

      console.log("📛 Message:", err?.message);
      console.log("📛 Name:", err?.name);

      // 🔥 VERY IMPORTANT
      console.log("📄 Description:", err?.description);
      console.log("🧠 Context:", err?.context);

      console.log("📦 Full error object:", err);

      try {
        console.log("🧾 JSON:", JSON.stringify(err, null, 2));
      } catch {
        console.log("⚠️ Could not stringify error");
      }

      console.log("❌ ===== CONNECT ERROR END =====");
    });

    // ─────────────────────────────────────────
    // ENGINE / TRANSPORT DEBUG (CRITICAL)
    // ─────────────────────────────────────────

    this.socket.io.on("error", (error: any) => {
      console.log("🚨 ENGINE ERROR:", error);
    });

    this.socket.io.on("reconnect_attempt", (attempt) => {
      console.log("🔁 Reconnect attempt:", attempt);
    });

    this.socket.io.on("reconnect_error", (error: any) => {
      console.log("🔁 RECONNECT ERROR:", error);
    });

    this.socket.io.on("reconnect_failed", () => {
      console.log("💀 RECONNECT FAILED");
    });

    this.socket.io.on("upgrade_error", (error: any) => {
      console.log("⬆️ UPGRADE ERROR:", error);
    });

    this.socket.io.on("transport", (transport) => {
      console.log("🚚 Transport selected:", transport.name);

      transport.on("error", (err: any) => {
        console.log("🚨 TRANSPORT ERROR:", err);
      });
    });
  }

  // ✅ JOIN RIDE ROOM
  joinRide(rideId: string) {
    if (!this.socket) {
      console.log("❌ Cannot join ride: socket not initialized");
      return;
    }

    if (!this.socket.connected) {
      console.log("⚠️ Cannot join ride: socket not connected yet");
      return;
    }

    console.log("🚗 Joining ride:", rideId);

    this.socket.emit("join_ride", {
      ride_id: rideId,
    });

    console.log("✅ join_ride emitted");
  }

  // ✅ LEAVE RIDE ROOM
  leaveRide(rideId: string) {
    if (!this.socket?.connected) {
      console.log("⚠️ Cannot leave ride: socket not connected");
      return;
    }

    console.log("👋 Leaving ride:", rideId);

    this.socket.emit("leave_ride", {
      ride_id: rideId,
    });
  }

  // ✅ LISTEN FOR DRIVER LOCATION
  onLocationUpdate(callback: (data: LocationUpdate) => void) {
    if (!this.socket) {
      console.log("❌ Cannot listen: socket not initialized");
      return;
    }

    console.log("👂 Listening for driver location updates...");

    this.socket.on("location_update", (data: LocationUpdate) => {
      console.log("📍 LOCATION UPDATE RECEIVED:");
      console.log("➡️ Ride ID:", data.ride_id);
      console.log("➡️ Driver ID:", data.driver_id);

      callback(data);
    });
  }

  // ✅ REMOVE LISTENER
  removeLocationListener() {
    if (!this.socket) return;

    console.log("🧹 Removing location listeners");

    this.socket.off("location_update");
  }

  // ✅ DISCONNECT
  disconnect() {
    if (!this.socket) {
      console.log("⚠️ No socket to disconnect");
      return;
    }

    console.log("🔌 Disconnecting socket...");

    this.socket.disconnect();
    this.socket = null;

    console.log("✅ Socket fully disconnected");
  }
}

export default new RideTrackingService();
