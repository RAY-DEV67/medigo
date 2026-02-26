// ─── MapScreen.tsx ──────────────────────────────────────────────────────────
import React, { useRef, useEffect, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, {
  Marker,
  MapStyleElement,
  PROVIDER_GOOGLE,
  LatLng,
  EdgePadding,
  Polyline,
} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import Constants from "expo-constants";
import { useMapStore } from "../../store/mapStore";
import { LocationPoint } from "../../store/useRideStore";
import useTheme from "../../hooks/useThemes";
import MapPlaceholder from "./mapPlaceholder";
import { Ionicons } from "@expo/vector-icons";

const GOOGLE_MAPS_APIKEY = Constants.expoConfig?.extra?.expoPublicGoogleKey;
const MAP_PADDING: EdgePadding = { top: 70, right: 40, bottom: 220, left: 40 };
const BUTTON_SIZE = 40;

const MapSkeleton = () => (
  <View style={StyleSheet.absoluteFill}>
    <MapPlaceholder />
  </View>
);

const MapScreen: React.FC<{
  pickup?: LocationPoint | null;
  destination?: LocationPoint | null;
  bottomOffset?: number;
}> = ({ pickup, destination, bottomOffset = 240 }) => {
  const { colors, theme } = useTheme();
  const region = useMapStore((s) => s.region);
  const mapRef = useRef<MapView>(null);
  const hasTransitioned = useRef(false);
  const fitToCoordinatesTimeout = useRef<NodeJS.Timeout | null>(null);

  const [routeCoords, setRouteCoords] = useState<LatLng[]>([]);
  const [mapReady, setMapReady] = useState(false);
  const [showDirections, setShowDirections] = useState(false);

  const mapOpacity = useSharedValue(0);
  const mapScale = useSharedValue(1.05);
  const placeholderOpacity = useSharedValue(1);

  const bgThemeColor = theme === "dark" ? "#121212" : "#F8F9FA";

  const mapAnimatedStyle = useAnimatedStyle(() => ({
    opacity: mapOpacity.value,
    transform: [{ scale: mapScale.value }],
  }));

  const placeholderAnimatedStyle = useAnimatedStyle(() => ({
    opacity: placeholderOpacity.value,
  }));

  const handleInitialLayout = () => {
    if (hasTransitioned.current) return;
    hasTransitioned.current = true;

    mapOpacity.value = withTiming(1, { duration: 400 });
    mapScale.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.quad),
    });
    placeholderOpacity.value = withTiming(0, { duration: 300 }, (finished) => {
      if (finished) runOnJS(setMapReady)(true);
    });
  };

  const getCoords = (p?: LocationPoint | null): LatLng | null =>
    p?.latitude && p?.longitude
      ? { latitude: p.latitude, longitude: p.longitude }
      : null;

  const pickupCoords = useMemo(() => getCoords(pickup), [pickup]);
  const destinationCoords = useMemo(
    () => getCoords(destination),
    [destination],
  );

  useEffect(() => {
    if (pickupCoords && destinationCoords && mapRef.current) {
      if (fitToCoordinatesTimeout.current) {
        clearTimeout(fitToCoordinatesTimeout.current);
      }
      fitToCoordinatesTimeout.current = setTimeout(() => {
        mapRef.current?.fitToCoordinates([pickupCoords, destinationCoords], {
          edgePadding: MAP_PADDING,
          animated: true,
        });
      }, 300);
    }
    return () => {
      if (fitToCoordinatesTimeout.current) {
        clearTimeout(fitToCoordinatesTimeout.current);
      }
    };
  }, [pickupCoords, destinationCoords]);

  useEffect(() => {
    if (pickupCoords && destinationCoords) {
      const timer = setTimeout(() => setShowDirections(true), 400);
      return () => clearTimeout(timer);
    } else {
      setShowDirections(false);
    }
  }, [pickupCoords, destinationCoords]);

  const darkMapStyle: MapStyleElement[] = useMemo(
    () => [
      { elementType: "geometry", stylers: [{ color: "#1f1f1f" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#bfbfbf" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#1f1f1f" }] },
      { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#151515" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#2a2a2a" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9e9e9e" }],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#242424" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#262626" }],
      },
    ],
    [],
  );

  const lightMapStyle: MapStyleElement[] = useMemo(
    () => [
      { elementType: "geometry", stylers: [{ color: "#ffffff" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#7a7a7a" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
      { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#e5e5e5" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#f2f2f2" }],
      },

      {
        featureType: "poi",
        elementType: "all",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [{ visibility: "on" }, { color: "#0f1f0f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [{ visibility: "off" }],
      },
    ],
    [],
  );

  if (!region) return <MapSkeleton />;

  const handleRecenter = () => {
    if (region && mapRef.current) {
      mapRef.current.animateToRegion(
        { ...region, latitudeDelta: 0.01, longitudeDelta: 0.01 },
        1000,
      );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: bgThemeColor }]}>
      <Animated.View style={[StyleSheet.absoluteFill, mapAnimatedStyle]}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            ...region,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          customMapStyle={theme === "dark" ? darkMapStyle : lightMapStyle}
          onMapReady={handleInitialLayout}
          onRegionChangeComplete={handleInitialLayout}
          pitchEnabled
          loadingEnabled
          loadingBackgroundColor={bgThemeColor}
          maxZoomLevel={20}
          minZoomLevel={3}
          rotateEnabled={false}
          showsUserLocation={true}
          followsUserLocation={true}
          mapPadding={{ top: 0, right: 0, bottom: bottomOffset - 10, left: 16 }}
          showsCompass={false}
        >
          {routeCoords.length > 0 && (
            <>
              <Polyline
                coordinates={routeCoords}
                strokeColor={colors.krGreen + "44"}
                strokeWidth={10}
                lineJoin="round"
              />
              <Polyline
                coordinates={routeCoords}
                strokeColor={colors.krGreen}
                strokeWidth={5}
                lineJoin="round"
                lineCap="round"
              />
            </>
          )}

          {showDirections &&
            pickupCoords &&
            destinationCoords &&
            GOOGLE_MAPS_APIKEY && (
              <MapViewDirections
                origin={pickupCoords}
                destination={destinationCoords}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={0}
                onReady={(res) => {
                  if (routeCoords.length === 0) setRouteCoords(res.coordinates);
                }}
                onError={(error) => console.warn("Directions error:", error)}
              />
            )}
        </MapView>
      </Animated.View>

      {/* CHANGED: bottomOffset drives the button position — always above the sheet */}
      <TouchableOpacity
        style={[
          styles.floatingButton,
          { backgroundColor: colors.surfacePrimary, bottom: bottomOffset },
        ]}
        onPress={handleRecenter}
      >
        <Ionicons name="navigate" size={22} color={colors.titleText} />
      </TouchableOpacity>

      {!mapReady && (
        <Animated.View
          style={[StyleSheet.absoluteFill, placeholderAnimatedStyle]}
          pointerEvents="none"
        >
          <MapSkeleton />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  floatingButton: {
    position: "absolute",
    right: 20,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default React.memo(MapScreen);
