import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSettings } from '../context/SettingsContext';

interface DropdownProps {
  onEmailChange: (email: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onEmailChange }) => {
  const { translate } = useSettings();
  const [emailParts, setEmailParts] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");

  // Standard teckenlista
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
      setEmailParts((prev) => prev.slice(0, -1)); // Tar bort sista tecknet
    } else {
      setEmailParts((prev) => [...prev, value]); // Lägger till vald bokstav
    }
  };

  return (
    <View>
      <Text>{translate('enterEmail')}: {emailParts.join('')}</Text>
      <Picker selectedValue={selectedValue} onValueChange={handleSelection}>
        <Picker.Item label={translate('choose')} value="" />
        {getCharacters().map((char) => (
          <Picker.Item key={char} label={char} value={char} />
        ))}
      </Picker>
    </View>
  );
};

export default Dropdown;
