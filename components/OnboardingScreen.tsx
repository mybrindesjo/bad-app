import React from "react";
import { View, Text } from "react-native";

const OnboardingScreen: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#222",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, color: "#fff", textAlign: "center", marginBottom: 20 }}>
        Välkommen till vår app! 🎉
      </Text>
      <Text style={{ fontSize: 20, color: "#ffcc00", textAlign: "center", marginBottom: 20 }}>
        Här får du den sämsta UX-upplevelsen någonsin. 😈
      </Text>
      <Text style={{ fontSize: 18, color: "#ff6666", textAlign: "center" }}>
        Lycka till med att hitta nästa knapp! 😉
      </Text>
    </View>
  );
};

export default OnboardingScreen;
