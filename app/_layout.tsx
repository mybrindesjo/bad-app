import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "../context/AuthContext";
import { SettingsProvider } from "../context/SettingsContext"; // Lägg till detta!

export default function RootLayout() {
  return (
    <AuthProvider>
      <SettingsProvider> {/* Omslut hela stacken! */}
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="profile" options={{ title: "Profile" }} />
          <Stack.Screen name="+not-found" />
          <StatusBar style="auto" />
        </Stack>
      </SettingsProvider>
    </AuthProvider>
  );
}
