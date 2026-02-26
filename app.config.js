import "dotenv/config";

export default ({ config }) => ({
  ...config,
  name: "Medigo",
  slug: "medigo",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/appIcon.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,

  splash: {
    image: "./assets/logo.png",
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
      foregroundImage: "./assets/appIcon.png",
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

    package: "com.osinnowo.klimateriderider",
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
      projectId: "68809e59-a6f8-45db-bf14-52e25258bdd2",
    },
  },

  runtimeVersion: {
    policy: "appVersion",
  },

  updates: {
    url: "https://u.expo.dev/68809e59-a6f8-45db-bf14-52e25258bdd2",
    checkAutomatically: "ON_LOAD",
    fallbackToCacheTimeout: 30000,
  },
});
