import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // Import måste vara här!

import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";

function AboutScreen() {
  const router = useRouter();

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
    scale.value = withTiming(1, { duration: 800 });
  }, []);

  const fadeInStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.Image source={require("../components/img/picture.png")} style={[styles.logo, scaleStyle]} />
      <Animated.View style={fadeInStyle}>
        <Text style={styles.title}>Om vår app</Text>
      </Animated.View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
            setTimeout(() => {
            router.push(Math.random() > 0.5 ? "/" : "/randomPage"); // Slumpmässig navigering
            }, 5000);
        }}
        >
  <Text style={styles.buttonText}>Tillbaka till start (eller inte?)</Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ff6666",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AboutScreen;
