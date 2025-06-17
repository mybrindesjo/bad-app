import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSettings } from "../../context/SettingsContext";

const settingsOptions = [
  { label: "Appens tema", options: ["Ljus", "Mörk", "Systemstandard", "Röd", "Blå", "Grön", "Gul"] },
  { label: "Språk", options: ["Svenska", "Engelska", "Spanska", "Japanska"] },
];

const SettingsScreen: React.FC = () => {
  const { theme, updateSettings, getThemeColor } = useSettings();

  return (
    <View style={[styles.container, { backgroundColor: getThemeColor() }]}>
      <Text style={styles.header}>Appens inställningar</Text>

      {settingsOptions.map((setting, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.label}>{setting.label}</Text>
          <Picker
            selectedValue={theme}
            onValueChange={(val) => updateSettings("theme", val)}
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
