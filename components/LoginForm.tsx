import React, { useState, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, Animated } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { useRouter } from "expo-router";
import Dropdown from "./DropDownEmail";
import DropdownPass from "./DropDownPass";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");

  const router = useRouter();
  const buttonPosition = new Animated.Value(0);

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
          throw new Error("Ogiltig e-postadress");
        }
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Registrerad", "Du är nu inloggad!");
      }
    } catch (error) {
      setError((error as Error).message || "Registreringen misslyckades");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? "Logga in" : "Registrera"}</Text>
      
      <Dropdown onEmailChange={setEmail} />
      <DropdownPass onPasswordChange={setPassword} />

      {error && <Text style={styles.error}>{error}</Text>}

      <Animated.View style={{ transform: [{ translateX: buttonPosition }] }}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {isLogin ? "Logga in" : "Registrera konto"}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleTextWhite}>
          {isLogin ? "Inget konto? " : "Har redan ett konto?"}
        </Text>
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.toggleText}>
            {isLogin ? "Registrera här" : "Logga in här"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    gap: 10,
    alignItems: "flex-start",
    width: '100%',
    backgroundColor: '#C0C0C0'  // Changed to gray
  },
  title: { 
    fontSize: 24, 
    marginBottom: 10, 
    color: "#000000",
    fontFamily: "system-ui",
    textAlign: "left"
  },
  button: { 
    padding: 15, 
    backgroundColor: "#C0C0C0",  // Changed to gray
    alignItems: "center", 
    width: '100%',
    marginTop: 10,
    borderWidth: 2,
    borderRightColor: '#404040',
    borderBottomColor: '#404040',
    borderLeftColor: '#FFFFFF',
    borderTopColor: '#FFFFFF'
  },
  buttonText: { 
    color: "#000000", 
    fontSize: 16,
    fontFamily: "system-ui",
    textAlign: "left"
  },
  error: { 
    color: "#FF0000", 
    marginTop: 10,
    fontFamily: "system-ui"
  },
  toggleContainer: { 
    flexDirection: "row", 
    justifyContent: "flex-start", 
    marginTop: 20,
    backgroundColor: '#C0C0C0',  // Changed to gray
    borderWidth: 2,
    borderRightColor: '#404040',
    borderBottomColor: '#404040',
    borderLeftColor: '#FFFFFF',
    borderTopColor: '#FFFFFF',
    padding: 10,
  },
  toggleText: { 
    color: "#000000", 
    textDecorationLine: 'underline',
    fontFamily: "system-ui",
    textAlign: "left"
  },
  toggleTextWhite: { 
    color: "#000000",
    fontFamily: "system-ui",
    textAlign: "left"
  }
});

export default LoginForm;
