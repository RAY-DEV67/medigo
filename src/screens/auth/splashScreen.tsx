// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   Dimensions,
//   StatusBar,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { ShieldCheck, MapPin, Car, ChevronRight } from "lucide-react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useNavigation } from "@react-navigation/native";

// const { width, height } = Dimensions.get("window");

// // --- Types ---
// type ScreenStep =
//   | "splash1"
//   | "splash2"
//   | "onboarding1"
//   | "onboarding2"
//   | "onboarding3"
//   | "selection";

// export default function MediGoApp() {
//   const [step, setStep] = useState<ScreenStep>("splash1");
//   // Auto-advance Splash Screens
//   useEffect(() => {
//     if (step === "splash1") {
//       setTimeout(() => setStep("splash2"), 1500);
//     } else if (step === "splash2") {
//       setTimeout(() => setStep("onboarding1"), 1500);
//     }
//   }, [step]);

//   // --- Sub-Components ---

//   const Pagination = ({ activeIndex }: { activeIndex: number }) => (
//     <View style={styles.paginationContainer}>
//       {[0, 1, 2].map((i) => (
//         <View
//           key={i}
//           style={[
//             styles.dot,
//             activeIndex === i ? styles.activeDot : styles.inactiveDot,
//           ]}
//         />
//       ))}
//     </View>
//   );

//   // --- Screen Renders ---

//   if (step === "splash1" || step === "splash2") {
//     return (
//       <LinearGradient colors={["#1A3B8E", "#06102B"]} style={styles.fullScreen}>
//         <StatusBar barStyle="light-content" />
//         {step === "splash2" && (
//           <View style={styles.logoContainer}>
//             <Image
//               source={{ uri: "https://i.imgur.com/your_logo_here.png" }} // Replace with actual asset
//               style={styles.logoPlaceholder}
//               resizeMode="contain"
//             />
//             <Text style={styles.splashText}>MediGo</Text>
//           </View>
//         )}
//       </LinearGradient>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" />

//       {step !== "selection" ? (
//         <>
//           <View style={styles.illustrationArea}>
//             {step === "onboarding1" && (
//               <Image
//                 source={{ uri: "https://placeholder.com/hospital" }}
//                 style={styles.illustration}
//               />
//             )}
//             {step === "onboarding2" && (
//               <ShieldCheck size={120} color="#6390F2" strokeWidth={1} />
//             )}
//             {step === "onboarding3" && (
//               <MapPin size={120} color="#6390F2" strokeWidth={1} />
//             )}
//           </View>

//           <View style={styles.contentCard}>
//             <Pagination
//               activeIndex={
//                 step === "onboarding1" ? 0 : step === "onboarding2" ? 1 : 2
//               }
//             />

//             {step === "onboarding1" && (
//               <OnboardingContent
//                 title="Safe Medical Rides"
//                 desc="..."
//                 btnText="Continue"
//                 onPress={() => setStep("onboarding2")}
//               />
//             )}
//             {step === "onboarding2" && (
//               <OnboardingContent
//                 title="Verified Trusted Drivers"
//                 desc="..."
//                 btnText="Continue"
//                 onPress={() => setStep("onboarding3")}
//               />
//             )}
//             {step === "onboarding3" && (
//               <OnboardingContent
//                 title="Simple Ride Booking"
//                 desc="..."
//                 btnText="Get Started"
//                 onPress={() => setStep("selection")}
//               />
//             )}
//           </View>
//         </>
//       ) : (
//         /* SELECTION SCREEN LAYOUT
//            This renders without the illustrationArea, starting from the top.
//         */
//         <View style={styles.selectionWrapper}>
//           <RoleSelection />
//         </View>
//       )}
//     </SafeAreaView>
//   );
// }

// // --- Helper Components ---

// const OnboardingContent = ({ title, desc, btnText, onPress }: any) => (
//   <View style={styles.innerContent}>
//     <Text style={styles.title}>{title}</Text>
//     <Text style={styles.description}>{desc}</Text>
//     <TouchableOpacity style={styles.primaryButton} onPress={onPress}>
//       <Text style={styles.buttonText}>{btnText}</Text>
//       <ChevronRight color="#FFF" size={20} />
//     </TouchableOpacity>
//   </View>
// );

// const RoleSelection = () => {
//   const navigation = useNavigation<any>();

//   <View>
//     <Text style={styles.titleLeft}>How will you use MediGo?</Text>
//     <Text style={styles.descriptionLeft}>Select how you'll use Mediride.</Text>

//     <TouchableOpacity
//       style={styles.roleCardPrimary}
//       onPress={() => {
//         navigation.navigate("RiderRegistrationFlow");
//       }}
//     >
//       <View style={styles.iconBoxLight}>
//         <Car color="#FFF" size={24} />
//       </View>
//       <View
//         style={{
//           flexDirection: "row",
//           flex: 1,
//           marginTop: 16,
//           justifyContent: "space-between",
//           width: "100%",
//         }}
//       >
//         <View>
//           <Text style={styles.roleTitleLight}>Book a Ride</Text>
//           <Text style={styles.roleDescLight}>
//             Request safe medical transportation.
//           </Text>
//         </View>
//         <ChevronRight color="#FFF" size={20} />
//       </View>
//     </TouchableOpacity>

//     <TouchableOpacity style={styles.roleCardSecondary}>
//       <View style={styles.iconBoxBlue}>
//         <ShieldCheck color="#3B82F6" size={24} />
//       </View>
//       <View
//         style={{
//           flexDirection: "row",
//           flex: 1,
//           marginTop: 16,
//           justifyContent: "space-between",
//           width: "100%",
//         }}
//       >
//         <View>
//           <Text style={styles.roleTitleDark}>Drive with MediGo</Text>
//           <Text style={styles.roleDescDark}>
//             For pre-approved drivers only.
//           </Text>
//         </View>
//         <ChevronRight color="#3B82F6" size={20} />
//       </View>
//     </TouchableOpacity>

//     <Text style={styles.footerText}>
//       Already have an account? <Text style={styles.linkText}>Log in</Text>
//     </Text>
//   </View>;
// };

// // --- Styles ---

// const styles = StyleSheet.create({
//   fullScreen: { flex: 1, justifyContent: "center", alignItems: "center" },
//   container: { flex: 1, backgroundColor: "#F8FAFC" },
//   logoContainer: { alignItems: "center" },
//   logoPlaceholder: { width: 150, height: 80 },
//   splashText: {
//     color: "white",
//     fontSize: 32,
//     fontWeight: "bold",
//     marginTop: 10,
//   },

//   illustrationArea: { flex: 1, justifyContent: "center", alignItems: "center" },
//   illustration: {
//     width: width * 0.7,
//     height: width * 0.7,
//     resizeMode: "contain",
//   },
//   selectionWrapper: {
//     flex: 1,
//     paddingHorizontal: 30,
//     paddingTop: 40,
//   },

//   contentCard: { paddingHorizontal: 30, paddingBottom: 40 },

//   paginationContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 30,
//   },
//   dot: { height: 6, borderRadius: 3, marginHorizontal: 3 },
//   activeDot: { width: 20, backgroundColor: "#3B82F6" },
//   inactiveDot: { width: 6, backgroundColor: "#CBD5E1" },

//   innerContent: { alignItems: "center" },
//   title: {
//     fontSize: 24,
//     fontWeight: "800",
//     color: "#1E293B",
//     textAlign: "center",
//     marginBottom: 15,
//   },
//   description: {
//     fontSize: 15,
//     color: "#64748B",
//     textAlign: "center",
//     lineHeight: 22,
//     marginBottom: 40,
//   },

//   titleLeft: {
//     fontSize: 24,
//     fontWeight: "800",
//     color: "#1E293B",
//     alignSelf: "flex-start",
//     marginBottom: 8,
//   },
//   descriptionLeft: {
//     fontSize: 14,
//     color: "#64748B",
//     alignSelf: "flex-start",
//     marginBottom: 30,
//   },

//   primaryButton: {
//     backgroundColor: "#3B82F6",
//     width: "100%",
//     padding: 18,
//     borderRadius: 12,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#3B82F6",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//   },
//   buttonText: {
//     color: "#FFF",
//     fontWeight: "700",
//     fontSize: 16,
//     marginRight: 8,
//   },

//   roleCardPrimary: {
//     backgroundColor: "#3B82F6",
//     width: "100%",
//     padding: 20,
//     borderRadius: 16,
//     alignItems: "flex-start",
//     marginBottom: 15,
//     minHeight: 150,
//   },
//   roleCardSecondary: {
//     backgroundColor: "#FFF",
//     width: "100%",
//     padding: 20,
//     borderRadius: 16,
//     alignItems: "flex-start",
//     height: 150,
//     borderColor: "#E2E8F0",
//     marginBottom: 30,
//   },
//   iconBoxLight: {
//     backgroundColor: "rgba(255,255,255,0.2)",
//     padding: 8,
//     borderRadius: 8,
//   },
//   iconBoxBlue: { backgroundColor: "#EFF6FF", padding: 8, borderRadius: 8 },

//   roleTitleLight: { color: "#FFF", fontWeight: "700", fontSize: 16 },
//   roleDescLight: { color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 8 },
//   roleTitleDark: { color: "#1E293B", fontWeight: "700", fontSize: 16 },
//   roleDescDark: { color: "#64748B", fontSize: 12, marginTop: 2 },

//   footerText: { color: "#64748B", fontSize: 13, textAlign: "center" },
//   linkText: { color: "#3B82F6", fontWeight: "700" },
// });

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ShieldCheck, MapPin, Car, ChevronRight } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

type ScreenStep =
  | "splash1"
  | "splash2"
  | "onboarding1"
  | "onboarding2"
  | "onboarding3"
  | "selection";

export default function MediGoApp() {
  const [step, setStep] = useState<ScreenStep>("splash1");

  useEffect(() => {
    if (step === "splash1") {
      setTimeout(() => setStep("splash2"), 1500);
    } else if (step === "splash2") {
      setTimeout(() => setStep("onboarding1"), 1500);
    }
  }, [step]);

  const Pagination = ({ activeIndex }: { activeIndex: number }) => (
    <View style={styles.paginationContainer}>
      {[0, 1, 2].map((i) => (
        <View
          key={i}
          style={[
            styles.dot,
            activeIndex === i ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );

  if (step === "splash1" || step === "splash2") {
    return (
      <LinearGradient colors={["#1A3B8E", "#06102B"]} style={styles.fullScreen}>
        <StatusBar barStyle="light-content" />
        {step === "splash2" && (
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: "https://i.imgur.com/your_logo_here.png" }}
              style={styles.logoPlaceholder}
              resizeMode="contain"
            />
            <Text style={styles.splashText}>MediGo</Text>
          </View>
        )}
      </LinearGradient>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {step !== "selection" ? (
        <>
          <View style={styles.illustrationArea}>
            {step === "onboarding1" && (
              <Image
                source={{ uri: "https://placeholder.com/hospital" }}
                style={styles.illustration}
              />
            )}
            {step === "onboarding2" && (
              <ShieldCheck size={120} color="#6390F2" strokeWidth={1} />
            )}
            {step === "onboarding3" && (
              <MapPin size={120} color="#6390F2" strokeWidth={1} />
            )}
          </View>

          <View style={styles.contentCard}>
            <Pagination
              activeIndex={
                step === "onboarding1" ? 0 : step === "onboarding2" ? 1 : 2
              }
            />
            <OnboardingContent
              title={
                step === "onboarding1"
                  ? "Safe Medical Rides"
                  : step === "onboarding2"
                    ? "Verified Trusted Drivers"
                    : "Simple Ride Booking"
              }
              desc="Reliable transportation to hospitals, clinics, and care centers."
              btnText={step === "onboarding3" ? "Get Started" : "Continue"}
              onPress={() =>
                setStep(
                  step === "onboarding1"
                    ? "onboarding2"
                    : step === "onboarding2"
                      ? "onboarding3"
                      : "selection",
                )
              }
            />
          </View>
        </>
      ) : (
        <View style={styles.selectionWrapper}>
          <RoleSelection />
        </View>
      )}
    </SafeAreaView>
  );
}

// --- Helper Components ---

const OnboardingContent = ({ title, desc, btnText, onPress }: any) => (
  <View style={styles.innerContent}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{desc}</Text>
    <TouchableOpacity style={styles.primaryButton} onPress={onPress}>
      <Text style={styles.buttonText}>{btnText}</Text>
      <ChevronRight color="#FFF" size={20} />
    </TouchableOpacity>
  </View>
);

const RoleSelection = () => {
  const navigation = useNavigation<any>(); // Access navigation here

  return (
    <View style={styles.selectionInner}>
      <Text style={styles.titleLeft}>How will you use MediGo?</Text>
      <Text style={styles.descriptionLeft}>
        Select how you'll use Mediride.
      </Text>

      <TouchableOpacity
        style={styles.roleCardPrimary}
        onPress={() => navigation.navigate("RiderRegistrationFlow")}
      >
        <View style={styles.iconBoxLight}>
          <Car color="#FFF" size={24} />
        </View>
        <View style={styles.roleRow}>
          <View>
            <Text style={styles.roleTitleLight}>Book a Ride</Text>
            <Text style={styles.roleDescLight}>
              Request safe medical transportation.
            </Text>
          </View>
          <ChevronRight color="#FFF" size={20} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.roleCardSecondary}>
        <View style={styles.iconBoxBlue}>
          <ShieldCheck color="#3B82F6" size={24} />
        </View>
        <View style={styles.roleRow}>
          <View>
            <Text style={styles.roleTitleDark}>Drive with MediGo</Text>
            <Text style={styles.roleDescDark}>
              For pre-approved drivers only.
            </Text>
          </View>
          <ChevronRight color="#3B82F6" size={20} />
        </View>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          Already have an account? <Text style={styles.linkText}>Log in</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  logoContainer: { alignItems: "center" },
  logoPlaceholder: { width: 150, height: 80 },
  splashText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 10,
  },
  illustrationArea: { flex: 1, justifyContent: "center", alignItems: "center" },
  illustration: {
    width: width * 0.7,
    height: width * 0.7,
    resizeMode: "contain",
  },

  // Design 100% Match: Starts from top, clears illustrationArea
  selectionWrapper: { flex: 1, paddingHorizontal: 30, paddingTop: 20 },
  selectionInner: { flex: 1 },

  contentCard: { paddingHorizontal: 30, paddingBottom: 40 },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  dot: { height: 6, borderRadius: 3, marginHorizontal: 3 },
  activeDot: { width: 20, backgroundColor: "#3B82F6" },
  inactiveDot: { width: 6, backgroundColor: "#CBD5E1" },

  innerContent: { alignItems: "center" },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 15,
  },
  description: {
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 40,
  },

  titleLeft: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1E293B",
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  descriptionLeft: {
    fontSize: 14,
    color: "#64748B",
    alignSelf: "flex-start",
    marginBottom: 32,
  },

  primaryButton: {
    backgroundColor: "#3B82F6",
    width: "100%",
    padding: 18,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
    marginRight: 8,
  },

  roleCardPrimary: {
    backgroundColor: "#3B82F6",
    width: "100%",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    minHeight: 140,
  },
  roleCardSecondary: {
    backgroundColor: "#FFF",
    width: "100%",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 30,
    minHeight: 140,
  },
  roleRow: {
    flexDirection: "row",
    flex: 1,
    marginTop: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconBoxLight: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  iconBoxBlue: {
    backgroundColor: "#EFF6FF",
    padding: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  roleTitleLight: { color: "#FFF", fontWeight: "700", fontSize: 18 },
  roleDescLight: { color: "rgba(255,255,255,0.8)", fontSize: 13, marginTop: 4 },
  roleTitleDark: { color: "#1E293B", fontWeight: "700", fontSize: 18 },
  roleDescDark: { color: "#64748B", fontSize: 13, marginTop: 4 },

  footerContainer: { marginTop: "auto", paddingBottom: 20 },
  footerText: { color: "#64748B", fontSize: 13, textAlign: "center" },
  linkText: { color: "#3B82F6", fontWeight: "700" },
});
