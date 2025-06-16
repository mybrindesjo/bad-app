import React, { useState } from "react";
import { View, Text, Switch, Button, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

const colors = ["Röd", "Blå", "Grön", "Gul", "Lila", "Rosa"];
const wrongColors = ["Blå", "Grön", "Röd", "Lila", "Gul", "Rosa"]; // Fel färg visas

const languages = ["Svenska", "Engelska", "Spanska", "Japanska"];
const volumeLevels = ["Låg", "Medel", "Hög", "Max"]; // Alltid "Max"

const layouts = ["Enkel layout", "Avancerad layout", "Kompakt layout", "Maximal layout"];
const wrongLayouts = ["Avancerad layout", "Kompakt layout", "Maximal layout", "Enkel layout"]; // Fel layout väljs

const SettingsScreen = () => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedVolume, setSelectedVolume] = useState(volumeLevels[0]);
  const [selectedLayout, setSelectedLayout] = useState(layouts[0]);

  const handleSave = () => {
    Alert.alert(
      "Bekräfta ändringar",
      "Är du **säker** på att du vill spara? Detta kan inte ångras!",
      [
        { text: "Avbryt", onPress: () => Alert.alert("Okej, inställningarna har **inte** sparats.") },
        { text: "Ja, jag är säker!", onPress: () => Alert.alert("Bra! Nu behöver du bekräfta igen...") },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: wrongColors[colors.indexOf(selectedColor)] }]}>
      <Text style={styles.header}>Frustrerande Inställningar</Text>

      {/* Färgval */}
      <View style={styles.setting}>
        <Text>Välj färgtema:</Text>
        <Picker selectedValue={selectedColor} onValueChange={(itemValue) => setSelectedColor(itemValue)}>
          {colors.map((color, index) => (
            <Picker.Item key={index} label={color} value={color} />
          ))}
        </Picker>
      </View>

      {/* Språkval (men det ändras aldrig) */}
      <View style={styles.setting}>
        <Text>Välj språk:</Text>
        <Picker selectedValue={selectedLanguage} onValueChange={() => Alert.alert("Språket ändrades! (Men egentligen inte 😆)")}>
          {languages.map((lang, index) => (
            <Picker.Item key={index} label={lang} value={lang} />
          ))}
        </Picker>
      </View>

      {/* Ljudkontroll (alltid max) */}
      <View style={styles.setting}>
        <Text>Justera volym:</Text>
        <Picker selectedValue={selectedVolume} onValueChange={() => setSelectedVolume("Max")}>
          {volumeLevels.map((level, index) => (
            <Picker.Item key={index} label={level} value={level} />
          ))}
        </Picker>
      </View>

      {/* Layoutval (väljer alltid fel layout) */}
      <View style={styles.setting}>
        <Text>Välj sidlayout:</Text>
        <Picker selectedValue={selectedLayout} onValueChange={(itemValue) => setSelectedLayout(wrongLayouts[layouts.indexOf(itemValue)])}>
          {layouts.map((layout, index) => (
            <Picker.Item key={index} label={layout} value={layout} />
          ))}
        </Picker>
      </View>

      {/* Spara-knapp med överdriven bekräftelse */}
      <Button title="Spara inställningar" onPress={handleSave} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default SettingsScreen;
