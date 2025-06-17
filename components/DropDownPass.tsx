import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSettings } from '../context/SettingsContext';

interface DropdownPassProps {
  onPasswordChange: (password: string) => void;
}

const DropdownPass: React.FC<DropdownPassProps> = ({ onPasswordChange }) => {
  const { translate } = useSettings();
  const [passwordParts, setPasswordParts] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");

  // Standard sifferlista inklusive ⌫
  const getNumbers = () => {
    return [...Array.from({ length: 10 }, (_, i) => i.toString()), "⌫"];
  };

  useEffect(() => {
    onPasswordChange(passwordParts.join(''));
  }, [passwordParts]);

  const handleSelection = (value: string) => {
    setSelectedValue(value);
    
    if (value === "⌫") {
      setPasswordParts((prev) => prev.slice(0, -1)); // Tar bort sista siffran
    } else {
      setPasswordParts((prev) => [...prev, value]); // Lägger till vald siffra
    }
  };

  return (
    <View>
      <Text>{translate('enterPassword')}: {passwordParts.map(() => '*').join('')}</Text>
      <Picker selectedValue={selectedValue} onValueChange={handleSelection}>
        <Picker.Item label={translate('choose')} value="" />
        {getNumbers().map((num) => (
          <Picker.Item key={num} label={num} value={num} />
        ))}
      </Picker>
    </View>
  );
};

export default DropdownPass;
