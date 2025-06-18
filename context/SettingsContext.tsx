import React, { createContext, useContext, useState } from 'react';

const themeColors = {
  'Ljus': '#4c6eff',
  'Mörk': '#956388',
  'Systemstandard': '#fff94c',
};

type SettingsContextType = {
  theme: string;
  language: string;
  notifications: string;
  volume: string;
  updateSettings: (key: string, value: string) => void;
  getThemeColor: () => string;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState({
    theme: 'Systemstandard',
    language: 'Svenska',
    notifications: 'Alla',
    volume: 'Medel',
  });

  const updateSettings = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const getThemeColor = () => {
    return themeColors[settings.theme as keyof typeof themeColors] || themeColors.Systemstandard;
  };

  return (
    <SettingsContext.Provider value={{ 
      ...settings, 
      updateSettings, 
      getThemeColor, 
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
