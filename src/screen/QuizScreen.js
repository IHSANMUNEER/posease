// QuizScreen.jsx

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const QuizScreen = ({ questions, onCompleteQuiz }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(45);
  const [selectedOption, setSelectedOption] = useState(null); // State to store selected option
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null)); // State to store selected options
  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 1) {
          handleNextQuestion(); // Move to next question when time runs out
          return 45; // Reset timer
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [currentQuestion, seconds]);

  useEffect(() => {
    if (seconds === 0) {
      handleNextQuestion(); // Move to next question when time runs out
    }
  }, [seconds]);

  const handleAnswer = (selectedAnswer) => {
    setSelectedOptions(prevSelectedOptions => {
      const updatedOptions = [...prevSelectedOptions];
      updatedOptions[currentQuestion] = selectedAnswer;
      return updatedOptions;
    });
    setSelectedOption(selectedAnswer);
    setShowNextButton(true);
    
    // Get the current question based on difficulty level
    const currentQuestionData = questions[currentQuestion];
    
    // Log current question data for debugging
    console.log("Current question:", currentQuestionData);
    console.log("Selected answer:", selectedAnswer);
    console.log("Correct answer:", currentQuestionData.correctAnswer);
  
    // Check if the selected answer matches the correct answer of the current question
    if (selectedAnswer === currentQuestionData.correctAnswer) {
      setScore(score + 1);
    }
  };
  
  
  
  
  const handleNextQuestion = () => {
    // Proceed to the next question
    if (currentQuestion === questions.length - 1) {
      onCompleteQuiz(score, selectedOptions);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowNextButton(false);
      setSeconds(45);
    }
  };

  const formatTime = (seconds) => {
    return seconds.toString().padStart(2, '0');
  };

  return (
    <View style={styles.container}>
      {/* Lottie Animation */}
      <LottieView
        source={require('../assets/think.json')} // Replace 'your-animation.json' with the path to your Lottie animation file
        autoPlay
        loop
        style={styles.animation}
      />
      <View style={styles.overlay}>
        <View style={styles.timerContainer}>
          <Text style={styles.quizTitle}>Question # {currentQuestion + 1}</Text>
          <View style={styles.timer}>
            <View style={styles.circle} />
            <Text style={styles.timerText}>{formatTime(seconds)}</Text>
          </View>
        </View>
        <View style={styles.questionContainer}>
          <View style={styles.questionBox}>
            <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>
            {questions[currentQuestion].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedOption === option ? styles.selectedOption : null,
                ]}
                onPress={() => handleAnswer(option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedOption === option ? styles.selectedOptionText : null,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {showNextButton && (
            <View style={styles.nextButtonContainer}>
              <Button
                title="Next"
                onPress={handleNextQuestion}
                color="#2E7A86"
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  animation: {
    position: 'absolute',
    width: width * 1, // Increase the width by 50%
    height: height * 1.5, // Increase the height by 50%
    zIndex: -1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Adjust opacity as needed
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Added justifyContent
    marginBottom: 10,
    width: '80%', // Adjusted width to match the question container width
  },
  timer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2E7A86',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    zIndex: 1,
  },
  quizTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  questionContainer: {
    width: '89%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    borderColor: '#2E7A86',
    borderWidth: 2,
  },
  questionBox: {
    width: '100%',
    alignItems: 'center',
    minHeight: 200,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: 'transparent',
    padding: 15,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#2E7A86',
    borderWidth: 2,
  },
  optionText: {
    fontSize: 16,
    color: 'black',
  },
  selectedOption: {
    backgroundColor: '#2E7A86',
  },
  selectedOptionText: {
    color: 'white',
  },
  nextButtonContainer: {
    marginTop: 20,
    marginLeft: 190, // Add margin to the right side
    width: '30%',
    borderRadius: 10,
    overflow: 'hidden', // Ensures the button stays within its container's rounded corners
    shadowColor: '#000', // Adds shadow for a more elevated look
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default QuizScreen;
