import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSettings } from "../../context/SettingsContext";

const SettingsScreen: React.FC = () => {
  const { theme, language, updateSettings, getThemeColor, translate } = useSettings();

  return (
    <View style={[styles.container, { backgroundColor: getThemeColor() }]}>
      <Text style={styles.header}>{translate('settings')}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>{translate('theme')}</Text>
        <Picker
          selectedValue={theme}
          onValueChange={(val) => updateSettings("theme", val)}
          style={styles.picker}
        >
          {["Ljus", "Mörk", "Systemstandard"].map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{translate('language')}</Text>
        <Picker
          selectedValue={language}
          onValueChange={(val) => updateSettings("language", val)}
          style={styles.picker}
        >
          {["Rövarspråk", "Morse", "Runskrift"].map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>
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
