import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const colorMap: Record<string, string> = {
  Ljus: "#fff94c",
  Mörk: "#4cff87",
  Systemstandard: "#4c6eff",
  Röd: "#555567",
  Blå: "#823656",
  Grön: "#2845c4",
  Gul: "#fffff4",
};

const languageMap: Record<string, string> = {
  Svenska: "ja",
  Engelska: "sv",
  Spanska: "en",
  Japanska: "es",
};

const settingsOptions = [
  {
    label: "Appens tema",
    options: ["Ljus", "Mörk", "Systemstandard", "Röd", "Blå", "Grön", "Gul"],
  },
  {
    label: "Språk",
    options: ["Svenska", "Engelska", "Spanska", "Japanska"],
  },
  {
    label: "Notiser",
    options: ["Godnattsagor", "Endast störande", "Inga"],
  },
];

const SettingsScreen: React.FC = () => {
  const [selectedSettings, setSelectedSettings] = useState<Record<string, string>>({
    "Appens tema": "Ljus",
    "Språk": "Svenska",
    "Notiser": "Alla",
  });

  const handleSelection = (label: string, value: string) => {
    setSelectedSettings(prev => ({
      ...prev,
      [label]: value,
    }));
  };

  return (
    <View style={[styles.container, { backgroundColor: colorMap[selectedSettings["Appens tema"]] || "#ffffff" }]}>
      <Text style={styles.header}>Appens inställningar</Text>

      {settingsOptions.map((setting, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.label}>{setting.label}</Text>
          <Picker
            selectedValue={selectedSettings[setting.label]}
            onValueChange={(val) => handleSelection(setting.label, val)}
            style={styles.picker}
          >
            {setting.options.map((option) => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
          </Picker>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  header: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 },
  label: { fontSize: 18, fontWeight: "bold" },
  picker: { width: 180 },
});

export default SettingsScreen;
