import React, { createContext, useContext, useState } from 'react';
import { translations } from '../translations';

const themeColors = {
  'Ljus': '#4c6eff',
  'Mörk': '#956388',
  'Systemstandard': '#fff94c',
  'Röd': '#ffffff',
  'Blå': '#4cff87',
  'Grön': '#ff4c4c',
  'Gul': '#333333',
};

type SettingsContextType = {
  theme: string;
  language: string;
  notifications: string;
  volume: string;
  updateSettings: (key: string, value: string) => void;
  getThemeColor: () => string;
  translate: (key: string) => string;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState({
    theme: 'Systemstandard',
    language: 'Rövarspråk', // Ändra default språk
    notifications: 'Alla',
    volume: 'Medel',
  });

  const updateSettings = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const getThemeColor = () => {
    return themeColors[settings.theme as keyof typeof themeColors] || themeColors.Systemstandard;
  };

  const translate = (key: string) => {
    const currentLang = settings.language;
    const translation = translations[currentLang as keyof typeof translations]?.[key as keyof (typeof translations)["Rövarspråk"]];
    return typeof translation === "string" ? translation : key;
  };

  return (
    <SettingsContext.Provider value={{ 
      ...settings, 
      updateSettings, 
      getThemeColor, 
      translate
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings måste användas inom en SettingsProvider');
  return context;
};
