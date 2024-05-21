import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LevelDifficultyScreen = ({ onStartQuiz }) => {
  const [difficulty, setDifficulty] = useState(1);
  const [maxQuestions, setMaxQuestions] = useState(5); // Default max questions for easy

  useEffect(() => {
    // Update max questions when difficulty changes
    switch (difficulty) {
      case 1: // Easy
        setMaxQuestions(5);
        break;
      case 2: // Medium
        setMaxQuestions(10);
        break;
      case 3: // Hard
        setMaxQuestions(20);
        break;
      default:
        setMaxQuestions(5); // Default to easy if difficulty is invalid
        break;
    }
  }, [difficulty]);

  return (
    <View style={styles.container}>
      {/* Lottie animation covering the entire screen */}
      <LottieView
        source={require('../assets/brain.json')} // Replace 'your_animation.json' with your actual animation file
        autoPlay
        loop
        style={styles.animation}
      />
      {/* End of Lottie animation */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Select Difficulty</Text>
        <View style={styles.difficultyContainer}>
          <TouchableOpacity
            style={[styles.difficultyButton, difficulty === 1 && styles.selectedButton]}
            onPress={() => setDifficulty(1)}
          >
            <Text style={[styles.buttonText, difficulty === 1 && styles.selectedText]}>Easy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.difficultyButton, difficulty === 2 && styles.selectedButton]}
            onPress={() => setDifficulty(2)}
          >
            <Text style={[styles.buttonText, difficulty === 2 && styles.selectedText]}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.difficultyButton, difficulty === 3 && styles.selectedButton]}
            onPress={() => setDifficulty(3)}
          >
            <Text style={[styles.buttonText, difficulty === 3 && styles.selectedText]}>Hard</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.startButton} onPress={() => onStartQuiz(maxQuestions, difficulty)}>
          <Text style={styles.strtbuttonText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  animation: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust opacity as needed
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  difficultyContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  difficultyButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2E7A86', // Default border color
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginHorizontal: 6,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 165
  },
  selectedButton: {
    backgroundColor: '#2E7A86',
    borderColor: '#15605B', // Border color when selected
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  },
  selectedText: {
    color: 'white',
  },
  strtbuttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  startButton: {
    backgroundColor: "#2E7A86",
    padding: 20,
    marginTop: 25,
    borderRadius: 15,
    width: 290,
  
   
  },
});

export default LevelDifficultyScreen;
