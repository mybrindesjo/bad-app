import React, { useState, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, Animated } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { useRouter } from "expo-router";
import Dropdown from "./DropDownEmail";
import DropdownPass from "./DropDownPass";
import { useSettings } from "../context/SettingsContext";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");

  const router = useRouter();
  const buttonPosition = new Animated.Value(0);
  const { translate } = useSettings();

  useLayoutEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        router.push("/(tabs)");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (): Promise<void> => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        if (!email.includes("@")) {
          throw new Error(translate("invalidEmail"));
        }
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert(translate("registered"), translate("loggedIn"));
      }
    } catch (error) {
      setError((error as Error).message || translate("registrationFailed"));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? translate("login") : translate("register")}</Text>
      
      <Dropdown onEmailChange={setEmail} />
      <DropdownPass onPasswordChange={setPassword} />

      {error && <Text style={styles.error}>{error}</Text>}

      <Animated.View style={{ transform: [{ translateX: buttonPosition }] }}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{isLogin ? translate("loginButton") : translate("registerButton")}</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleTextWhite}>{isLogin ? translate("noAccount") : translate("alreadyAccount")}</Text>
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.toggleText}>{isLogin ? translate("registerHere") : translate("loginHere")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20,
    gap: 10,
    alignItems: "center",
  },
  title: { 
    fontSize: 24, 
    marginBottom: 10, 
    color: "#007AFF",
  },
  button: { 
    padding: 15, 
    backgroundColor: "#007AFF", 
    alignItems: "center", 
    borderRadius: 30,
    width: 300,
    marginTop: 10,
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16,
  },
  error: { 
    color: "red", 
    marginTop: 10,
  },
  toggleContainer: { 
    flexDirection: "row", 
    justifyContent: "center", 
    marginTop: 20,
  },
  toggleText: { 
    color: "#007AFF", 
    fontWeight: "bold",
  },
  toggleTextWhite: { 
    color: "#333",
  },
});

export default LoginForm;
