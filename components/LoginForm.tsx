import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Keyboard, Animated } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { useRouter } from "expo-router";
import Dropdown from "./DropDownEmail";
import DropdownPass from "./DropDownPass";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const router = useRouter();
  const buttonPosition = new Animated.Value(0);

  const triggerPopup = () => {
    if (Math.random() > 0.7) {
      Alert.alert("Är du säker?", "Det här kan vara det värsta du gör idag.");
    }
  };

  const handleButtonPress = () => {
    Animated.timing(buttonPosition, {
      toValue: Math.random() * 200,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleSubmit = async (): Promise<void> => {
    if (!isLogin && password !== confirmPassword) {
      Alert.alert("Fel", "Lösenorden matchar inte!");
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        if (!email.includes("@")) {
          throw new Error("Ogiltig e-postadress!");
        }
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Registrerad!", "Du är nu inloggad.");
      }
      router.push("/profile");
    } catch (error) {
      setError((error as Error).message || "Registrering misslyckades.");
    }
  };

  function handleInputChange(setState: React.Dispatch<React.SetStateAction<string>>, text: string): void {
    setState(text);
  }

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? "Logga in" : "Registrera dig"}</Text>

      <Dropdown onEmailChange={handleEmailChange} />

      <DropdownPass onPasswordChange={(text) => handleInputChange(setPassword, text)} />

      {error && <Text style={styles.error}>{error}</Text>}

      <Animated.View style={{ transform: [{ translateX: buttonPosition }] }}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit} onPressIn={handleButtonPress}>
          <Text style={styles.buttonText}>{isLogin ? "Logga in" : "Registrera"}</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleTextWhite}>
          {isLogin ? "Har du inget konto? " : "Har du redan ett konto? "}
        </Text>
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.toggleText}>
            {isLogin ? "Registrera dig här" : "Logga in här"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20,
    gap: 10,
    alignItems: 'center',
  },

  title: { 
    fontSize: 24, 
    marginBottom: 10, 
    color: "#ff4444" 
  },

  label: { 
    fontSize: 10 
  },

  passwordContainer: { 
    flexDirection: "row", 
    alignItems: "center" 
  },

  input: { 
    borderWidth: 3, 
    borderColor: "#ff4444", 
    padding: 10,
    paddingHorizontal: 15, 
    borderRadius: 20, 
    color: "#ff4444", 
    width: 300,
    backgroundColor: '#2a2a2a',
    fontSize: 16,
  },

  button: { 
    padding: 15, 
    backgroundColor: "#ff4444", 
    alignItems: "center", 
    borderRadius: 30,
    width: 300,
    marginTop: 10,
  },

  buttonText: { 
    color: "#fff", 
    fontSize: 16 
  },

  error: { 
    color: "red", 
    marginTop: 10 
  },

  toggleContainer: { 
    flexDirection: "row", 
    justifyContent: "center", 
    marginTop: 20 
  },

  toggleText: { 
    color: "#ff4444", 
    fontWeight: "bold" 
  },

  toggleTextWhite: { 
    color: "#333" 
  }
});


export default LoginForm;
