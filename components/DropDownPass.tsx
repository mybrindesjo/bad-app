import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface DropdownPassProps {
  onPasswordChange: (password: string) => void;
}

const DropdownPass: React.FC<DropdownPassProps> = ({ onPasswordChange }) => {
  const [passwordParts, setPasswordParts] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");

  const numbers = Array.from({ length: 10 }, (_, i) => i.toString());

  useEffect(() => {
    onPasswordChange(passwordParts.join(''));
  }, [passwordParts]);

  const handleSelection = (value: string) => {
    setSelectedValue(value);
    setPasswordParts([...passwordParts, value]);
  };

  return (
    <View>
      <Text>Ditt lösenord: {'*'.repeat(passwordParts.length)}</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={handleSelection}
      >
        <Picker.Item label="Välj" value="" />
        {numbers.map((num) => (
          <Picker.Item key={num} label={num} value={num} />
        ))}
      </Picker>
    </View>
  );
};

export default DropdownPass;
