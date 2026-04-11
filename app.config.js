import "dotenv/config";

export default ({ config }) => ({
  ...config,
  name: "Medigo",
  slug: "medigo",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/med.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,

  splash: {
    image: "./assets/splashMed.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },

  ios: {
    supportsTablet: true,
    infoPlist: {
      NSLocationWhenInUseUsageDescription:
        "This app uses your location to show your position on the map and calculate routes.",
    },
  },

  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/med.png",
      backgroundColor: "#ffffff",
    },

    config: {
      googleMaps: {
        apiKey: process.env.EXPO_PUBLIC_GOOGLE_KEY,
      },
    },

    edgeToEdgeEnabled: true,

    permissions: [
      "ACCESS_COARSE_LOCATION",
      "ACCESS_FINE_LOCATION",
      "android.permission.CAMERA",
      "android.permission.RECORD_AUDIO",
    ],

    package: "com.medigo",
  },

  web: {
    favicon: "./assets/favicon.png",
  },

  plugins: [
    [
      "expo-camera",
      {
        cameraPermission: "Allow Klimate Ride to access your camera.",
      },
    ],
    [
      "expo-location",
      {
        requestLocationPermission: true,
        locationAlwaysAndWhenInUsePermission:
          "Allow Klimate Ride to use your location",
      },
    ],
    ["expo-secure-store"],
    "expo-maps",
    "expo-font",
  ],

  extra: {
    expoPublicGoogleKey: process.env.EXPO_PUBLIC_GOOGLE_KEY,
    eas: {
      projectId: "be1912f2-b5ef-4f3f-89f8-d1111c9a6680",
    },
  },

  runtimeVersion: {
    policy: "appVersion",
  },

  updates: {
    url: "https://u.expo.dev/be1912f2-b5ef-4f3f-89f8-d1111c9a6680",
    checkAutomatically: "ON_LOAD",
    fallbackToCacheTimeout: 30000,
  },
});
