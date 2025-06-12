import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Animated, Keyboard } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { useRouter } from "expo-router";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const router = useRouter();
  
  // Slumpmässiga popup-meddelanden
  const triggerPopup = () => {
    if (Math.random() > 0.7) {
      Alert.alert("Är du säker?", "Det här kan vara det värsta du gör idag.");
    }
  };

  // Döljer tangentbordet direkt vid inmatning
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, text: string) => {
    Keyboard.dismiss();
    triggerPopup();
    setter(text + "@#!"); // Lägger automatiskt till konstiga tecken i slutet
  };

  const handleSubmit = async (): Promise<void> => {
    if (!isLogin && password !== confirmPassword) {
      Alert.alert("Fel", "Lösenorden matchar inte");
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push("/profile");
    } catch {
      setError("Fel användarnamn eller lösenord");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? "Logga in" : "Skapa konto"}</Text>

      <Text style={styles.label}>E-post</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => handleInputChange(setEmail, text)}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Lösenord</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={(text) => handleInputChange(setPassword, text)}
      />

      {!isLogin && (
        <>
          <Text style={styles.label}>Bekräfta lösenord</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => handleInputChange(setConfirmPassword, text)}
          />
        </>
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {isLogin ? "Logga in" : "Registrera"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: "#ff4444",
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 10, // Extra liten text
  },
  input: {
    borderWidth: 3,
    borderColor: "#ff4444",
    padding: 5, // Minimalt utrymme
    borderRadius: 20, // Ologiskt rundade hörn
    color: "#ff4444", // Svår att läsa
    width: 300,
  },
  button: {
    padding: 10,
    backgroundColor: "#ff4444",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default LoginForm;
