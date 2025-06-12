import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Keyboard } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Importera ikoner

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const triggerPopup = () => {
    if (Math.random() > 0.7) {
      Alert.alert("Är du säker?", "Vi rekommenderar att du inte registrerar dig.");
    }
  };

  // Göra lösenordsfältet synligt eller dolt
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Automatiskt ändra lösenordet när det matas in
  const handlePasswordChange = (setter: React.Dispatch<React.SetStateAction<string>>, text: string) => {
    Keyboard.dismiss();
    triggerPopup();
    setter(text + "??!"); // Lägg till oönskade tecken
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
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push("/profile");
    } catch {
      setError("Fel användarnamn eller lösenord");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? "Logga in" : "Registrera dig"}</Text>

      <Text style={styles.label}>E-post</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Lösenord</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => handlePasswordChange(setPassword, text)}
        />
      </View>

      {!isLogin && (
        <>
          <Text style={styles.label}>Bekräfta lösenord</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              secureTextEntry={!showPassword}
              value={confirmPassword}
              onChangeText={(text) => handlePasswordChange(setConfirmPassword, text)}
            />
          </View>
        </>
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
  emailInput: {
    borderWidth: 2,
    borderColor: "#ff4444",
    padding: 3, // Minimalt utrymme att skriva
    borderRadius: 10, // Ologiskt små rundade hörn
    color: "#ff4444",
    width: "50%", // Begränsad bredd för maximal irritation
    fontSize: 8, // Nästan omöjligt att läsa
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 3,
    borderColor: "#ff4444",
    padding: 5,
    borderRadius: 20,
    color: "#ff4444",
    flex: 1,
  },
  eyeButton: {
    marginLeft: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#ff4444",
    alignItems: "center",
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  toggleContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  toggleTextWhite: {
    color: "#333",
    marginRight: 5,
  },
  toggleText: {
    color: "#ff4444",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});


export default LoginForm;
