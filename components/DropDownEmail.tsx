import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface DropdownProps {
  onEmailChange: (email: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onEmailChange }) => {
  const [emailParts, setEmailParts] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");

  const getCharacters = () => {
    return [
      ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), // A-Z
      '.', '-', '@', "⌫"
    ];
  };

  useEffect(() => {
    onEmailChange(emailParts.join(''));
  }, [emailParts]);

  const handleSelection = (value: string) => {
    setSelectedValue(value);
    
    if (value === "⌫") {
      setEmailParts((prev) => prev.slice(0, -1)); 
    } else {
      setEmailParts((prev) => [...prev, value]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Skriv din e-post: {emailParts.join('')}
      </Text>
      <View style={styles.pickerContainer}>
        <Picker 
          selectedValue={selectedValue} 
          onValueChange={handleSelection}
          style={styles.picker}
        >
          <Picker.Item label="Välj" value="" />
          {getCharacters().map((char) => (
            <Picker.Item key={char} label={char} value={char} />
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

export default Dropdown;
