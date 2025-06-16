import React, { useState } from "react";
import { View, Text, Switch, Button, StyleSheet } from "react-native";

const SettingsScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    console.log("Användaren loggas ut...");
    // Här kan du lägga till logik för att logga ut användaren
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Inställningar</Text>

      <View style={styles.setting}>
        <Text>Mörkt läge</Text>
        <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />
      </View>

      <View style={styles.setting}>
        <Text>Notifikationer</Text>
        <Switch value={notifications} onValueChange={() => setNotifications(!notifications)} />
      </View>

      <Button title="Logga ut" onPress={handleLogout} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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
