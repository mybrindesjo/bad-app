import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "../context/AuthContext";
import { SettingsProvider, useSettings } from "../context/SettingsContext";

// Separera Stack-navigeringen till en egen komponent
function AppNavigator() {
  const { translate } = useSettings();
  
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
          title: translate("login"),
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile"
        options={{
          title: translate("profile"),
        }}
      />
      <Stack.Screen
        name="+not-found"
        options={{
          title: translate("error"),
        }}
      />
      <StatusBar style="auto" />
    </Stack>
  );
}

// Root layout utan useSettings
export default function RootLayout() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <AppNavigator />
      </SettingsProvider>
    </AuthProvider>
  );
}
