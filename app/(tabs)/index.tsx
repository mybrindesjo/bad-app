import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Animated, ScrollView } from "react-native";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import LoginForm from "../../components/LoginForm";

const questions = [
  { question: "Vilken typ av djur skulle du vara på en fest?", options: ["🦁 Lejon", "🦉 Uggla", "🐢 Sköldpadda", "🐍 Orm"] },
  { question: "Om du kunde leva i en film, vilken skulle det vara?", options: ["🎥 Matrix", "🎭 Titanic", "🚀 Star Wars", "🎩 Alice i Underlandet"] },
  { question: "Vilken är din föredragna typ av frukost?", options: ["🥞 Amerikanska pannkakor", "🥐 Croissant", "🍞 Rostad brödskiva", "🥣 Havregryn"] }
];

const fakeAnswers = [
  "En flammande LED-lampa formad som en groda",
  "En vattenfast spelkontroll med en hemlig knapp",
  "En brödrost med inbyggd högtalare och blinkande lysdioder"
];

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionComplete, setQuestionComplete] = useState(false);
  const [finalProduct, setFinalProduct] = useState("");
  const confettiAnim = new Animated.Value(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuestionComplete(true);
      generateProduct();
      startConfetti();
    }
  };

  const generateProduct = () => {
    setFinalProduct(`🎉 Grattis! Vi har lagt till ${fakeAnswers[0]}, ${fakeAnswers[1]} och ${fakeAnswers[2]} i din varukorg! 😆`);
  };

  const startConfetti = () => {
    Animated.timing(confettiAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
  };

  if (loading) return <Text style={styles.loading}>Analyserar dina val... och ignorerar dem.</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        <>
          <Text style={styles.welcomeText}>Hej {user.email}! 🎉</Text>

          {!questionComplete ? (
            <View style={styles.questionBox}>
              <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <View key={index} style={styles.answerButton}>
                  <Button title={option} onPress={handleNextQuestion} />
                </View>
              ))}
            </View>
          ) : (
            <>
              <Animated.Text style={[styles.confettiText, { opacity: confettiAnim }]}>🎊 Grattis! 🎊</Animated.Text>
              <Text style={styles.finalProduct}>{finalProduct}</Text>
              <Button title="Köp nu!" onPress={() => alert("Din order har lagts! 😆")} color="#0044CC" />
            </>
          )}
        </>
      ) : (
        <LoginForm />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20, 
    backgroundColor: "#FFFFFF" 
  },
  loading: { fontSize: 18, color: "#888", textAlign: "center" },
  welcomeText: { fontSize: 24, fontWeight: "bold", marginBottom: 15, color: "#000", textAlign: "center" },
  questionBox: { padding: 20, borderRadius: 10, backgroundColor: "#f0f0f0", alignItems: "center", width: "90%" },
  question: { fontSize: 20, fontWeight: "bold", marginBottom: 15, color: "#000", textAlign: "center" },
  answerButton: { marginVertical: 10, width: "100%" }, 
  confettiText: { fontSize: 28, fontWeight: "bold", color: "#0044CC", marginBottom: 15 },
  finalProduct: { fontSize: 20, fontWeight: "bold", color: "#0044CC", marginBottom: 15, textAlign: "center" }
});

export default ProfileScreen;
