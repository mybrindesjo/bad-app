import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import styles from "./LoginFormStyles";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const shuffleText = (text: string) => {
    return text.split("").sort(() => Math.random() - 0.5).join(""); // Slumpar texten
  };

  const getRandomError = () => {
    const errors = [
      "Oj, något gick fel. Eller gick det rätt?",
      "Ditt lösenord är för starkt. Välj ett svagare.",
      "Du måste inkludera minst 3 emojis och en bokstav från ett utdött språk!",
      "Försök igen... eller inte.",
    ];
    return errors[Math.floor(Math.random() * errors.length)];
  };

  const handleSubmit = async () => {
    if (!isLogin && password !== confirmPassword) {
      alert("Lösenorden matchar inte!");
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch {
      setError(getRandomError());
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
        onChangeText={(text: string) => setEmail(shuffleText(text))} // Rör om bokstäverna
      />

      <Text style={styles.label}>Lösenord</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={(text: string) => setPassword(shuffleText(text))} // Rör om bokstäverna
      />

      {!isLogin && (
        <>
          <Text style={styles.label}>Bekräfta lösenord</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text: string) => setConfirmPassword(shuffleText(text))}
          />
        </>
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      {/* Knappen flyttar sig slumpmässigt */}
      <TouchableOpacity
        style={[styles.button, { marginLeft: Math.random() * 200 }]}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>{isLogin ? "Logga in" : "Registrera"}</Text>
      </TouchableOpacity>

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleTextWhite}>
          {isLogin ? "Har du inget konto?" : "Har du redan ett konto?"}
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

export default LoginForm;
