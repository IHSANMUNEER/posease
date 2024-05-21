import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';

const tickIcon = require('../assets/tick.png');
const crossIcon = require('../assets/cross.png');
const animationFile = require('../assets/trophy.json');

const ResultScreen = ({ score, selectedOptions, questions, onRestartQuiz }) => {
  const [loadedOptions, setLoadedOptions] = useState(5); // Number of initially loaded options

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    if (isCloseToBottom) {
      setLoadedOptions(loadedOptions + 5); // Load more options when close to the bottom
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.result}>Quiz Completed!</Text>
      <LottieView
        source={animationFile}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.result}>Your Score: {score}</Text>
      <View style={styles.selectedOptionsContainer}>
        <Text style={styles.result1}>Selected Options</Text>
        <ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={{ maxHeight: 200 }}
          showsVerticalScrollIndicator={false}
        >
          {selectedOptions.slice(0, loadedOptions).map((option, index) => {
            const question = questions[index];
            const isCorrect = question.correctAnswer === option;
            
            return (
              <View key={index} style={[styles.card, isCorrect ? styles.correctCard : styles.wrongCard]}>
                <Text style={styles.optionText}>{option}</Text>
                <Image source={isCorrect ? tickIcon : crossIcon} style={styles.icon} />
              </View>
            
            );
          })}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.button} onPress={onRestartQuiz}>
        <Text style={styles.buttonText}>Restart Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  result1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
  }
,  
  selectedOptionsContainer: {
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 25,
    borderColor: '#2E7A86',
    borderWidth: 1.5,
    padding: 25,
    width: '80%',
    overflow: 'hidden', // Hide overflowing content
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    overflow: 'hidden', // Hide overflowing content
  },
  correctCard: {
    backgroundColor: '#DFF0D8', // Background color for correct answer
  },
  wrongCard: {
    backgroundColor: '#F8D7DA', // Background color for wrong answer
  },
  optionText: {
    fontSize: 18,
    color: 'black',
    marginRight: 10,
    flex: 1, // Allow text to expand
    overflow: 'hidden', // Hide overflowing content
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#2E7A86',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    width: 330
    
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    padding:5,
    display: 'flex',
    textAlign: 'center'
  },
  animation: {
    width: '100%', // Adjust width as needed
    height: 200, // Adjust height as needed
    marginBottom: 20,
  },
});

export default ResultScreen;
