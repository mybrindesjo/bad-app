import { Tabs, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { useSettings } from "../../context/SettingsContext";

export default function TabLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { getThemeColor, translate } = useSettings();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading]);

  if (loading || !user) return null;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          ...Platform.select({
            ios: {
              position: "absolute",
            },
            default: {},
          }),
          backgroundColor: getThemeColor(),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: translate("profile"),
          tabBarLabel: translate("profile"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      {user && (
        <Tabs.Screen
          name="settings"
          options={{
            title: translate("settings"),
            tabBarLabel: translate("settings"),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />
      )}
    </Tabs>
  );
}

