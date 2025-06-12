import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";

const OnboardingScreen: React.FC = () => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);
  const rotate = useSharedValue("0deg");

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
    scale.value = withTiming(1, { duration: 800 });
    rotate.value = withTiming("360deg", { duration: 800 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }, { rotate: rotate.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.textContainer, animatedStyle]}>
        <Text style={styles.text}>Välkommen till vår app! 🎉</Text>
      </Animated.View>
      <Animated.View style={[styles.textContainer, animatedStyle]}>
        <Text style={[styles.text, { color: "#ffcc00" }]}>Här får du den sämsta UX-upplevelsen någonsin. 😈</Text>
      </Animated.View>
      <Animated.View style={[styles.textContainer, animatedStyle]}>
        <Text style={[styles.text, { color: "#ff6666" }]}>Lycka till med att hitta nästa knapp! 😉</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
    padding: 20,
  },
  textContainer: {
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
  },
});

export default OnboardingScreen;
