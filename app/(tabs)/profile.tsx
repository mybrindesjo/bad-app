import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import LoginForm from "../../components/LoginForm";

const mandatoryQuestions = [
  "Vad är din favoritfärg på en tisdagseftermiddag?",
  "Om du var ett köksredskap, vilket skulle du vara?",
];

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [answers, setAnswers] = useState(Array(mandatoryQuestions.length).fill(""));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionComplete, setQuestionComplete] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleNextQuestion = () => {
    setTimeout(() => {
      if (currentQuestionIndex < mandatoryQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setQuestionComplete(true);
      }
    }, 2000); // Fördröjning på varje svar
  };

  if (loading) {
    return <Text style={styles.loading}>Laddar...</Text>;
  }

  return (
    <View style={styles.container}>
      {user ? (
        <>
          {!questionComplete ? (
            <>
              <Text style={styles.progress}>
                {currentQuestionIndex + 1} frågor besvarade
              </Text>
              <Text style={styles.text}>{mandatoryQuestions[currentQuestionIndex]}</Text>
              <TextInput
                style={styles.input}
                value={answers[currentQuestionIndex]}
                onChangeText={(text) => {
                  const updatedAnswers = [...answers];
                  updatedAnswers[currentQuestionIndex] = text;
                  setAnswers(updatedAnswers);
                }}
              />
              <Button title="Nästa fråga" onPress={handleNextQuestion} />
            </>
          ) : (
            <>
              <Text style={styles.text}>Välkommen {user.email}!</Text>
              <Text style={styles.subtext}>Grattis! Du har slösat tid på helt meningslösa frågor.</Text>
            </>
          )}
        </>
      ) : (
        <LoginForm />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  loading: {
    fontSize: 18,
    color: "#888",
  },
  progress: {
    fontSize: 18,
    color: "#ff5555", // Gör siffran röd för dramatisk effekt!
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    width: "80%",
    marginBottom: 10,
  },
});

export default ProfileScreen;
