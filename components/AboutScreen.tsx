import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

const onboardingTexts = [
  "Välkommen! Eller?",
  "Här får du lära dig ingenting.",
  "Tryck på knappen… eller vänta lite?",
  "Hoppa över? Nej, vänta! Förresten… kanske?",
  "Varför är du ens här?",
  "Nästan klart! Eller är det?",
  "Sista steget… eller?",
];

export default function OnboardingScreen({ navigation }) {
  const [step, setStep] = useState(0);
  const opacity = useSharedValue(0);
  const shake = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 800 });
    shake.value = withTiming(10, { duration: 500 });
  }, [step]);

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: Math.sin(shake.value) * 5 }],
  }));

  const handleNext = () => {
    setStep((prevStep) => (prevStep < onboardingTexts.length - 1 ? prevStep + 1 : 0));
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, fadeStyle]}>{onboardingTexts[step]}</Animated.Text>
      <Animated.View style={shakeStyle}>
        <Button title="Nästa (eller inte?)" onPress={handleNext} />
      </Animated.View>
      {step > 3 && (
        <Text style={styles.skipText} onPress={() => navigation.navigate("Home")}>
          Hoppa över (om du hittar knappen)
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
  },
  text: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
  },
  skipText: {
    fontSize: 12,
    color: "#888",
    marginTop: 15,
  },
});

