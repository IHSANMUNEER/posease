import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LottieView from 'lottie-react-native';

const StarterScreen = ({ onStartQuiz }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Posture Quiz!</Text>
      
      <LottieView
        source={require('../assets/quiz.json')} 
        autoPlay
        loop
        style={styles.animation}
      />
      <TouchableOpacity style={styles.startButton} onPress={onStartQuiz}>
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10, // Reduced margin between title and image
  },
  image: {
    width: 200, // Adjust width of the image
    height: 200, // Adjust height of the image
    marginBottom: 20, // Added margin below the image
  },
  animation: {
    width: 400,
    height: 400,
  },
  startButton: {
    backgroundColor:  "#2E7A86",
    padding: 20,
    marginTop:25,
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default StarterScreen;
