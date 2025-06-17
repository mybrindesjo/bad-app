import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface DropdownPassProps {
  onPasswordChange: (password: string) => void;
}

const DropdownPass: React.FC<DropdownPassProps> = ({ onPasswordChange }) => {
  const [passwordParts, setPasswordParts] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");

  // Standard number list including ⌫
  const getNumbers = () => {
    return [...Array.from({ length: 10 }, (_, i) => i.toString()), "⌫"];
  };

  useEffect(() => {
    onPasswordChange(passwordParts.join(''));
  }, [passwordParts]);

  const handleSelection = (value: string) => {
    setSelectedValue(value);
    
    if (value === "⌫") {
      setPasswordParts((prev) => prev.slice(0, -1)); // Remove last digit
    } else {
      setPasswordParts((prev) => [...prev, value]); // Add selected digit
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Skriv ditt lösenord: {passwordParts.map(() => '*').join('')}</Text>
      <View style={styles.pickerContainer}>
        <Picker 
          selectedValue={selectedValue} 
          onValueChange={handleSelection}
          style={styles.picker}
        >
          <Picker.Item label="Välj" value="" />
          {getNumbers().map((num) => (
            <Picker.Item key={num} label={num} value={num} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#C0C0C0',
  },
  label: {
    fontFamily: 'Courier',
    color: '#000000',
    marginBottom: 5,
    textAlign: 'left'
  },
  pickerContainer: {
    borderWidth: 2,
    borderRightColor: '#404040',
    borderBottomColor: '#404040',
    borderLeftColor: '#FFFFFF',
    borderTopColor: '#FFFFFF',
    backgroundColor: '#C0C0C0',
  },
  picker: {
    backgroundColor: '#C0C0C0',
    color: '#000000',
    fontFamily: 'Courier',
    textAlign: 'left'
  }
});

export default DropdownPass;
