import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Dimensions,
  StatusBar,
  Platform,
  Modal,
  ActivityIndicator,
} from "react-native";
import {
  ChevronLeft,
  Car,
  UserPlus,
  Droplets,
  Stethoscope,
  Activity,
  Beaker,
  Scissors,
  ArrowRight,
  Repeat,
  MapPin,
  Navigation,
  Calendar as CalendarIcon,
  Clock,
  User,
  Accessibility,
  CheckCircle2,
  Edit2,
  Menu,
  Check,
  ArrowRightLeft,
  Calendar,
  Info,
  LucideArrowDown,
  ArrowDownUp,
  ArrowLeftRight,
  Plus,
  ChevronRight,
  CreditCard,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "../../../hooks/useThemes";
import { commonStyles } from "../../../styles/commonStyles";
import VehicleTypeCard from "../../../components/cards/vehicleTypeCard";
import GoogleInput from "../../../components/inputs/googleInput";
import MultilineInput from "../../../components/inputs/multilineInput";
import OverlayBottomSheet, {
  OverlayBottomSheetRef,
} from "../../../components/modals/overlayBottomSheet";
import Buttons from "../../../components/buttons/buttons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { useCreateRide } from "../../../hooks/mutations/useRide";
import { CreateRideRequest } from "../../../types/rides.types";
import { useUserProfile } from "../../../hooks/queries/useUserProfile";
import { useFareEstimate } from "../../../hooks/queries/useFareEstimates";
import { usePaymentMethods } from "../../../hooks/queries/usePaymentMethods";
import CalendarComponent from "../../../components/inputs/calender";
import TimePicker from "../../../components/inputs/timePicker";

const { width } = Dimensions.get("window");

const BookARide = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const { colors, theme } = useTheme();
  const { data, isLoading } = useUserProfile();
  const commonStyling = commonStyles(colors);
  const successRef = useRef<OverlayBottomSheetRef>(null);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [serviceType, setServiceType] = useState("Transport Only");
  const [appointmentType, setAppointmentType] = useState("Dialysis");
  const [vehicle, setVehicle] = useState("Medigo Standard");
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

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [fare, setfare] = useState("");
  const [pickUpForm, setpickUpForm] = useState({
    label: "",
    address: "",
    latitude: 0,
    longitude: 0,
  });
  const [destinationForm, setdestinationForm] = useState({
    label: "",
    address: "",
    latitude: 0,
    longitude: 0,
  });
  const [rideId, setrideId] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("visa");
  const {
    mutate: getEstimate,
    data: estimateData,
    isPending: loadingEstimates,
  } = useFareEstimate();
  const estimate = estimateData?.data.estimates;
  const { data: getPaymentMethods, isLoading: loadingPaymentMethods } =
    usePaymentMethods();

  const paymentMethods = getPaymentMethods?.data || [];

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

  const getBrandDetails = (brand: string) => {
    const b = brand?.toLowerCase();
    if (b === "visa") return { label: "Visa", color: "#1A1F71" };
    if (b === "mastercard") return { label: "Mastercard", color: "#EB001B" };
    return { label: brand, color: "#64748B" };
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

  const toggleRecurringStartDatePicker = () => {
    setShowrecurringStartDatePicker(true);
  };

  const toggleRecurringEndDatePicker = () => {
    setShowrecurringEndDatePicker(true);
  };

  const nextStep = () =>
    step < totalSteps ? setStep(step + 1) : handleConfirmBooking();
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

  // Inside ReviewScreen.tsx
  const { mutate, isPending } = useCreateRide();

  const handleConfirmBooking = () => {
    const scheduledDate = new Date(date);

    const payload: CreateRideRequest = {
      ride_type: mobility.toLowerCase(),
      trip_type: serviceType.toLowerCase().replace(/ /g, "_"),
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

    console.log(payload);

    mutate(payload, {
      onSuccess: (response) => {
        console.log("✅ Ride Created Successfully:", response.data.id);
        setrideId(response.data.id);
        successRef.current?.open();
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

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split("T")[0];

  const today = new Date().toISOString().split("T")[0];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 18,
                  fontFamily: "Bold",
                },
              ]}
            >
              Select Service Type
            </Text>
            <Text
              style={[
                styles.sectionSubtitle,
                commonStyling.subtitle,
                {
                  fontSize: 14,
                },
              ]}
            >
              What level of service do you need?
            </Text>

            <SelectionCard
              title="Transport Only"
              desc="Driver provides safe transportation to your destination"
              icon={
                <Car
                  color={serviceType === "Transport Only" ? "#FFF" : "#2E66E7"}
                  size={24}
                />
              }
              selected={serviceType === "Transport Only"}
              onPress={() => setServiceType("Transport Only")}
            />
            <SelectionCard
              title="Transport + Escort"
              desc="Driver accompanies you inside the facility"
              icon={<UserPlus color="#94A3B8" size={24} />}
              selected={serviceType === "Transport + Escort"}
              onPress={() => setServiceType("Transport + Escort")}
              badge="Full Support"
            />

            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 18,
                  fontFamily: "Bold",
                  marginTop: 32,
                },
              ]}
            >
              What kind of visit is this?
            </Text>
            <Text
              style={[
                styles.sectionSubtitle,
                commonStyling.subtitle,
                {
                  fontSize: 14,
                },
              ]}
            >
              Select your appointment type
            </Text>

            <View style={styles.grid}>
              <GridCard
                title="Dialysis"
                icon={<Droplets color="#2E66E7" />}
                selected={appointmentType === "Dialysis"}
                onPress={() => setAppointmentType("Dialysis")}
              />
              <GridCard
                title="Checkup"
                icon={<Stethoscope color="#10B981" />}
                selected={appointmentType === "Checkup"}
                onPress={() => setAppointmentType("Checkup")}
              />
              <GridCard
                title="Therapy"
                icon={<Activity color="#EF4444" />}
                selected={appointmentType === "Therapy"}
                onPress={() => setAppointmentType("Therapy")}
              />
              <GridCard
                title="Lab Work"
                icon={<Beaker color="#8B5CF6" />}
                selected={appointmentType === "Lab Work"}
                onPress={() => setAppointmentType("Lab Work")}
              />
              <GridCard
                title="Surgery"
                icon={<Scissors color="#EF4444" />}
                selected={appointmentType === "Lab Work"}
                onPress={() => setAppointmentType("Lab Work")}
              />
              <GridCard
                title="Other"
                icon={<Menu color="#8B5CF6" />}
                selected={appointmentType === "Lab Work"}
                onPress={() => setAppointmentType("Lab Work")}
              />
            </View>
          </View>
        );
      case 2:
        return (
          <View>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 18,
                  fontFamily: "Bold",
                },
              ]}
            >
              Trip Structure
            </Text>
            <Text
              style={[
                styles.sectionSubtitle,
                commonStyling.subtitle,
                {
                  fontSize: 14,
                },
              ]}
            >
              How do you want to travel?
            </Text>
            <TouchableOpacity
              style={[
                styles.choiceCard,
                {
                  borderColor:
                    tripType === "One Way"
                      ? colors.primaryColor
                      : colors.lightPrimaryBlueBorder,
                },
              ]}
              onPress={() => setTripType("One Way")}
            >
              <View
                style={[
                  styles.iconBox,
                  tripType === "One Way" && styles.activeIconBox,
                ]}
              >
                <ArrowRight
                  color={tripType === "One Way" ? "#FFF" : "#64748B"}
                  size={20}
                />
              </View>
              <View style={styles.choiceTextContainer}>
                <Text
                  style={[
                    commonStyling.title,
                    {
                      fontSize: 16,
                      fontFamily: "Bold",
                    },
                  ]}
                >
                  One Way
                </Text>
                <Text
                  style={[
                    styles.choiceDesc,
                    commonStyling.subtitle,
                    {
                      fontSize: 14,
                      fontFamily: "Medium",
                    },
                  ]}
                >
                  Single trip to your destination
                </Text>
                <View style={styles.routePill}>
                  <Text
                    style={{
                      color: colors.primaryColor,
                      fontSize: 12,
                      fontFamily: "Medium",
                    }}
                  >
                    Home → Hospital
                  </Text>
                </View>
              </View>
              {tripType === "One Way" && (
                <View style={styles.checkCircle}>
                  <Check color="#FFF" size={14} />
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.choiceCard,
                {
                  borderColor:
                    tripType === "Round Trip"
                      ? colors.primaryColor
                      : colors.lightPrimaryBlueBorder,
                },
              ]}
              onPress={() => setTripType("Round Trip")}
            >
              <View
                style={[
                  styles.iconBox,
                  tripType === "Round Trip" && styles.activeIconBox,
                ]}
              >
                <ArrowRightLeft
                  color={tripType === "Round Trip" ? "#FFF" : "#64748B"}
                  size={20}
                />
              </View>
              <View style={styles.choiceTextContainer}>
                <Text
                  style={[
                    commonStyling.title,
                    {
                      fontSize: 16,
                      fontFamily: "Bold",
                    },
                  ]}
                >
                  Round Trip
                </Text>
                <Text
                  style={[
                    styles.choiceDesc,
                    commonStyling.subtitle,
                    {
                      fontSize: 14,
                      fontFamily: "Medium",
                    },
                  ]}
                >
                  Ride to and from your destination
                </Text>

                <View style={styles.routePill}>
                  <Text
                    style={{
                      color: colors.primaryColor,
                      fontSize: 12,
                      fontFamily: "Medium",
                    }}
                  >
                    Home → Hospital → Home
                  </Text>
                </View>
              </View>
              {tripType === "Round Trip" && (
                <View style={styles.checkCircle}>
                  <Check color="#FFF" size={14} />
                </View>
              )}
            </TouchableOpacity>

            {/* Location Section */}
            <Text
              style={[
                commonStyling.title,
                {
                  fontFamily: "Bold",
                  fontSize: 18,
                  marginTop: 16,
                },
              ]}
            >
              Where are you going?
            </Text>
            <Text
              style={[
                styles.subLabel,
                commonStyling.subtitle,
                {
                  fontSize: 14,
                },
              ]}
            >
              Enter pickup and destination
            </Text>

            <View style={styles.inputGroup}>
              <Text
                style={[
                  styles.inputLabel,
                  commonStyling.subtitle,
                  {
                    fontSize: 12,
                    fontFamily: "Medium",
                  },
                ]}
              >
                Pickup Location
              </Text>

              <GoogleInput
                placeholder={`2847 Maple Avenue`}
                borderColor={colors.krGreen}
                inputValue={pickUpForm.address}
                setinputValue={(t: string) =>
                  updatePickUPFormFields({ address: t })
                }
                dropdown={true}
                onPlaceSelected={onPickUpPlaceSelected}
                loading={loadingPickup}
                setLoading={setloadingPickup}
              />

              <Text
                style={[
                  styles.inputLabel,
                  commonStyling.subtitle,
                  {
                    fontSize: 12,
                    fontFamily: "Medium",
                    marginTop: 16,
                  },
                ]}
              >
                Destination
              </Text>
              <GoogleInput
                placeholder={`4567 Maple Avenue`}
                borderColor={colors.krGreen}
                inputValue={destinationForm.address}
                setinputValue={(t: string) =>
                  updateDestinationFormFields({ address: t })
                }
                dropdown={true}
                onPlaceSelected={onDestinationPlaceSelected}
                loading={loadingDestination}
                setLoading={setloadingDestination}
              />
            </View>

            {/* Date & Time Section */}
            <Text
              style={[
                commonStyling.title,
                {
                  fontFamily: "Bold",
                  fontSize: 18,
                  marginBottom: 16,
                },
              ]}
            >
              Date & Time
            </Text>
            <View style={styles.dateTimeRow}>
              <View
                style={{
                  width: "43%",
                }}
              >
                <Text
                  style={[
                    styles.inputLabel,
                    commonStyling.subtitle,
                    {
                      fontSize: 12,
                      fontFamily: "Medium",
                    },
                  ]}
                >
                  Date
                </Text>

                <TouchableOpacity
                  onPress={togglePicker}
                  activeOpacity={0.7}
                  style={[
                    styles.dateTimeInput,
                    {
                      borderWidth: 1,
                      borderColor: colors.lightPrimaryBlueBorder,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 12,
                      borderRadius: 10,
                    },
                  ]}
                >
                  <Text style={[commonStyling.title, { fontSize: 15 }]}>
                    {format(date, "dd/MM/yyyy")}
                  </Text>
                  <CalendarIcon size={18} color="#64748B" />
                </TouchableOpacity>

                {/* iOS Picker Modal */}
                <CalendarComponent
                  visible={showPicker}
                  date={date}
                  setDate={setDate}
                  setShowCalendar={setShowPicker}
                  minDate={
                    serviceType === "Transport + Escort" ? minDateString : today
                  }
                  onPress={() => {}}
                />
              </View>

              <View
                style={{
                  width: "40%",
                }}
              >
                <Text
                  style={[
                    styles.inputLabel,
                    commonStyling.subtitle,
                    {
                      fontSize: 12,
                      fontFamily: "Medium",
                    },
                  ]}
                >
                  Time
                </Text>
                <TouchableOpacity
                  onPress={() => setShowTimePicker(!showTimePicker)}
                  activeOpacity={0.7}
                  style={[
                    styles.dateTimeInput,
                    {
                      borderWidth: 1,
                      borderColor: colors.lightPrimaryBlueBorder,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 12,
                      borderRadius: 10,
                    },
                  ]}
                >
                  <Text style={[commonStyling.title, { fontSize: 15 }]}>
                    {time}
                  </Text>
                  <Clock size={18} color="#64748B" />
                </TouchableOpacity>

                {/* Time Picker Logic */}
              </View>
            </View>

            {showTimePicker && (
              <View
                style={{
                  marginTop: 16,
                }}
              >
                <TimePicker
                  initialHour={parseInt(time.split(":")[0])}
                  initialMinute={parseInt(time.split(":")[1])}
                  selectedDate={date}
                  minMinutesFromNow={20}
                  onChange={(selectedTime) => {
                    setTime(selectedTime);
                  }}
                />
              </View>
            )}

            {tripType === "Round Trip" && (
              <View
                style={{
                  marginTop: 32,
                }}
              >
                <Text
                  style={[
                    commonStyling.title,
                    {
                      fontFamily: "Bold",
                      fontSize: 18,
                      marginBottom: 16,
                    },
                  ]}
                >
                  Return details
                </Text>
                <View>
                  <View
                    style={{
                      width: "100%",
                    }}
                  >
                    <Text
                      style={[
                        styles.inputLabel,
                        commonStyling.subtitle,
                        {
                          fontSize: 12,
                          fontFamily: "Medium",
                        },
                      ]}
                    >
                      RETURN PICKUP TIME
                    </Text>
                    <View
                      style={[
                        styles.dateTimeInput,
                        {
                          borderWidth: 1,
                          borderColor: colors.lightPrimaryBlueBorder,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          commonStyling.title,
                          {
                            fontSize: 15,
                          },
                        ]}
                      >
                        10:30 AM
                      </Text>
                      <Clock size={18} color="#64748B" />
                    </View>
                  </View>
                </View>

                <View>
                  <View
                    style={{
                      width: "100%",
                    }}
                  >
                    <Text
                      style={[
                        styles.inputLabel,
                        commonStyling.subtitle,
                        {
                          fontSize: 12,
                          fontFamily: "Medium",
                          marginTop: 16,
                        },
                      ]}
                    >
                      APPOINTMENT DURATION
                    </Text>
                    <View
                      style={[
                        styles.dateTimeInput,
                        {
                          borderWidth: 1,
                          borderColor: colors.lightPrimaryBlueBorder,
                        },
                      ]}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          columnGap: 12,
                        }}
                      >
                        <Clock size={18} color="#64748B" />
                        <Text
                          style={[
                            commonStyling.title,
                            {
                              fontSize: 15,
                            },
                          ]}
                        >
                          30 minutes
                        </Text>
                      </View>
                      <LucideArrowDown size={18} color="#64748B" />
                    </View>
                  </View>
                </View>
              </View>
            )}
            {/* Passenger Section */}
            <Text
              style={[
                commonStyling.title,
                {
                  fontFamily: "Bold",
                  fontSize: 18,
                  marginTop: 32,
                },
              ]}
            >
              Who needs this ride?
            </Text>
            <Text
              style={[
                styles.subLabel,
                commonStyling.subtitle,
                {
                  fontSize: 14,
                },
              ]}
            >
              Select or add a passenger
            </Text>

            <TouchableOpacity
              style={[
                styles.choiceCard,
                {
                  borderColor:
                    passenger === "Myself"
                      ? colors.primaryColor
                      : colors.lightPrimaryBlueBorder,
                },
              ]}
              onPress={() => setPassenger("Myself")}
            >
              <View
                style={[
                  styles.iconBox,
                  passenger === "Myself" && styles.activeIconBox,
                ]}
              >
                <User
                  color={passenger === "Myself" ? "#FFF" : "#64748B"}
                  size={20}
                />
              </View>
              <View style={styles.choiceTextContainer}>
                <Text
                  style={[
                    commonStyling.title,
                    {
                      fontSize: 16,
                      fontFamily: "Bold",
                    },
                  ]}
                >
                  Myself
                </Text>
                <Text
                  style={[
                    styles.choiceDesc,
                    commonStyling.subtitle,
                    {
                      fontSize: 14,
                      fontFamily: "Medium",
                    },
                  ]}
                >
                  From my account
                </Text>
              </View>
              {passenger === "Myself" && <Check color="#2563EB" size={20} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.choiceCard,
                {
                  borderColor:
                    passenger === "Someone Else"
                      ? colors.primaryColor
                      : colors.lightPrimaryBlueBorder,
                },
              ]}
              onPress={() => setPassenger("Someone Else")}
            >
              <View
                style={[
                  styles.iconBox,
                  passenger === "Someone Else" && styles.activeIconBox,
                ]}
              >
                <UserPlus
                  color={passenger === "Someone Else" ? "#FFF" : "#64748B"}
                  size={20}
                />
              </View>
              <View style={styles.choiceTextContainer}>
                <Text
                  style={[
                    commonStyling.title,
                    {
                      fontSize: 16,
                      fontFamily: "Bold",
                    },
                  ]}
                >
                  Someone Else
                </Text>
                <Text
                  style={[
                    styles.choiceDesc,
                    commonStyling.subtitle,
                    {
                      fontSize: 14,
                      fontFamily: "Medium",
                    },
                  ]}
                >
                  Non app user
                </Text>
              </View>
              {passenger === "Someone Else" && (
                <Check color="#2563EB" size={20} />
              )}
            </TouchableOpacity>

            {/* Mobility Section */}
            <Text
              style={[
                commonStyling.title,
                {
                  fontFamily: "Bold",
                  fontSize: 18,
                  marginTop: 32,
                },
              ]}
            >
              Mobility Level
            </Text>
            <Text
              style={[
                styles.subLabel,
                commonStyling.subtitle,
                {
                  fontSize: 14,
                },
              ]}
            >
              Select mobility requirements
            </Text>

            <TouchableOpacity
              style={[
                styles.choiceCard,
                {
                  borderColor:
                    mobility === "Ambulatory"
                      ? colors.primaryColor
                      : colors.lightPrimaryBlueBorder,
                },
              ]}
              onPress={() => setMobility("Ambulatory")}
            >
              <View
                style={[
                  styles.iconBox,
                  mobility === "Ambulatory" && styles.activeIconBox,
                ]}
              >
                <User
                  color={mobility === "Ambulatory" ? "#FFF" : "#64748B"}
                  size={20}
                />
              </View>
              <View style={styles.choiceTextContainer}>
                <Text
                  style={[
                    commonStyling.title,
                    {
                      fontSize: 16,
                      fontFamily: "Bold",
                    },
                  ]}
                >
                  Ambulatory
                </Text>
                <Text
                  style={[
                    styles.choiceDesc,
                    commonStyling.subtitle,
                    {
                      fontSize: 14,
                      fontFamily: "Medium",
                    },
                  ]}
                >
                  Can walk independently
                </Text>
              </View>
              {mobility === "Ambulatory" && <Check color="#2563EB" size={20} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.choiceCard,
                {
                  borderColor:
                    mobility === "Wheelchair"
                      ? colors.primaryColor
                      : colors.lightPrimaryBlueBorder,
                },
              ]}
              onPress={() => setMobility("Wheelchair")}
            >
              <View
                style={[
                  styles.iconBox,
                  mobility === "Wheelchair" && styles.activeIconBox,
                ]}
              >
                <Accessibility
                  color={mobility === "Wheelchair" ? "#FFF" : "#64748B"}
                  size={20}
                />
              </View>
              <View style={styles.choiceTextContainer}>
                <Text
                  style={[
                    commonStyling.title,
                    {
                      fontSize: 16,
                      fontFamily: "Bold",
                    },
                  ]}
                >
                  Wheelchair
                </Text>
                <Text
                  style={[
                    styles.choiceDesc,
                    commonStyling.subtitle,
                    {
                      fontSize: 14,
                      fontFamily: "Medium",
                    },
                  ]}
                >
                  Uses wheelchair
                </Text>
              </View>

              {mobility === "Wheelchair" && <Check color="#2563EB" size={20} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.choiceCard,
                {
                  borderColor:
                    mobility === "Stretcher"
                      ? colors.primaryColor
                      : colors.lightPrimaryBlueBorder,
                },
              ]}
              onPress={() => setMobility("Stretcher")}
            >
              <View
                style={[
                  styles.iconBox,
                  mobility === "Stretcher" && styles.activeIconBox,
                ]}
              >
                <Info
                  color={mobility === "Stretcher" ? "#FFF" : "#64748B"}
                  size={20}
                />
              </View>
              <View style={styles.choiceTextContainer}>
                <Text
                  style={[
                    commonStyling.title,
                    {
                      fontSize: 16,
                      fontFamily: "Bold",
                    },
                  ]}
                >
                  Stretcher
                </Text>
                <Text
                  style={[
                    styles.choiceDesc,
                    commonStyling.subtitle,
                    {
                      fontSize: 14,
                      fontFamily: "Medium",
                    },
                  ]}
                >
                  Requires stretcher
                </Text>
              </View>
              {mobility === "Stretcher" && <Check color="#2563EB" size={20} />}
            </TouchableOpacity>

            <Text
              style={[
                commonStyling.title,
                {
                  fontFamily: "Bold",
                  fontSize: 18,
                  marginTop: 32,
                },
              ]}
            >
              Assistance Level
            </Text>
            <Text
              style={[
                styles.subLabel,
                commonStyling.subtitle,
                {
                  fontSize: 14,
                },
              ]}
            >
              How much help is needed?
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={[
                  styles.choiceCard,
                  {
                    borderColor:
                      assistance === "none"
                        ? colors.primaryColor
                        : colors.lightPrimaryBlueBorder,
                    backgroundColor:
                      assistance === "none" ? colors.primaryColor : "",
                    width: "30%",
                    alignItems: "center",
                  },
                ]}
                onPress={() => setassistance("none")}
              >
                <View style={styles.choiceTextContainer}>
                  <Text
                    style={[
                      commonStyling.title,
                      {
                        fontSize: 13,
                        fontFamily: "Bold",
                        textAlign: "center",
                        color:
                          assistance === "none" ? "#ffffff" : colors.titleText,
                      },
                    ]}
                  >
                    None
                  </Text>
                  <Text
                    style={[
                      styles.choiceDesc,
                      commonStyling.subtitle,
                      {
                        fontSize: 10,
                        fontFamily: "Medium",
                        color:
                          assistance === "none" ? "#ffffff" : colors.titleText,
                      },
                    ]}
                  >
                    Independent
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.choiceCard,
                  {
                    borderColor:
                      assistance === "Minimal"
                        ? colors.primaryColor
                        : colors.lightPrimaryBlueBorder,
                    backgroundColor:
                      assistance === "Minimal" ? colors.primaryColor : "",
                    width: "30%",
                    alignItems: "center",
                  },
                ]}
                onPress={() => setassistance("Minimal")}
              >
                <View style={styles.choiceTextContainer}>
                  <Text
                    style={[
                      commonStyling.title,
                      {
                        fontSize: 13,
                        fontFamily: "Bold",
                        textAlign: "center",
                        color:
                          assistance === "Minimal"
                            ? "#ffffff"
                            : colors.titleText,
                      },
                    ]}
                  >
                    Minimal
                  </Text>
                  <Text
                    style={[
                      styles.choiceDesc,
                      commonStyling.subtitle,
                      {
                        fontSize: 10,
                        fontFamily: "Medium",
                        color:
                          assistance === "Minimal"
                            ? "#ffffff"
                            : colors.titleText,
                      },
                    ]}
                  >
                    Light support
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.choiceCard,
                  {
                    borderColor:
                      assistance === "Full"
                        ? colors.primaryColor
                        : colors.lightPrimaryBlueBorder,
                    backgroundColor:
                      assistance === "Full" ? colors.primaryColor : "",
                    width: "30%",
                    alignItems: "center",
                  },
                ]}
                onPress={() => setassistance("Full")}
              >
                <View style={styles.choiceTextContainer}>
                  <Text
                    style={[
                      commonStyling.title,
                      {
                        fontSize: 13,
                        fontFamily: "Bold",
                        textAlign: "center",
                        color:
                          assistance === "Full" ? "#ffffff" : colors.titleText,
                      },
                    ]}
                  >
                    Full
                  </Text>
                  <Text
                    style={[
                      styles.choiceDesc,
                      commonStyling.subtitle,
                      {
                        fontSize: 10,
                        fontFamily: "Medium",
                        textAlign: "center",
                        color:
                          assistance === "Full" ? "#ffffff" : colors.titleText,
                      },
                    ]}
                  >
                    Complete assistance
                  </Text>
                </View>
                {mobility === "Stretcher" && (
                  <Check color="#2563EB" size={20} />
                )}
              </TouchableOpacity>
            </View>

            <Text
              style={[
                commonStyling.title,
                {
                  fontFamily: "Bold",
                  fontSize: 18,
                  marginTop: 32,
                },
              ]}
            >
              Additional Notes
            </Text>
            <Text
              style={[
                styles.subLabel,
                commonStyling.subtitle,
                {
                  fontSize: 14,
                  marginBottom: -8,
                },
              ]}
            >
              Any special instructions for the driver
            </Text>
            <MultilineInput
              title=""
              value={additionalNotes}
              onChangeText={(val) => setadditionalNotes(val)}
              placeholder="E.g I need help getting to the car please be extra patient....."
            />
          </View>
        );
      case 3:
        return (
          <View>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 18,
                  fontFamily: "Bold",
                },
              ]}
            >
              Choose a ride
            </Text>
            <Text
              style={[
                styles.sectionSubtitle,
                commonStyling.subtitle,
                {
                  fontSize: 14,
                },
              ]}
            >
              Select the vehicle that fits your needs
            </Text>
            {loadingEstimates ? (
              <View>
                <ActivityIndicator size="large" color={colors.primaryColor} />
                <Text style={commonStyling.subtitle}>Calculating fares...</Text>
              </View>
            ) : (
              estimate.map((est: any) => (
                <VehicleTypeCard
                  key={est.ride_type}
                  title={est.display_name}
                  fare={est.base_fare}
                  category={est.category}
                  description={est.description}
                  passengers={est.passengers}
                  bestFor={est.best_for}
                  feature1={est.features[0]}
                  feature2={est.features[1]}
                  selected={vehicle === est.display_name}
                  onPress={() => {
                    setVehicle(est.display_name);
                    setfare(est.base_fare);
                  }}
                />
              ))
            )}
          </View>
        );
      case 4:
        return (
          <View>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 18,
                  fontFamily: "Bold",
                },
              ]}
            >
              Recurring Ride
            </Text>
            <Text
              style={[
                styles.sectionSubtitle,
                commonStyling.subtitle,
                {
                  fontSize: 14,
                },
              ]}
            >
              Schedule multiple rides at once
            </Text>

            <View
              style={[
                styles.toggleCard,
                {
                  borderColor: colors.lightPrimaryBlueBorder,
                },
              ]}
            >
              <View style={styles.toggleInfo}>
                <View style={styles.iconCircle}>
                  <Repeat color="#2563EB" size={20} />
                </View>
                <View>
                  <Text
                    style={[
                      commonStyling.title,
                      {
                        fontSize: 14,
                        fontFamily: "SemiBold",
                      },
                    ]}
                  >
                    Make this recurring
                  </Text>
                  <Text
                    style={[
                      styles.toggleSub,
                      commonStyling.subtitle,
                      {
                        fontSize: 12,
                      },
                    ]}
                  >
                    Save time on repeat bookings
                  </Text>
                </View>
              </View>
              <Switch
                trackColor={{ false: "#E2E8F0", true: "#2563EB" }}
                thumbColor="#FFF"
                onValueChange={() => setRecurring(!recurring)}
                value={recurring}
              />
            </View>

            {recurring && (
              <View>
                {/* Frequency Grid */}
                <Text
                  style={[
                    commonStyling.title,
                    {
                      fontFamily: "SemiBold",
                      fontSize: 14,
                      marginBottom: 16,
                    },
                  ]}
                >
                  Frequency
                </Text>
                <View style={styles.frequencyGrid}>
                  {["Daily", "Weekly", "Bi-Weekly", "Monthly"].map((item) => (
                    <TouchableOpacity
                      key={item}
                      onPress={() => setFrequency(item)}
                      style={[
                        styles.gridItem,

                        {
                          borderColor:
                            frequency === item
                              ? colors.primaryColor
                              : colors.lightPrimaryBlueBorder,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          commonStyling.title,
                          {
                            color:
                              frequency === item
                                ? colors.primaryColor
                                : colors.titleText,
                            fontSize: 14,
                          },
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {/* Start Date */}
                <Text
                  style={[
                    commonStyling.title,
                    {
                      fontFamily: "SemiBold",
                      fontSize: 14,
                      marginBottom: 8,
                    },
                  ]}
                >
                  Start Date
                </Text>
                <TouchableOpacity
                  onPress={toggleRecurringStartDatePicker}
                  activeOpacity={0.7}
                  style={[
                    styles.dateTimeInput,
                    {
                      borderWidth: 1,
                      borderColor: colors.lightPrimaryBlueBorder,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 12,
                      borderRadius: 10,
                    },
                  ]}
                >
                  <Text style={[commonStyling.title, { fontSize: 15 }]}>
                    {format(recurringStartdate, "dd/MM/yyyy")}
                  </Text>
                  <CalendarIcon size={18} color="#64748B" />
                </TouchableOpacity>

                {/* iOS Picker Modal */}
                <CalendarComponent
                  visible={showrecurringStartDatePicker}
                  date={recurringStartdate}
                  setDate={setrecurringStartDate}
                  setShowCalendar={setShowrecurringStartDatePicker}
                  // minDate={minDate}
                  // maxDate={maxDate}
                  onPress={() => {}}
                />
                {/* Ends Section */}
                <Text
                  style={[
                    commonStyling.title,
                    {
                      fontFamily: "SemiBold",
                      fontSize: 14,
                      marginBottom: 8,
                      marginTop: 24,
                    },
                  ]}
                >
                  Ends
                </Text>
                <View
                  style={[
                    styles.tabContainer,
                    {
                      backgroundColor: colors.surfaceSecondary,
                    },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => setEndType("By Date")}
                    style={[
                      styles.tab,
                      endType === "By Date" && styles.activeTab,
                    ]}
                  >
                    <Text
                      style={[
                        commonStyling.subtitle,
                        {
                          fontSize: 14,
                          fontFamily: "Medium",
                          color:
                            endType === "By Date"
                              ? colors.primaryColor
                              : colors.textSecondary,
                        },
                      ]}
                    >
                      By Date
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setEndType("No of Rides")}
                    style={[
                      styles.tab,
                      endType === "No of Rides" && styles.activeTab,
                    ]}
                  >
                    <Text
                      style={[
                        commonStyling.subtitle,
                        {
                          fontSize: 14,
                          fontFamily: "Medium",
                          color:
                            endType === "No of Rides"
                              ? colors.primaryColor
                              : colors.textSecondary,
                        },
                      ]}
                    >
                      No of Rides
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* End Date Input */}
                {endType === "By Date" ? (
                  <View>
                    <TouchableOpacity
                      onPress={toggleRecurringEndDatePicker}
                      activeOpacity={0.7}
                      style={[
                        styles.dateTimeInput,
                        {
                          borderWidth: 1,
                          borderColor: colors.lightPrimaryBlueBorder,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: 12,
                          borderRadius: 10,
                        },
                      ]}
                    >
                      <Text style={[commonStyling.title, { fontSize: 15 }]}>
                        {format(recurringEnddate, "dd/MM/yyyy")}
                      </Text>
                      <CalendarIcon size={18} color="#64748B" />
                    </TouchableOpacity>

                    {/* iOS Picker Modal */}
                    <CalendarComponent
                      visible={showrecurringEndDatePicker}
                      date={recurringEnddate}
                      setDate={setrecurringEndDate}
                      setShowCalendar={setShowrecurringEndDatePicker}
                      // minDate={minDate}
                      // maxDate={maxDate}
                      onPress={() => {}}
                    />
                  </View>
                ) : (
                  <View
                    style={[
                      styles.datePickerInput,
                      {
                        borderWidth: 1,
                        borderColor: colors.lightPrimaryBlueBorder,
                        marginTop: 16,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        commonStyling.title,
                        {
                          fontSize: 14,
                        },
                      ]}
                    >
                      10
                    </Text>
                    <ArrowDownUp size={20} color="#64748B" />
                  </View>
                )}
              </View>
            )}
          </View>
        );
      case 5:
        return (
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
            fare={fare}
          />
        );

      case 6:
        return (
          <View>
            {/* Header */}

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
                Payment
              </Text>
              <Text
                style={[
                  styles.stepIndicator,
                  commonStyling.subtitle,
                  {
                    fontSize: 14,
                    marginBottom: 16,
                  },
                ]}
              >
                Choose your payment method
              </Text>

              <Text
                style={[
                  commonStyling.title,
                  {
                    fontSize: 13,
                    fontFamily: "Bold",
                    marginVertical: 16,
                  },
                ]}
              >
                PAYMENT METHODS
              </Text>

              {/* Visa Card (Selected/Default) */}
              <View
                style={[
                  styles.cardGroup,
                  { borderColor: colors.lightPrimaryBlueBorder },
                ]}
              >
                {isLoading ? (
                  <ActivityIndicator
                    style={{ padding: 20 }}
                    color={colors.primaryColor}
                  />
                ) : paymentMethods.length > 0 ? (
                  paymentMethods.map((method, index) => {
                    const brand = getBrandDetails(method.brand);
                    const isLast = index === paymentMethods.length - 1;

                    return (
                      <React.Fragment key={method.id}>
                        <TouchableOpacity
                          style={styles.paymentRow}
                          onPress={() =>
                            navigation.navigate("PaymentDetailsScreen", {
                              id: method.id,
                            })
                          }
                        >
                          <View
                            style={[
                              styles.iconContainer,
                              {
                                backgroundColor: colors.homelightPrimaryBlue50,
                              },
                            ]}
                          >
                            <CreditCard size={20} color={brand.color} />
                          </View>

                          <View style={styles.textContent}>
                            <View style={styles.titleRow}>
                              <Text
                                style={[
                                  commonStyling.title,
                                  { fontSize: 15, fontFamily: "SemiBold" },
                                ]}
                              >
                                {brand.label} •••• {method.last_four}
                              </Text>
                              {method.is_default && (
                                <View style={styles.defaultBadge}>
                                  <Text style={styles.defaultText}>
                                    DEFAULT
                                  </Text>
                                </View>
                              )}
                            </View>
                            <Text
                              style={[
                                commonStyling.subtitle,
                                {
                                  fontSize: 13,
                                  fontFamily: "Medium",
                                  marginTop: 2,
                                },
                              ]}
                            >
                              {method.holder_name}
                            </Text>
                          </View>
                          <ChevronRight size={18} color="#CBD5E1" />
                        </TouchableOpacity>

                        {!isLast && (
                          <View
                            style={[
                              styles.divider,
                              {
                                backgroundColor: colors.lightPrimaryBlueBorder,
                              },
                            ]}
                          />
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <Text
                    style={{
                      padding: 20,
                      textAlign: "center",
                      color: colors.subTitleText,
                    }}
                  >
                    No cards saved yet.
                  </Text>
                )}
              </View>

              {/* Add New Method */}
              <TouchableOpacity
                style={[
                  styles.addNewBtn,
                  {
                    borderColor: colors.lightPrimaryBlueBorder,
                    marginTop: 16,
                  },
                ]}
              >
                <View style={styles.plusIconBox}>
                  <Plus size={24} color="#94A3B8" />
                </View>
                <View>
                  <Text
                    style={[
                      commonStyling.title,
                      {
                        fontSize: 16,
                        fontFamily: "Bold",
                      },
                    ]}
                  >
                    Add new payment method
                  </Text>
                  <Text
                    style={[
                      styles.expiry,
                      commonStyling.subtitle,
                      { fontSize: 13, fontFamily: "Medium" },
                    ]}
                  >
                    Credit or debit card
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Booking Summary Card */}
              <View
                style={[
                  styles.summaryCard,
                  {
                    borderColor: colors.lightPrimaryBlueBorder,
                    borderWidth: 1,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.summaryTitle,
                    commonStyling.title,
                    {
                      fontSize: 13,
                      fontFamily: "Bold",
                    },
                  ]}
                >
                  BOOKING SUMMARY
                </Text>
                <View style={styles.summaryRow}>
                  <Text
                    style={[
                      commonStyling.subtitle,
                      {
                        fontSize: 14,
                      },
                    ]}
                  >
                    {vehicle}
                  </Text>
                  <Text
                    style={[
                      commonStyling.title,
                      {
                        fontFamily: "SemiBold",
                        fontSize: 15,
                      },
                    ]}
                  >
                    ${fare}
                  </Text>
                </View>
                {/* <View style={styles.summaryRow}>
                  <Text
                    style={[
                      commonStyling.subtitle,
                      {
                        fontSize: 14,
                      },
                    ]}
                  >
                    Service fee
                  </Text>
                  <Text
                    style={[
                      commonStyling.title,
                      {
                        fontFamily: "SemiBold",
                        fontSize: 15,
                      },
                    ]}
                  >
                    $3.50
                  </Text>
                </View> */}
                <View style={styles.summaryDivider} />
                <View style={styles.totalRow}>
                  <Text
                    style={[
                      commonStyling.title,
                      {
                        fontSize: 18,
                        fontFamily: "Bold",
                      },
                    ]}
                  >
                    Total
                  </Text>
                  <Text
                    style={{
                      fontSize: 28,
                      fontFamily: "Bold",
                      color: colors.primaryColor,
                    }}
                  >
                    ${fare}
                  </Text>
                </View>
              </View>
            </View>
          </View>
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
        {step < 5 && (
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
            if (step === 2) {
              handleGetEstimate();
              nextStep();
            } else {
              nextStep();
            }
          }}
        >
          {isPending ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.continueText}>
              {step === 4
                ? "Continue to review"
                : step === 5
                  ? "Continue to Payment"
                  : step === 6
                    ? "Pay"
                    : "Continue"}
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
              ${fare}
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

// --- Sub-Components ---

const SelectionCard = ({
  title,
  desc,
  icon,
  selected,
  onPress,
  badge,
}: any) => {
  const { colors } = useTheme();
  const commonStyling = commonStyles(colors);

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          borderColor: selected
            ? colors.primaryColor
            : colors.lightPrimaryBlueBorder,
        },
      ]}
      onPress={onPress}
    >
      <View
        style={[styles.iconContainer, selected && styles.iconContainerSelected]}
      >
        {icon}
      </View>
      <View style={{ flex: 1, marginLeft: 16 }}>
        <View style={styles.row}>
          <Text
            style={[
              commonStyling.title,
              {
                fontSize: 16,
                fontFamily: "Bold",
              },
            ]}
          >
            {title}
          </Text>
          {badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>
        <Text
          style={[
            styles.cardDesc,
            commonStyling.subtitle,
            {
              fontFamily: "Medium",
              fontSize: 14,
            },
          ]}
        >
          {desc}
        </Text>
      </View>
      {selected && <CheckCircle2 color="#2E66E7" size={20} />}
    </TouchableOpacity>
  );
};

const GridCard = ({ title, icon, selected, onPress }: any) => {
  const { colors } = useTheme();
  const commonStyling = commonStyles(colors);
  return (
    <TouchableOpacity
      style={[
        styles.gridCard,
        {
          borderColor: selected
            ? colors.primaryColor
            : colors.lightPrimaryBlueBorder,
        },
      ]}
      onPress={onPress}
    >
      <View style={styles.gridIcon}>{icon}</View>
      <Text
        style={[
          commonStyling.title,
          {
            fontSize: 14,
            fontFamily: "Bold",
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const ReviewScreen = ({
  tripType,
  appointment,
  serviceType,
  vehicle,
  pickup,
  destination,
  mobility,
  assistance,
  isRecurring,
  notes,
  frequency,
  endType,
  date,
  time,
  recurringStartDate,
  recurringEndDate,
  fare,
}: any) => {
  const { colors } = useTheme();
  const commonStyling = commonStyles(colors);

  const renderSectionHeader = (title: string) => (
    <View style={styles.sectionHeader}>
      <Text style={[commonStyling.title, { fontSize: 14, fontFamily: "Bold" }]}>
        {title}
      </Text>
      {/* <TouchableOpacity style={styles.editBtn}>
        <Edit2 size={14} color={colors.primaryColor} />
        <Text
          style={[
            commonStyling.title,
            {
              fontSize: 12,
              color: colors.primaryColor,
            },
          ]}
        >
          Edit
        </Text>
      </TouchableOpacity> */}
    </View>
  );

  return (
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
        Review & Confirm
      </Text>
      <Text
        style={[
          styles.stepIndicator,
          commonStyling.subtitle,
          {
            fontSize: 14,
            marginBottom: 16,
          },
        ]}
      >
        Check your booking details
      </Text>

      {/* Service Details Card */}
      <View
        style={[
          styles.infoCard,
          {
            borderColor: colors.lightPrimaryBlueBorder,
          },
        ]}
      >
        {renderSectionHeader("Service Details")}
        <View style={styles.detailRow}>
          <Car size={16} color="#64748B" />
          <Text
            style={[
              styles.detailLabel,
              commonStyling.subtitle,
              {
                fontSize: 12,
              },
            ]}
          >
            Trip Type:
          </Text>
          <Text
            style={[
              commonStyling.title,
              {
                fontSize: 12,
                fontFamily: "SemiBold",
              },
            ]}
          >
            {serviceType}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Stethoscope size={16} color="#64748B" />
          <Text
            style={[
              styles.detailLabel,
              commonStyling.subtitle,
              {
                fontSize: 12,
              },
            ]}
          >
            Appointment:
          </Text>
          <Text
            style={[
              commonStyling.title,
              {
                fontSize: 12,
                fontFamily: "SemiBold",
              },
            ]}
          >
            {appointment}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <ArrowLeftRight size={16} color="#64748B" />
          <Text
            style={[
              styles.detailLabel,
              commonStyling.subtitle,
              {
                fontSize: 12,
              },
            ]}
          >
            Structure:
          </Text>
          <Text
            style={[
              commonStyling.title,
              {
                fontSize: 12,
                fontFamily: "SemiBold",
              },
            ]}
          >
            {tripType}
          </Text>
        </View>
      </View>

      {/* Vehicle Card */}
      <View
        style={[
          styles.infoCard,
          {
            borderColor: colors.lightPrimaryBlueBorder,
          },
        ]}
      >
        {renderSectionHeader("Vehicle")}
        <View style={styles.rowBetween}>
          <Text
            style={[
              commonStyling.title,
              {
                fontSize: 12,
                fontFamily: "SemiBold",
              },
            ]}
          >
            {vehicle}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Bold",
              color: colors.primaryColor,
            }}
          >
            ${fare}
          </Text>
        </View>
      </View>

      {/* Route Card */}
      <View
        style={[
          styles.infoCard,
          {
            borderColor: colors.lightPrimaryBlueBorder,
          },
        ]}
      >
        {renderSectionHeader("Route")}
        <View style={styles.routeItem}>
          <MapPin size={18} color="#2563EB" />
          <View style={styles.routeTextContainer}>
            <Text
              style={[
                styles.routeLabel,
                commonStyling.subtitle,
                {
                  fontSize: 10,
                },
              ]}
            >
              Pickup
            </Text>
            <Text
              style={[
                styles.addressText,
                commonStyling.title,
                {
                  fontSize: 12,
                  fontFamily: "SemiBold",
                },
              ]}
            >
              {pickup}
            </Text>
          </View>
        </View>
        <View style={styles.routeItem}>
          <Navigation size={18} color="#10B981" />
          <View style={styles.routeTextContainer}>
            <Text
              style={[
                styles.routeLabel,
                commonStyling.subtitle,
                {
                  fontSize: 10,
                },
              ]}
            >
              Destination
            </Text>
            <Text
              style={[
                styles.addressText,
                commonStyling.title,
                {
                  fontSize: 12,
                  fontFamily: "SemiBold",
                },
              ]}
            >
              {destination}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.divider,
            {
              backgroundColor: colors.lightPrimaryBlueBorder,
            },
          ]}
        />
        <View style={styles.rowBetween}>
          <View>
            <Text
              style={[
                styles.routeLabel,
                commonStyling.subtitle,
                {
                  fontSize: 10,
                },
              ]}
            >
              Pickup Date
            </Text>
            <Text
              style={[
                styles.dateValue,
                commonStyling.title,
                {
                  fontSize: 12,
                  fontFamily: "SemiBold",
                },
              ]}
            >
              {format(date, "dd/MM/yyyy")}
            </Text>
          </View>
          <View>
            <Text
              style={[
                styles.routeLabel,
                commonStyling.subtitle,
                {
                  fontSize: 10,
                },
              ]}
            >
              Pickup Time
            </Text>
            <Text
              style={[
                styles.dateValue,
                commonStyling.title,
                {
                  fontSize: 12,
                  fontFamily: "SemiBold",
                },
              ]}
            >
              {time}
            </Text>
          </View>
        </View>
      </View>

      {/* Passenger Card */}
      {/* <View
        style={[
          styles.infoCard,
          {
            borderColor: colors.lightPrimaryBlueBorder,
          },
        ]}
      >
        {renderSectionHeader("Passenger")}

        <View style={styles.passengerHeader}>
          <View style={styles.avatar}>
            <User size={20} color="#64748B" />
          </View>
          <View>
            <View>
              <Text
                style={[
                  commonStyling.title,
                  {
                    fontSize: 14,
                    fontFamily: "SemiBold",
                  },
                ]}
              >
                John Anderson
              </Text>
            </View>
            <View style={styles.pillRow}>
              <View
                style={[
                  styles.grayPill,
                  {
                    backgroundColor: colors.surfaceSecondary,
                  },
                ]}
              >
                <Text
                  style={[
                    commonStyling.subtitle,
                    {
                      fontSize: 10,
                      fontFamily: "Medium",
                    },
                  ]}
                >
                  {mobility}
                </Text>
              </View>
              <View
                style={[
                  styles.grayPill,
                  {
                    backgroundColor: colors.surfaceSecondary,
                  },
                ]}
              >
                <Text
                  style={[
                    commonStyling.subtitle,
                    {
                      fontSize: 10,
                      fontFamily: "Medium",
                    },
                  ]}
                >
                  {assistance}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {notes && (
          <View>
            <Text
              style={[
                styles.notesLabel,
                commonStyling.subtitle,
                {
                  fontSize: 10,
                },
              ]}
            >
              Notes
            </Text>
            <Text
              style={[
                styles.notesText,
                commonStyling.subtitle,
                {
                  color: colors.titleText,
                  fontSize: 12,
                },
              ]}
            >
              {notes}
            </Text>
          </View>
        )}
      </View> */}

      {/* Recurring Summary Card */}
      {isRecurring && (
        <View
          style={[
            styles.infoCard,
            styles.recurringBorder,
            {
              borderColor: colors.lightPrimaryBlueBorder,
            },
          ]}
        >
          {renderSectionHeader("Recurring")}
          <View style={styles.rowBetween}>
            <Text
              style={[
                styles.detailLabel,
                commonStyling.subtitle,
                {
                  fontSize: 12,
                },
              ]}
            >
              Frequency
            </Text>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 12,
                  fontFamily: "SemiBold",
                },
              ]}
            >
              {frequency}
            </Text>
          </View>
          <View style={[styles.rowBetween, { marginTop: 8 }]}>
            <Text
              style={[
                styles.detailLabel,
                commonStyling.subtitle,
                {
                  fontSize: 12,
                },
              ]}
            >
              Starts
            </Text>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 12,
                  fontFamily: "SemiBold",
                },
              ]}
            >
              {format(recurringStartDate, "dd/MM/yyyy")}
            </Text>
          </View>
          <View style={[styles.rowBetween, { marginTop: 8 }]}>
            <Text
              style={[
                styles.detailLabel,
                commonStyling.subtitle,
                {
                  fontSize: 12,
                },
              ]}
            >
              Ends
            </Text>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 12,
                  fontFamily: "SemiBold",
                },
              ]}
            >
              {format(recurringEndDate, "dd/MM/yyyy")}
            </Text>
          </View>
          <View
            style={[
              styles.divider,
              {
                backgroundColor: colors.lightPrimaryBlueBorder,
              },
            ]}
          />
          {endType === "No of Rides" && (
            <View style={styles.rowBetween}>
              <Text
                style={[
                  commonStyling.title,
                  {
                    fontSize: 12,
                    fontFamily: "SemiBold",
                  },
                ]}
              >
                Total Rides
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Bold",
                  color: colors.primaryColor,
                }}
              >
                12 rides
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Estimated Cost Card */}
      <View
        style={[
          styles.infoCard,
          {
            borderColor: colors.lightPrimaryBlueBorder,
          },
        ]}
      >
        <Text
          style={[commonStyling.title, { fontSize: 14, fontFamily: "Bold" }]}
        >
          Estimated Cost
        </Text>
        <View style={[styles.rowBetween, { marginTop: 12 }]}>
          <Text
            style={[
              styles.detailLabel,
              commonStyling.subtitle,
              {
                fontSize: 12,
              },
            ]}
          >
            Per ride
          </Text>
          <Text
            style={[
              commonStyling.title,
              {
                fontSize: 12,
                fontFamily: "SemiBold",
              },
            ]}
          >
            ${fare}
          </Text>
        </View>
        {isRecurring && (
          <View style={[styles.rowBetween, { marginTop: 8 }]}>
            <Text
              style={[
                styles.detailLabel,
                commonStyling.subtitle,
                {
                  fontSize: 12,
                },
              ]}
            >
              Rides
            </Text>
            <Text
              style={[
                commonStyling.title,
                {
                  fontSize: 12,
                  fontFamily: "SemiBold",
                },
              ]}
            >
              ×12
            </Text>
          </View>
        )}
      </View>

      <Text
        style={[
          styles.disclaimer,
          commonStyling.subtitle,
          {
            fontSize: 10,
          },
        ]}
      >
        Final price may vary based on actual trip duration and services.
      </Text>

      {/* Pending Approval Notice */}
      <View
        style={[
          styles.approvalNotice,
          {
            backgroundColor: colors.lightYellow,
          },
        ]}
      >
        <Text
          style={[
            styles.approvalTitle,
            {
              fontSize: 12,
              fontFamily: "Bold",
              color: colors.darkYellow,
            },
          ]}
        >
          Pending Approval
        </Text>
        <Text
          style={[
            styles.approvalText,
            commonStyling.subtitle,
            {
              fontSize: 10,
              color: colors.darkYellow,
            },
          ]}
        >
          After payment, your booking will be sent for driver approval. You'll
          receive a notification once your booking has been confirmed and a
          driver assigned.
        </Text>
      </View>
    </View>
  );
};

const getStepName = (s: number) => {
  const names = [
    "Service Type",
    "Trip Structure",
    "Vehicle Type",
    "Recurring Ride",
  ];
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
  sectionSubtitle: {
    marginTop: 4,
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainerSelected: { backgroundColor: "#2E66E7" },
  cardDesc: { marginTop: 4 },
  badge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  badgeText: { color: "#15803D", fontSize: 10, fontWeight: "700" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridCard: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  gridIcon: { marginBottom: 12 },
  vehicleThumb: {
    width: 60,
    height: 40,
    backgroundColor: "#E2E8F0",
    borderRadius: 8,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2E66E7",
    marginTop: 8,
  },
  footer: {
    position: "absolute",
    bottom: 0,
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
  row: { flexDirection: "row", alignItems: "center" },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeholder: { height: 300, alignItems: "center", justifyContent: "center" },
  reviewCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    marginBottom: 16,
  },
  reviewHeader: { fontWeight: "700", fontSize: 16 },

  title: { fontSize: 24, fontWeight: "800", color: "#0F172A" },

  progressBar: { flexDirection: "row", gap: 6, marginBottom: 32 },
  progressSegment: { height: 4, flex: 1, borderRadius: 2 },
  activeSegment: { backgroundColor: "#2563EB" },
  inactiveSegment: { backgroundColor: "#E2E8F0" },

  subLabel: { marginTop: 4, marginBottom: 20 },

  choiceCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  activeIconBox: { backgroundColor: "#2563EB" },
  choiceTextContainer: { flex: 1 },
  choiceDesc: { marginTop: 2 },
  routePill: {
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },

  inputGroup: { marginBottom: 24 },
  inputLabel: { marginBottom: 8 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 14, fontWeight: "600", color: "#1E293B" },

  primaryContinueBtn: {
    height: 56,
    backgroundColor: "#2563EB",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  primaryContinueText: { color: "#FFF", fontSize: 16, fontWeight: "700" },

  dateTimeRow: { flexDirection: "row", gap: 12 },
  dateTimeInput: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
  },

  toggleCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 32,
  },
  toggleInfo: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleSub: { marginTop: 2 },

  frequencyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  gridItem: {
    width: "48%",
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  datePickerInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
  },

  tabContainer: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  activeTab: {
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    borderWidth: 1,
  },

  infoCard: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  recurringBorder: { borderColor: "#2563EB", borderWidth: 1 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  editBtn: { flexDirection: "row", alignItems: "center", gap: 4 },

  detailRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  detailLabel: { marginLeft: 8, flex: 1 },
  placeholderIcon: { width: 16 },

  routeItem: { flexDirection: "row", marginBottom: 16 },
  routeTextContainer: { marginLeft: 12 },
  routeLabel: {
    textTransform: "uppercase",
  },
  addressText: {
    marginTop: 2,
  },
  divider: { height: 1, marginVertical: 12 },
  dateValue: {
    marginTop: 2,
  },

  passengerHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },
  reviewBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  reviewBadgeText: { fontSize: 10, fontWeight: "700", color: "#92400E" },
  pillRow: { flexDirection: "row", gap: 6, marginTop: 6 },
  grayPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  notesLabel: {
    marginTop: 16,
  },
  notesText: { marginTop: 4 },

  disclaimer: {
    textAlign: "center",
    marginTop: 4,
    marginBottom: 24,
  },

  approvalNotice: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  approvalTitle: {
    marginBottom: 4,
  },
  approvalText: { lineHeight: 18 },

  paymentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 16,
    position: "relative",
  },
  defaultBadge: {
    position: "absolute",
    top: -10,
    left: 20,
    backgroundColor: "#FFF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  cardInfo: { flexDirection: "row", alignItems: "center", gap: 16 },
  logoContainer: {
    width: 60,
    height: 40,
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTypeLogo: { fontSize: 14, fontWeight: "900", fontStyle: "italic" },
  mcCircle: { width: 20, height: 20, borderRadius: 10, opacity: 0.8 },
  expiry: { marginTop: 2 },

  addNewBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: "dashed",
    gap: 16,
    marginBottom: 32,
  },
  plusIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },
  addNewSub: { fontSize: 13, color: "#94A3B8", marginTop: 2 },

  summaryCard: { borderRadius: 24, padding: 24 },
  summaryTitle: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryDivider: { height: 1, backgroundColor: "#E2E8F0", marginVertical: 16 },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  payBtn: {
    height: 64,
    backgroundColor: "#2563EB",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  payBtnText: { color: "#FFF", fontSize: 18, fontWeight: "700" },

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

  statusBtn: {
    width: "100%",
    height: 64,
    backgroundColor: "#2563EB",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  statusBtnText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  cardGroup: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
  },

  paymentRow: { flexDirection: "row", alignItems: "center", padding: 16 },

  textContent: { flex: 1, marginLeft: 12 },
  titleRow: { flexDirection: "row", alignItems: "center" },
  defaultText: { color: "#22C55E", fontSize: 10, fontWeight: "800" },
});

export default BookARide;
