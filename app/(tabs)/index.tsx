import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Animated, ScrollView, TouchableOpacity } from "react-native";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import LoginForm from "../../components/LoginForm";
import { useCart } from "../../context/CartContext";
import { useRouter } from "expo-router";

const questions = [
  { question: "Vilken typ av djur skulle du vara på en fest?", options: ["Lejon", "Uggla", "Sköldpadda", "Orm"] },
  { question: "Om du kunde leva i en film, vilken skulle det vara?", options: ["Matrix", "Titanic", "Star Wars", "Alice i Underlandet"] },
  { question: "Vilken är din föredragna typ av frukost?", options: ["Amerikanska pannkakor", "Croissant", "Rostad brödskiva", "Havregryn"] }
];

const fakeProducts = [
  { 
    name: "Flammande LED-lampa formad som en groda",
    price: 399,
    image: "../../img/product1.png"
  },
  { 
    name: "Vattenfast spelkontroll med en hemlig knapp",
    price: 599,
    image: "../../img/product2.png"
  },
  { 
    name: "Brödrost med inbyggd högtalare och blinkande lysdioder",
    price: 499,
    image: "../../img/product3.png"
  }
];

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionComplete, setQuestionComplete] = useState(false);
  const [finalProduct, setFinalProduct] = useState("");
  const confettiAnim = new Animated.Value(0);
  const { addItems } = useCart();
  const router = useRouter();

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
    setFinalProduct(`Grattis! Vi har lagt till ${fakeProducts[0].name}, ${fakeProducts[1].name} och ${fakeProducts[2].name} i din varukorg!`);
    setTimeout(() => {
      addItems(fakeProducts);
    }, 2000);
  };

  const startConfetti = () => {
    Animated.timing(confettiAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
  };

  const handlePurchase = () => {
    alert("Produkterna har lagts till i din varukorg!");
    setTimeout(() => {
      router.push("/cart");
    }, 1000);
  };

  if (loading) return <Text style={styles.loading}>Analyserar dina val... och ignorerar dem.</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        <>
          <Text style={styles.welcomeText}>Hej {user.email}!</Text>

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
              <Animated.Text style={[styles.confettiText, { opacity: confettiAnim }]}>Grattis!</Animated.Text>
              <Text style={styles.finalProduct}>{finalProduct}</Text>
              <TouchableOpacity 
                style={styles.toCartButton} 
                onPress={handlePurchase}
              >
                <Text style={styles.toCartButtonText}>Till varukorgen</Text>
              </TouchableOpacity>
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
    backgroundColor: '#C0C0C0'
  },
  loading: {
    fontSize: 18, 
    color: "#000000", 
    textAlign: "left",
    fontFamily: "Courier"
  },
  welcomeText: { 
    fontSize: 24, 
    marginBottom: 15, 
    color: "#000000", 
    textAlign: "left",
    fontFamily: "Courier"
  },
  questionBox: { 
    padding: 20, 
    alignItems: "center", 
    width: "90%",
    backgroundColor: '#C0C0C0',
    borderWidth: 2,
    borderRightColor: '#404040',
    borderBottomColor: '#404040',
    borderLeftColor: '#FFFFFF',
    borderTopColor: '#FFFFFF'
  },
  question: { 
    fontSize: 20, 
    marginBottom: 15, 
    color: "#000", 
    textAlign: "left",
    fontFamily: "Courier"
  },
  answerButton: { 
    marginVertical: 10, 
    width: "100%",
    backgroundColor: '#C0C0C0',
    borderWidth: 2,
    borderRightColor: '#404040',
    borderBottomColor: '#404040',
    borderLeftColor: '#FFFFFF',
    borderTopColor: '#FFFFFF'
  }, 
  confettiText: { 
    fontSize: 28, 
    color: "#000000", 
    marginBottom: 15,
    fontFamily: "Courier"
  },
  finalProduct: { 
    fontSize: 20, 
    color: "#000000", 
    marginBottom: 15, 
    textAlign: "left",
    fontFamily: "Courier"
  },
  toCartButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 20,
    backgroundColor: '#C0C0C0',
    borderWidth: 2,
    borderRightColor: '#404040',
    borderBottomColor: '#404040',
    borderLeftColor: '#FFFFFF',
    borderTopColor: '#FFFFFF',
    padding: 10,
    width: "100%",
  },
  toCartButtonText: {
    color: "#000000",
    fontFamily: "Courier",
    fontSize: 16,
  },
});

export default ProfileScreen;
