import { Tabs, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";

export default function TabLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();

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
          backgroundColor: "#C0C0C0",
          borderTopWidth: 2,
          borderTopColor: "#FFFFFF",
          borderLeftColor: "#FFFFFF",
          borderRightColor: "#404040",
          borderBottomColor: "#404040",
          borderWidth: 2,
        },
        tabBarLabelStyle: {
          fontFamily: "Courier",
        },
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#666666",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Profil",
          tabBarLabel: "Profil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      {user && (
        <Tabs.Screen
          name="cart"
          options={{
            title: "Varukorg",
            tabBarLabel: "Varukorg",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }}
        />
      )}
    </Tabs>
  );
}

