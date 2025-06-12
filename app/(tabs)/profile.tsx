import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import LoginForm from "../../components/LoginForm";

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
          <Text style={styles.text}>Välkommen {user.email}!</Text>
          <Text style={styles.subtext}>Här är din profilsida.</Text>
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
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  subtext: {
    fontSize: 16,
    color: "#555",
  },
});

export default ProfileScreen;
