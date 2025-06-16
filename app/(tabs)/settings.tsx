import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert, Switch } from "react-native";
import { Picker } from "@react-native-picker/picker";

const settingsOptions: {
  label: string;
  options: string[];
  fakeAnswers: Record<string, string>;
}[] = [
  {
    label: "Välj din app-temafärg",
    options: ["Ljus", "Mörk", "Systemstandard"],
    fakeAnswers: {
      Ljus: "Neongrön med blinkande effekter",
      Mörk: "Ultraviolett-lila",
      Systemstandard: "Svartvit retro-look"
    }
  },
  {
    label: "Språk",
    options: ["Svenska", "Engelska", "Spanska", "Japanska"],
    fakeAnswers: {
      Svenska: "Forntida runskrift",
      Engelska: "Shakespeareska",
      Spanska: "Delfin-signalspråk",
      Japanska: "Emoji-baserad kommunikation"
    }
  },
  {
    label: "Notiser",
    options: ["Alla", "Endast viktiga", "Inga"],
    fakeAnswers: {
      Alla: "Endast godnattsagor skickas",
      "Endast viktiga": "Bara information om bananpriser",
      Inga: "Du får meddelanden i form av röksignaler"
    }
  },
  {
    label: "Ljudvolym",
    options: ["Låg", "Medel", "Hög", "Max"],
    fakeAnswers: {
      Låg: "Whisper mode – knappt hörbart",
      Medel: "Opera-sångerska-nivå",
      Hög: "Ultrasoniskt pip som bara hundar hör",
      Max: "Jetmotors ljudnivå"
    }
  }
];

const SettingsScreen: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [userSelections, setUserSelections] = useState<Record<string, string>>({});
  const [selectionComplete, setSelectionComplete] = useState(false);

  const handleNextSelection = (option: string) => {
    setUserSelections(prev => ({
      ...prev,
      [settingsOptions[selectedIndex].label]: settingsOptions[selectedIndex].fakeAnswers[option]
    }));

    if (selectedIndex < settingsOptions.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    } else {
      setSelectionComplete(true);
    }
  };

  return (
    <View style={styles.container}>
      {!selectionComplete ? (
        <View style={styles.optionBox}>
          <Text style={styles.label}>{settingsOptions[selectedIndex].label}</Text>
          {settingsOptions[selectedIndex].options.map((option, index) => (
            <Button key={index} title={option} onPress={() => handleNextSelection(option)} />
          ))}
        </View>
      ) : (
        <>
          <Text style={styles.header}>Dina inställningar är sparade!</Text>
          {Object.entries(userSelections).map(([question, answer], index) => (
            <View key={index} style={styles.resultBox}>
              <Text style={styles.label}>{question}</Text>
              <Text style={styles.answer}>{answer}</Text>
            </View>
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    gap: 20,
  },
  optionBox: {
    width: "90%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  resultBox: {
    padding: 10,
    marginVertical: 5,
    width: "95%",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  answer: {
    color: "#666",
  },
});

export default SettingsScreen;
