import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "../context/AuthContext";
import { SettingsProvider } from "../context/SettingsContext";
import { CartProvider } from "../context/CartContext";

function AppNavigator() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#C0C0C0",
        },
        headerTintColor: "#000000",
        headerTitleStyle: {
          fontFamily: "Courier",
        },
        contentStyle: {
          backgroundColor: "#C0C0C0",
        },
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
          title: "Logga in",
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile"
        options={{
          title: "Profil",
        }}
      />
      <Stack.Screen
        name="+not-found"
        options={{
          title: "Fel",
        }}
      />
      <Stack.Screen
        name="cart"
        options={{
          title: "Varukorg",
        }}
      />
      <StatusBar style="auto" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <CartProvider>
          <AppNavigator />
        </CartProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}
