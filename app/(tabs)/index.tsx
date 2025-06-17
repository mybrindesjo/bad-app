import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import LoginForm from "../../components/LoginForm";

const mandatoryQuestions = [
  { question: "Vad är din favoritfärg på en tisdagseftermiddag?", options: ["Blå", "Röd", "Grön", "Gul"] },
  { question: "Om du var ett köksredskap, vilket skulle du vara?", options: ["Kniv", "Gaffel", "Visp", "Brödrost"] },
  { question: "Hur många gånger har du blinkat idag?", options: ["10", "100", "1000", "Jag har aldrig blinkat"] },
  { question: "Vilken låt lyssnade du på idag?", options: ["Bohemian Rhapsody", "Despacito", "Never Gonna Give You Up", "Baby Shark"] },
];

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionComplete, setQuestionComplete] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Text style={styles.loading}>Laddar...</Text>;
  }

  return (
    <View style={styles.container}>
      {user ? (
        <>
          {!questionComplete ? (
            <View style={styles.questionBox}>
              <Text style={styles.text}>{mandatoryQuestions[currentQuestionIndex].question}</Text>
              {mandatoryQuestions[currentQuestionIndex].options.map((option, index) => (
                <Button key={index} title={option} onPress={() => setCurrentQuestionIndex(currentQuestionIndex + 1)} />
              ))}
            </View>
          ) : (
            <Text style={styles.text}>Välkommen {user.email}! 👋</Text>
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
    padding: 20,
  },
  loading: {
    fontSize: 18,
    color: "#888",
  },
  questionBox: {
    width: "90%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
    borderBlockColor: "#ccc",
  },
});

export default ProfileScreen;
