import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Animated } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { useRouter } from "expo-router";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const isFormValid = email.trim() !== "" && password.trim() !== "";
  const router = useRouter();
  
  // Förflyttning av login-knappen
  const buttonAnimation = new Animated.Value(0);

  const handleButtonPress = () => {
    Animated.timing(buttonAnimation, {
      toValue: Math.random() * 300, // Flyttar knappen slumpmässigt
      duration: 500,
      useNativeDriver: true,
    }).start();
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

      <Text style={styles.label}>E-post (Lycka till att läsa detta!)</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Lösenord (Skriv det rätt... kanske!)</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {!isLogin && (
        <>
          <Text style={styles.label}>Bekräfta lösenord</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </>
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      <Animated.View style={[styles.buttonContainer, { transform: [{ translateX: buttonAnimation }] }]}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          onPressIn={handleButtonPress} // Knappen flyttar sig när du försöker trycka på den
        >
          <Text style={styles.buttonText}>
            {isLogin ? "Logga in" : "Registrera"}
          </Text>
        </TouchableOpacity>
      </Animated.View>

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
    backgroundColor: "#222", // Svart bakgrund för maximal irritation
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: "#ff0000", // Röd text på mörk bakgrund
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    color: "#ffcc00", // Svår att läsa färg
    fontSize: 12, // Gör texten extra liten
  },
  input: {
    borderWidth: 1,
    borderColor: "#ff0000", // Ologisk färg
    padding: 10,
    borderRadius: 5,
    color: "#fff",
    backgroundColor: "#444", // Mörk bakgrund på inputfält
  },
  buttonContainer: {
    marginTop: 15,
  },
  button: {
    padding: 10,
    backgroundColor: "#ff0000", // Irriterande färg
    alignItems: "center",
    borderRadius: 5,
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
    color: "#fff",
    marginRight: 5,
  },
  toggleText: {
    color: "#007bff",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default LoginForm;
