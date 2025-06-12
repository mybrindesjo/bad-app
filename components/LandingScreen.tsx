import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LandingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lycka till att förstå vad du ska göra här...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: '#aaa',
  },
});

export default LandingScreen;
