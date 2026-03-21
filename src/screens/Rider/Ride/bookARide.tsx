import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
  Dimensions,
  StatusBar,
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
  MoreHorizontal,
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
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "../../../hooks/useThemes";
import { commonStyles } from "../../../styles/commonStyles";
import VehicleTypeCard from "../../../components/cards/vehicleTypeCard";
import GoogleInput from "../../../components/inputs/googleInput";

const { width } = Dimensions.get("window");

const BookARide = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 7;
  const { colors, theme } = useTheme();
  const commonStyling = commonStyles(colors);
  const [serviceType, setServiceType] = useState("Transport Only");
  const [appointmentType, setAppointmentType] = useState("Dialysis");
  const [vehicle, setVehicle] = useState("Medigo Standard");
  const [recurring, setRecurring] = useState(false);
  const [tripType, setTripType] = useState("One Way");
  const [passenger, setPassenger] = useState("Myself");
  const [mobility, setMobility] = useState("Ambulatory");
  const [loadingPickup, setloadingPickup] = useState(false);
  const [loadingDestination, setloadingDestination] = useState(false);
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

  const nextStep = () => step < totalSteps && setStep(step + 1);
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
            <VehicleTypeCard
              title="Medigo Standard"
              fare="45"
              category="Assisted"
              description="Comfortable assisted transport for mobile patients."
              passengers="Up to 3 passengers"
              bestFor="Routine appointments and light mobility support"
              feature1="Door-to-door assistance"
              feature2="Boarding support"
              selected={vehicle === "Medigo Standard"}
              onPress={() => setVehicle("Medigo Standard")}
            />

            <VehicleTypeCard
              title="MediGo Wheelchair"
              fare="45"
              category="WAT"
              description="Safe and secure transport for wheelchair users"
              passengers="1 wheelchair + 2"
              bestFor="Patients requiring ramp or lift access"
              feature1="ADA-compliant lift or ramp"
              feature2="Secure wheelchair locking"
              selected={vehicle === "MediGo Wheelchair"}
              onPress={() => setVehicle("MediGo Wheelchair")}
            />

            <VehicleTypeCard
              title="MediGo Stretcher"
              fare="65"
              category="NeMT"
              description="Full medical transport for patients unable to sit upright"
              passengers="1 stretcher"
              bestFor="Post-surgery, injury recovery, and non-emergency medical needs"
              feature1="Stretcher-compatible vehicle"
              feature2="Emergency-trained staff"
              selected={vehicle === "MediGo Stretcher"}
              onPress={() => setVehicle("MediGo Stretcher")}
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
            <View style={styles.dateTimeRow}>
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
                  10/10/2026
                </Text>
                <Calendar size={18} color="#64748B" />
              </View>
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
          </View>
        );
      case 7:
        return <ReviewScreen />;
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

      <ScrollView contentContainerStyle={styles.scrollContent}>
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
        <TouchableOpacity style={styles.continueButton} onPress={nextStep}>
          <Text style={styles.continueText}>
            {step === 7 ? "Confirm Booking" : "Continue"}
          </Text>
        </TouchableOpacity>
      </View>
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

const ReviewScreen = () => {
  const { colors } = useTheme();
  const commonStyling = commonStyles(colors);
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
        Review & Confirm
      </Text>
      <View style={styles.reviewCard}>
        <View style={styles.rowBetween}>
          <Text style={styles.reviewHeader}>Service Details</Text>
          <Edit2 size={16} color="#2E66E7" />
        </View>
        <ReviewItem
          icon={<Navigation size={16} />}
          label="Trip Type"
          val="Transport"
        />
        <ReviewItem
          icon={<CalendarIcon size={16} />}
          label="Appointment"
          val="Dialysis"
        />
      </View>
    </View>
  );
};

const ReviewItem = ({ icon, label, val }: any) => (
  <View style={[styles.row, { marginVertical: 4 }]}>
    {icon}
    <Text style={{ marginLeft: 8, color: "#64748B" }}>{label}: </Text>
    <Text style={{ fontWeight: "600" }}>{val}</Text>
  </View>
);

const getStepName = (s: number) => {
  const names = [
    "Service Type",
    "Vehicle Type",
    "Trip Structure",
    "Location",
    "Date & Time",
    "Passenger",
    "Review",
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
});

export default BookARide;
