import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Settings = {
  color: string;
  language: string;
  volume: string;
  layout: string;
  darkMode: boolean;
};

type SettingsContextType = {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  resetSettings: () => void;
  getRandomSetting: (type: keyof Settings) => any;
};

const defaultSettings: Settings = {
  color: "Blå",
  language: "Svenska",
  volume: "Medel",
  layout: "Enkel layout",
  darkMode: false,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings måste användas inom SettingsProvider");
  return context;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const options = {
    color: ["Röd", "Blå", "Grön", "Gul", "Lila", "Rosa"],
    language: ["Svenska", "Engelska", "Spanska", "Japanska"],
    volume: ["Låg", "Medel", "Hög", "Max"],
    layout: ["Enkel layout", "Avancerad layout", "Kompakt layout", "Maximal layout"],
    darkMode: [true, false],
  };

  const getRandomSetting = (type: keyof Settings): any => {
    const list = options[type];
    return list[Math.floor(Math.random() * list.length)];
  };

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings, // Använd manuella inställningar istället för att slumpa
    }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    AsyncStorage.removeItem("userSettings");
  };

  // Ladda sparade inställningar vid start
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const stored = await AsyncStorage.getItem("userSettings");
        if (stored) {
          setSettings(JSON.parse(stored));
        }
      } catch (err) {
        console.warn("Kunde inte läsa sparade inställningar:", err);
      }
    };
    loadSettings();
  }, []);

  // Spara inställningar med debounce (500ms för bättre prestanda)
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      try {
        await AsyncStorage.setItem("userSettings", JSON.stringify(settings));
      } catch (err) {
        console.error("Fel vid sparning av inställningar:", err);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings, getRandomSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};
