import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  ChevronLeft,
  Calendar as CalendarIcon,
  Check,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "../../../hooks/useThemes";
import { commonStyles } from "../../../styles/commonStyles";
import OverlayBottomSheet, {
  OverlayBottomSheetRef,
} from "../../../components/modals/overlayBottomSheet";
import Buttons from "../../../components/buttons/buttons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useCreateRide } from "../../../hooks/mutations/useRide";
import { CreateRideRequest } from "../../../types/rides.types";
import { useUserProfile } from "../../../hooks/queries/useUserProfile";
import { useFareEstimate } from "../../../hooks/queries/useFareEstimates";
import { useGetFareEstimateMutation } from "../../../hooks/queries/useGetBaseFareEstimate";
import { usePaymentMethods } from "../../../hooks/queries/usePaymentMethods";
import ServiceType from "./serviceType";
import TripStructure from "./tripStructure";
import ChooseARide from "./chooseARide";
import ReviewScreen from "./review";
import { useStripe } from "@stripe/stripe-react-native";
import axios from "axios";
import { useCreatePaymentIntent } from "../../../hooks/mutations/usePayments";
import { useUserStore } from "../../../store/userStore";
import { useRideStore } from "../../../store/useRideStore";
import { useQueryClient } from "@tanstack/react-query";
import { formatPrice } from "../../../utils/formatPrice";

const { width } = Dimensions.get("window");

const BookARide = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const { colors, theme } = useTheme();
  const pickup = useRideStore((state) => state.pickup);
  const { data, isLoading } = useUserProfile();
  const {
    mutate: fetchEstimates,
    isPendingBaseFareEstimate,
    data: estimateResults,
  } = useGetFareEstimateMutation();

  const commonStyling = commonStyles(colors);
  const successRef = useRef<OverlayBottomSheetRef>(null);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [serviceType, setServiceType] = useState("Transport Only");
  const [appointmentType, setAppointmentType] = useState("Dialysis");
  const [vehicle, setVehicle] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [tripType, setTripType] = useState("One Way");
  const [passenger, setPassenger] = useState("Myself");
  const [frequency, setFrequency] = useState("Weekly");
  const [endType, setEndType] = useState("By Date");
  const [mobility, setMobility] = useState("Ambulatory");
  const [loadingPickup, setloadingPickup] = useState(false);
  const [loadingDestination, setloadingDestination] = useState(false);
  const [assistance, setassistance] = useState("none");
  const [additionalNotes, setadditionalNotes] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  useEffect(() => {
    const today = new Date();

    if (serviceType === "Transport + Escort") {
      // Set to Tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      setDate(tomorrow.toISOString().split("T")[0]);
    } else {
      // Set back to Today
      setDate(today.toISOString().split("T")[0]);
    }
  }, [serviceType]);
  const [showPicker, setShowPicker] = useState(false);
  const [recurringStartdate, setrecurringStartDate] = useState(new Date());
  const [showrecurringStartDatePicker, setShowrecurringStartDatePicker] =
    useState(false);
  const [recurringEnddate, setrecurringEndDate] = useState(new Date());
  const [showrecurringEndDatePicker, setShowrecurringEndDatePicker] =
    useState(false);

  const getThirtyMinsFromNow = () => {
    const now = new Date();

    // 1. Add 30 minutes to the current date object
    now.setMinutes(now.getMinutes() + 30);

    // 2. Format with padding
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const [time, setTime] = useState(getThirtyMinsFromNow());
  const { data: user } = useUserProfile();
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [fare, setfare] = useState("");
  const [pickUpForm, setpickUpForm] = useState({
    label: "",
    address: pickup?.address,
    latitude: pickup?.latitude,
    longitude: pickup?.longitude,
  });
  const [destinationForm, setdestinationForm] = useState({
    label: "",
    address: "",
    latitude: 0,
    longitude: 0,
  });
  const [rideId, setrideId] = useState("");
  const [loadingPayment, setloadingPayment] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("visa");
  const {
    mutate: getEstimate,
    data: estimateData,
    isPending: loadingEstimates,
  } = useFareEstimate();
  const estimate = estimateData?.data.estimates;

  const handleCalculateFare = () => {
    fetchEstimates({
      pickup_address: pickUpForm.address,
      destination_address: destinationForm.address,
      pickup_latitude: pickUpForm.latitude,
      pickup_longitude: pickUpForm.longitude,
      destination_latitude: destinationForm.latitude,
      destination_longitude: destinationForm.longitude,
      ride_type: mobility.toLowerCase(),
      trip_type:
        serviceType === "Transport Only"
          ? serviceType.toLowerCase().replace(/ /g, "_")
          : "transport_escort",
      trip_structure: tripType.toLowerCase().replace(/ /g, "_"),
    });
  };

  // 3. The Button Trigger function
  const handleGetEstimate = () => {
    if (!pickUpForm.address || !destinationForm.address) return;

    getEstimate({
      pickup_address: pickUpForm.address,
      destination_address: destinationForm.address,
      pickup_latitude: pickUpForm.latitude,
      pickup_longitude: pickUpForm.longitude,
      destination_latitude: destinationForm.latitude,
      destination_longitude: destinationForm.longitude,
    });
  };

  const updatePickUPFormFields = (fields: Partial<any>) => {
    setpickUpForm((prev) => ({ ...prev, ...fields }));
  };
  const updateDestinationFormFields = (fields: Partial<any>) => {
    setdestinationForm((prev) => ({ ...prev, ...fields }));
  };
  const onDestinationPlaceSelected = (data: any) => {
    setdestinationForm((prev) => ({
      ...prev,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
    }));
  };
  const onPickUpPlaceSelected = (data: any) => {
    setpickUpForm((prev) => ({
      ...prev,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
    }));
  };

  const togglePicker = () => {
    setShowPicker(true);
  };

  const nextStep = () =>
    step === 3
      ? handleConfirmBooking()
      : step === 4
        ? openStripePayment()
        : step < totalSteps
          ? setStep(step + 1)
          : null;
  const prevStep = () => step > 1 && setStep(step - 1);

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      {[...Array(totalSteps)].map((_, i) => (
        <View
          key={i}
          style={[
            styles.progressStep,
            { backgroundColor: i + 1 <= step ? "#2E66E7" : "#E5EAF5" },
          ]}
        />
      ))}
    </View>
  );

  const { mutate, isPending } = useCreateRide();

  const handleConfirmBooking = () => {
    const [year, month, day] = date.split("-").map(Number);
    const [hours, minutes] = time.split(":").map(Number);

    // This creates the date in LOCAL timezone (correct for Canada)
    const scheduledDate = new Date(year, month - 1, day, hours, minutes, 0);

    const payload: CreateRideRequest = {
      ride_type: mobility.toLowerCase(),
      trip_type:
        serviceType === "Transport Only"
          ? serviceType.toLowerCase().replace(/ /g, "_")
          : "transport_escort",
      trip_structure: tripType.toLowerCase().replace(/ /g, "_"),
      pickup_address: pickUpForm.address,
      pickup_latitude: pickUpForm.latitude,
      pickup_longitude: pickUpForm.longitude,
      destination_address: destinationForm.address,
      destination_latitude: destinationForm.latitude,
      destination_longitude: destinationForm.longitude,
      scheduled_at: scheduledDate.toISOString(),
      passenger_id: data?.data.id,
      visit_type: "",
      appointment_time: scheduledDate.toISOString(),
      facility_name: "Medical Center",
      special_instructions: additionalNotes || "",
      mobility_level: mobility,
      assistance_level: assistance,
      estimated_distance_miles: 10.5,
      estimated_duration_minutes: 25,
      estimated_fare: 45,
      business_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    };

    mutate(payload, {
      onSuccess: (response) => {
        console.log("✅ Ride Created Successfully:", response.data.id);
        setrideId(response.data.id);
        setStep(4);
        handleCalculateFare();
        // nextStep();
      },
      onError: (error: any) => {
        console.error(
          "❌ Failed to Create Ride:",
          error?.response?.data || error.message,
        );

        // Optionally show an error toast here
      },
    });
  };

  const { mutateAsync: getPaymentIntent, isPending: loadingPaymentIntent } =
    useCreatePaymentIntent();

  const queryClient = useQueryClient();

  const openStripePayment = async () => {
    setloadingPayment(true);

    try {
      const response = await getPaymentIntent({
        amount: estimateResults?.data.total_fare,
        currency: "cad", // or your target currency
        description: "Wallet Funding",
        order_id: rideId,
      });

      const { payment_intent, ephemeral_key, customer } = response.data;

      const { error } = await initPaymentSheet({
        merchantDisplayName: "MediGo",
        customerId: customer,
        customerEphemeralKeySecret: ephemeral_key,
        paymentIntentClientSecret: payment_intent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: user?.data.first_name,
        },
      });

      if (error) {
        setloadingPayment(false);
        return;
      }

      const { error: presentError } = await presentPaymentSheet();

      if (presentError) {
        console.log("Payment canceled or failed");
      } else {
        // Payment successful
        await queryClient.invalidateQueries({
          queryKey: ["my-rides"],
        });
        successRef.current?.open();
        // optional immediate refetch
        await queryClient.refetchQueries({
          queryKey: ["my-rides"],
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setloadingPayment(false);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split("T")[0];

  const today = new Date().toISOString().split("T")[0];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <ServiceType
            serviceType={serviceType}
            setServiceType={setServiceType}
            setAppointmentType={setAppointmentType}
            appointmentType={appointmentType}
          />
        );
      case 2:
        return (
          <TripStructure
            setTripType={setTripType}
            tripType={tripType}
            pickUpForm={pickUpForm}
            togglePicker={togglePicker}
            updatePickUPFormFields={updatePickUPFormFields}
            onPickUpPlaceSelected={onPickUpPlaceSelected}
            loadingPickup={loadingPickup}
            setloadingPickup={setloadingPickup}
            destinationForm={destinationForm}
            updateDestinationFormFields={updateDestinationFormFields}
            onDestinationPlaceSelected={onDestinationPlaceSelected}
            loadingDestination={loadingDestination}
            setloadingDestination={setloadingDestination}
            date={date}
            showPicker={showPicker}
            setShowPicker={setShowPicker}
            setDate={setDate}
            serviceType={serviceType}
            minDateString={minDateString}
            today={today}
            showTimePicker={showTimePicker}
            setShowTimePicker={setShowTimePicker}
            time={time}
            setTime={setTime}
            passenger={passenger}
            setPassenger={setPassenger}
            mobility={mobility}
            setMobility={setMobility}
            assistance={assistance}
            setassistance={setassistance}
            additionalNotes={additionalNotes}
            setadditionalNotes={setadditionalNotes}
          />
        );
      case 3:
        return (
          <ChooseARide
            loadingEstimates={loadingEstimates}
            estimate={estimate}
            vehicle={vehicle}
            setVehicle={setVehicle}
            setfare={setfare}
          />
        );
      case 4:
        return (
          // <RecurringRide
          //   recurring={recurring}
          //   setRecurring={setRecurring}
          //   frequency={frequency}
          //   setFrequency={setFrequency}
          //   toggleRecurringStartDatePicker={toggleRecurringStartDatePicker}
          //   recurringStartdate={recurringStartdate}
          //   showrecurringStartDatePicker={showrecurringStartDatePicker}
          //   setrecurringStartDate={setrecurringStartDate}
          //   setShowrecurringStartDatePicker={setShowrecurringStartDatePicker}
          //   endType={endType}
          //   setEndType={setEndType}
          //   toggleRecurringEndDatePicker={toggleRecurringEndDatePicker}
          //   recurringEnddate={recurringEnddate}
          //   showrecurringEndDatePicker={showrecurringEndDatePicker}
          //   setrecurringEndDate={setrecurringEndDate}
          //   setShowrecurringEndDatePicker={setShowrecurringEndDatePicker}
          // />
          <ReviewScreen
            tripType={tripType}
            appointment={appointmentType}
            serviceType={serviceType}
            vehicle={vehicle}
            pickup={pickUpForm.address}
            destination={destinationForm.address}
            mobility={mobility}
            assistance={assistance}
            isRecurring={recurring}
            notes={additionalNotes}
            frequency={frequency}
            endType={endType}
            date={date}
            time={time}
            recurringStartDate={recurringStartdate}
            recurringEndDate={recurringEnddate}
            totalFare={estimateResults?.data.total_fare}
            accessibilityFee={estimateResults?.data.accessibility_fee}
            attendantFee={estimateResults?.data.attendant_fee}
            baseFare={estimateResults?.data.base_fare}
            careAssistantFee={estimateResults?.data.care_assistant_fee}
            platformFee={estimateResults?.data.platform_fee}
            distanceCharge={estimateResults?.data.distance_charge}
          />
        );

      default:
        return (
          <View style={styles.placeholder}>
            <Text>Step {step} Implementation</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.surfacePrimary,
        },
      ]}
    >
      <StatusBar
        barStyle={theme === "light" ? "dark-content" : "light-content"}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={prevStep} style={styles.backButton}>
          <ChevronLeft color="#000" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {step < 4 && (
          <View>
            <Text
              style={[
                styles.mainTitle,
                commonStyling.title,
                {
                  fontSize: 24,
                  fontFamily: "Bold",
                },
              ]}
            >
              Book a Ride
            </Text>
            <Text
              style={[
                styles.stepIndicator,
                commonStyling.subtitle,
                {
                  fontSize: 14,
                },
              ]}
            >
              Step {step} of {totalSteps} - {getStepName(step)}
            </Text>
            {renderProgressBar()}
          </View>
        )}

        {renderStepContent()}
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            backgroundColor: colors.surfacePrimary,
            borderTopColor: colors.lightPrimaryBlueBorder,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => {
            if (step === 2 && !pickUpForm.address) {
              Alert.alert("Please enter pickup location");
              return;
            } else if (step === 2 && !destinationForm.address) {
              Alert.alert("Please enter destination location");
              return;
            } else if (step === 2) {
              handleGetEstimate();
              nextStep();
            } else if (step === 3 && !vehicle) {
              Alert.alert("Please select a ride option");
              return;
            } else {
              nextStep();
            }
          }}
        >
          {isPending || loadingPayment ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.continueText}>
              {step === 4 ? "Pay" : "Continue"}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <OverlayBottomSheet ref={successRef} height={500} overlay={true}>
        <View style={styles.content}>
          {/* Success Icon with Glow Effect */}
          <View>
            <View style={styles.iconGlow}>
              <View style={styles.checkmarkCircle}>
                <Check color="#FFF" size={48} strokeWidth={3} />
              </View>
            </View>
          </View>

          {/* Status Text */}
          <Text
            style={[
              styles.title,
              commonStyling.title,
              {
                fontSize: 26,
                fontFamily: "Bold",
                marginTop: 16,
              },
            ]}
          >
            Payment Successful
          </Text>
          <Text
            style={[
              styles.statusInfo,
              commonStyling.subtitle,
              {
                fontSize: 15,
              },
            ]}
          >
            Your booking status is pending.
          </Text>
          <Text
            style={[
              styles.statusDetail,
              commonStyling.subtitle,
              {
                fontSize: 15,
              },
            ]}
          >
            You will get confirmation and driver's details soon.
          </Text>

          {/* Amount Paid Card */}
          <View
            style={[
              styles.amountCard,
              {
                backgroundColor: colors.cardBackground,
              },
            ]}
          >
            <Text
              style={[
                styles.amountLabel,
                commonStyling.subtitle,
                {
                  fontSize: 12,
                  fontFamily: "SemiBold",
                },
              ]}
            >
              AMOUNT PAID
            </Text>
            <Text
              style={{
                fontSize: 32,
                fontFamily: "Bold",
                color: "#10B981",
              }}
            >
              {formatPrice(estimateResults?.data.total_fare)}
            </Text>
          </View>

          <View
            style={{
              width: "100%",
            }}
          >
            <Buttons
              title="View Ride Status"
              onPress={() => {
                navigation.navigate("RiderRideDetailsStack", {
                  screen: "RideStatus",
                  params: {
                    rideId: rideId,
                  },
                });
              }}
            />
          </View>
        </View>
      </OverlayBottomSheet>
    </SafeAreaView>
  );
};

const getStepName = (s: number) => {
  const names = ["Service Type", "Trip Structure", "Vehicle Type"];
  return names[s - 1];
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingVertical: 10 },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 100 },
  mainTitle: {
    marginTop: 32,
  },
  stepIndicator: { marginTop: 4 },
  progressContainer: { flexDirection: "row", marginTop: 16, marginBottom: 32 },
  progressStep: { flex: 1, height: 4, borderRadius: 2, marginRight: 6 },

  footer: {
    position: "absolute",
    bottom: 20,
    width: width,
    padding: 24,
    borderTopWidth: 1,
  },
  continueButton: {
    backgroundColor: "#2E66E7",
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2E66E7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueText: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  placeholder: { height: 300, alignItems: "center", justifyContent: "center" },

  title: { fontSize: 24, fontWeight: "800", color: "#0F172A" },

  iconGlow: {
    width: 106,
    height: 106,
    borderRadius: 60,
    backgroundColor: "rgba(16, 185, 129, 0.1)", // Light emerald glow
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkCircle: {
    width: 96,
    height: 96,
    borderRadius: 50,
    backgroundColor: "#10B981", // Emerald 500
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  statusInfo: {
    textAlign: "center",
    lineHeight: 24,
  },
  statusDetail: {
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 16,
  },

  amountCard: {
    width: "100%",
    borderRadius: 24,
    paddingVertical: 32,
    alignItems: "center",
    marginBottom: 24,
  },
  amountLabel: {
    letterSpacing: 1,
    marginBottom: 8,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BookARide;
