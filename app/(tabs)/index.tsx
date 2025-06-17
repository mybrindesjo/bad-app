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
  { question: "Om du fick välja mellan ost och tomat – varför?", options: ["Ost är kung!", "Tomat är liv!", "Ingen av dem", "Allt på en pizza"] },
  { question: "Skriv en dikt om en osynlig giraff.", options: ["Den är lång och smal", "Den finns inte alls", "Den springer genom natten", "Den dricker kaffe"] }
];

const fakeAnswers = [
  "Neonrosa",
  "Slev",
  "5000 gånger",
  "Nationalsången",
  "Jag vägrar svara på denna fråga",
  "Jag har aldrig sett en giraff"
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

  const handleNextQuestion = () => {
    setTimeout(() => {
      if (currentQuestionIndex < mandatoryQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setQuestionComplete(true);
      }
    }, 2000);
  };

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
                <Button key={index} title={option} onPress={handleNextQuestion} />
              ))}
            </View>
          ) : (
            <>
              <Text style={styles.text}>Välkommen {user.email}! 👋</Text>
              <Text style={styles.subtext}>Här är dina svar:</Text>
              {mandatoryQuestions.map((question, index) => (
                <View key={index} style={styles.answerBox}>
                  <Text style={styles.question}>{question.question}</Text>
                  <Text style={styles.answer}>{fakeAnswers[index]}</Text>
                </View>
              ))}
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
  subtext: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  answerBox: {
    backgroundColor: "#eef",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "90%",
  },
  question: {
    fontWeight: "bold",
  },
  answer: {
    color: "#333",
  },
});

export default ProfileScreen;
