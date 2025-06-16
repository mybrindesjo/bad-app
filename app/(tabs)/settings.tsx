import React from "react";
import { View, Text, Button, StyleSheet, Alert, Switch } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSettings } from "../../context/SettingsContext";

const colors = ["Röd", "Blå", "Grön", "Gul", "Lila", "Rosa"];
const languages = ["Svenska", "Engelska", "Spanska", "Japanska"];
const volumeLevels = ["Låg", "Medel", "Hög", "Max"];
const layouts = ["Enkel layout", "Avancerad layout", "Kompakt layout", "Maximal layout"];

const funnyMessages = [
  "Nej, det där ville du inte välja! 😈",
  "Haha, trodde du verkligen att det skulle fungera? 🤪",
  "Överraskning! Något annat valdes! 🎉",
  "Det där var inte rätt val för dig... 🤔",
  "Nej nej nej, så får du inte göra! 😅"
];

const colorMap: Record<string, string> = {
  Röd: "#ff4c4c",
  Blå: "#4c6eff",
  Grön: "#4cff87",
  Gul: "#fff94c",
  Lila: "#c04cff",
  Rosa: "#ff4cb3",
};

const SettingsScreen = () => {
  const { settings, updateSettings, getRandomSetting } = useSettings();

  const getFunnyMessage = () => {
    return funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
  };

  const handleChange = (type: "color" | "language" | "volume" | "layout", value: string) => {
    updateSettings({ [type]: value });
    Alert.alert("Hoppsan!", getFunnyMessage());
  };

  const handleSave = () => {
    Alert.alert("Oj då!", "Dina inställningar sparades... fast helt annorlunda! 🎭");
  };

  const textColor = settings.darkMode ? "#fff" : "#000";
  const buttonColor = settings.darkMode ? "#999" : "#4CAF50";
  const bgColor = colorMap[settings.color] || "#ffffff";

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={[styles.header, { color: textColor }]}>Förvirrande Inställningar 🎭</Text>

      {/* Färg */}
      <View style={styles.setting}>
        <Text style={[styles.label, { color: textColor }]}>Färgtema:</Text>
        <Picker selectedValue={settings.color} onValueChange={(val) => handleChange("color", val)}>
          {colors.map((c, idx) => (
            <Picker.Item key={idx} label={c} value={c} />
          ))}
        </Picker>
      </View>

      {/* Språk */}
      <View style={styles.setting}>
        <Text style={[styles.label, { color: textColor }]}>Språk:</Text>
        <Picker selectedValue={settings.language} onValueChange={(val) => handleChange("language", val)}>
          {languages.map((lang, idx) => (
            <Picker.Item key={idx} label={lang} value={lang} />
          ))}
        </Picker>
      </View>

      {/* Volym */}
      <View style={styles.setting}>
        <Text style={[styles.label, { color: textColor }]}>Volym:</Text>
        <Picker selectedValue={settings.volume} onValueChange={(val) => handleChange("volume", val)}>
          {volumeLevels.map((vol, idx) => (
            <Picker.Item key={idx} label={vol} value={vol} />
          ))}
        </Picker>
      </View>

      {/* Layout */}
      <View style={styles.setting}>
        <Text style={[styles.label, { color: textColor }]}>Layout:</Text>
        <Picker selectedValue={settings.layout} onValueChange={(val) => handleChange("layout", val)}>
          {layouts.map((l, idx) => (
            <Picker.Item key={idx} label={l} value={l} />
          ))}
        </Picker>
      </View>

      {/* Dark Mode Toggle */}
      <View style={styles.setting}>
        <Text style={[styles.label, { color: textColor }]}>Mörkt läge:</Text>
        <Switch
          value={settings.darkMode}
          onValueChange={() => {
            updateSettings({ darkMode: !settings.darkMode });
            Alert.alert("😎", getFunnyMessage());
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Försök spara..." onPress={handleSave} color={buttonColor} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  setting: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 30,
  },
});

export default SettingsScreen;
