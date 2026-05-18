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
    resizeMode: "cover",
    backgroundColor: "#1A3B8E",
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
      projectId: "2e02639c-db70-4906-951d-f927793a53e7",
    },
  },

  runtimeVersion: {
    policy: "appVersion",
  },

  updates: {
    url: "https://u.expo.dev/2e02639c-db70-4906-951d-f927793a53e7",
    checkAutomatically: "ON_LOAD",
    fallbackToCacheTimeout: 30000,
  },
});
