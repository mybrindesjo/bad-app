import React from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profilinställningar</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Skriv ditt namn... men det sparas aldrig"
      />
      <Button 
        title="Spara" 
        onPress={() => Alert.alert('Hoppsan!', 'Oops, det gick inte att spara.')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8d7da',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 2,
    borderColor: '#ff0000',
    padding: 10,
    marginTop: 10,
    backgroundColor: '#ffe6e6',
  },
});

export default ProfileScreen;
