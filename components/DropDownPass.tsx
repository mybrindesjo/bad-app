import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
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
    <View>
      <Text>Skriv ditt lösenord: {passwordParts.map(() => '*').join('')}</Text>
      <Picker selectedValue={selectedValue} onValueChange={handleSelection}>
        <Picker.Item label="Välj" value="" />
        {getNumbers().map((num) => (
          <Picker.Item key={num} label={num} value={num} />
        ))}
      </Picker>
    </View>
  );
};

export default DropdownPass;
