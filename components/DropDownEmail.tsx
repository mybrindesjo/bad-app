import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface DropdownProps {
  onEmailChange: (email: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onEmailChange }) => {
  const [emailParts, setEmailParts] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");

  // Character list
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
      setEmailParts((prev) => prev.slice(0, -1)); // Remove last character
    } else {
      setEmailParts((prev) => [...prev, value]); // Add selected character
    }
  };

  return (
    <View>
      <Text>Skriv din e-post: {emailParts.join('')}</Text>
      <Picker selectedValue={selectedValue} onValueChange={handleSelection}>
        <Picker.Item label="Välj" value="" />
        {getCharacters().map((char) => (
          <Picker.Item key={char} label={char} value={char} />
        ))}
      </Picker>
    </View>
  );
};

export default Dropdown;
