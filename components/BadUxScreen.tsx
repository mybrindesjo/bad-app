import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BadUXScreen: React.FC = () => {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tryck på knappen för att gå vidare...</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setClicked(!clicked)}
      >
        <Text style={styles.buttonText}>
          {clicked ? 'Tillbaka till start' : 'Starta onboarding'}
        </Text>
      </TouchableOpacity>
      {clicked && <Text style={styles.error}>Hoppsan! Något gick fel. Försök igen.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ff0000',
  },
  buttonText: {
    color: '#fff',
  },
  error: {
    marginTop: 10,
    color: 'yellow',
  },
});

export default BadUXScreen;
