
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import StarterScreen from './StarterScreen';
import LevelDifficultyScreen from './LevelDifficultyScreen';
import QuizScreen from './QuizScreen';
import ResultScreen from './ResultScreen';
import shuffleArray from 'lodash/shuffle'; 

const questions = [
  {
    "question": "What is the correct posture for sitting at a desk?",
    "options": ["Slouching", "Leaning back", "Sitting upright with support"],
    "correctAnswer": "Sitting upright with support",
    "difficulty": "easy"
  },
  {
    "question": "Which posture issue is characterized by shoulders hunching forward?",
    "options": ["Rounded shoulders", "Kyphosis", "Anterior pelvic tilt", "Swayback posture"],
    "correctAnswer": "Rounded shoulders",
    "difficulty": "easy"
  },
  {
    "question": "Which muscle group is essential for maintaining proper posture?",
    "options": ["Quadriceps", "Biceps", "Core muscles", "Hamstrings"],
    "correctAnswer": "Core muscles",
    "difficulty": "easy"
  },
  {
    "question": "Which of these exercises primarily targets the muscles of the upper back?",
    "options": ["Plank", "Chin tucks", "Squats", "Lunges"],
    "correctAnswer": "Chin tucks",
    "difficulty": "easy"
  },
  {
    "question": "What is the term for exaggerated curvature of the lower back?",
    "options": ["Swayback posture", "Kyphosis", "Lordosis", "Anterior pelvic tilt"],
    "correctAnswer": "Lordosis",
    "difficulty": "easy"
  },
  {
    "question": "What is the correct term for excessive rounding of the upper back?",
    "options": ["Swayback posture", "Lordosis", "Kyphosis", "Anterior pelvic tilt"],
    "correctAnswer": "Kyphosis",
    "difficulty": "medium"
  },
  {
    "question": "What is the primary purpose of performing chin tucks?",
    "options": ["Strengthening the core", "Stretching the hamstrings", "Correcting forward head posture", "Building biceps muscles"],
    "correctAnswer": "Correcting forward head posture",
    "difficulty": "medium"
  },
  {
    "question": "Which muscle group helps in keeping the shoulders pulled back and down?",
    "options": ["Deltoids", "Latissimus dorsi", "Pectoralis major", "Rhomboids"],
    "correctAnswer": "Rhomboids",
    "difficulty": "medium"
  },
  {
    "question": "Which of the following is an effective exercise for strengthening the core muscles?",
    "options": ["Shoulder press", "Leg press", "Plank", "Bicep curls"],
    "correctAnswer": "Plank",
    "difficulty": "medium"
  },
  {
    "question": "Which of the following is a common cause of anterior pelvic tilt?",
    "options": ["Weak abdominal muscles", "Tight hamstrings", "Rounded shoulders", "Excessive back extension"],
    "correctAnswer": "Weak abdominal muscles",
    "difficulty": "medium"
  },
  {
    "question": "Which of the following is NOT a recommended way to improve posture?",
    "options": ["Regular stretching", "Maintaining a sedentary lifestyle", "Strengthening core muscles", "Using ergonomic furniture"],
    "correctAnswer": "Maintaining a sedentary lifestyle",
    "difficulty": "medium"
  },
  {
    "question": "Which of the following activities is most likely to contribute to rounded shoulders?",
    "options": ["Regular swimming", "Regular yoga practice", "Prolonged sitting at a desk", "Playing basketball"],
    "correctAnswer": "Prolonged sitting at a desk",
    "difficulty": "medium"
  },
  {
    "question": "How can the \"text neck\" posture issue be prevented?",
    "options": ["By holding the phone at eye level", "By using the phone with arms extended", "By looking down at the phone frequently", "By using the phone with one hand"],
    "correctAnswer": "By holding the phone at eye level",
    "difficulty": "medium"
  },
  {
    "question": "How does regular exercise contribute to better posture?",
    "options": ["By weakening core muscles", "By promoting muscle imbalances", "By strengthening muscles that support proper alignment", "By causing fatigue and slouching"],
    "correctAnswer": "By strengthening muscles that support proper alignment",
    "difficulty": "medium"
  },
  {
    "question": "Which of the following is NOT a benefit of good posture?",
    "options": ["Improved breathing", "Reduced risk of back pain", "Increased risk of injury", "Enhanced confidence"],
    "correctAnswer": "Increased risk of injury",
    "difficulty": "medium"
  },

  {
    "question": "Which muscle is commonly tight in people with poor posture?",
    "options": ["Quadriceps", "Hamstrings", "Pectoralis Major"],
    "correctAnswer": "Pectoralis Major",
    "difficulty": "hard"
  },
  {
    "question": "What is the most common cause of forward head posture?",
    "options": ["Excessive screen time", "Sleeping on a soft pillow", "Reading books", "Weightlifting"],
    "correctAnswer": "Excessive screen time",
    "difficulty": "hard"
  },

  {
    "question": "What is the name of the posture issue where hips tilt forward, causing an exaggerated lumbar curve?",
    "options": ["Swayback posture", "Kyphosis", "Lordosis", "Anterior pelvic tilt"],
    "correctAnswer": "Anterior pelvic tilt",
    "difficulty": "hard"
  },
  {
    "question": "Which of the following is a common consequence of poor posture?",
    "options": ["Improved balance", "Reduced risk of back pain", "Increased risk of injury", "Stronger core muscles"],
    "correctAnswer": "Increased risk of injury",
    "difficulty": "hard"
  },

  
  {
    "question": "Which of the following is NOT a common posture issue?",
    "options": ["Forward head posture", "Rounded shoulders", "Pronated feet", "Anterior pelvic tilt"],
    "correctAnswer": "Pronated feet",
    "difficulty": "hard"
  },

  
  {
    "question": "Which of the following is a common symptom of poor posture?",
    "options": ["Increased flexibility", "Improved circulation", "Neck pain", "Decreased risk of injury"],
    "correctAnswer": "Neck pain",
    "difficulty": "hard"
  },

 
  {
    "question": "Which posture issue is often associated with spending long hours sitting?",
    "options": ["Kyphosis", "Swayback posture", "Anterior pelvic tilt", "Forward head posture"],
    "correctAnswer": "Forward head posture",
    "difficulty": "hard"
  },
  {
    "question": "What is the primary role of the core muscles in maintaining posture?",
    "options": ["They support the arms and legs", "They keep the spine straight and stable", "They help in bending the spine forward", "They control breathing"],
    "correctAnswer": "They keep the spine straight and stable",
    "difficulty": "hard"
  },
  
  {
    "question": "Which of these exercises primarily targets the muscles responsible for keeping the spine straight and stable?",
    "options": ["Deadlifts", "Leg curls", "Bridge pose", "Side planks"],
    "correctAnswer": "Bridge pose",
    "difficulty": "hard"
  },
  {
    "question": "What is the term for the condition where the spine curves sideways, creating an \"S\" or \"C\" shape?",
    "options": ["Scoliosis", "Lordosis", "Kyphosis", "Spinal stenosis"],
    "correctAnswer": "Scoliosis",
    "difficulty": "hard"
  },
 
  {
    "question": "Which muscle group is primarily responsible for maintaining the natural curve of the spine?",
    "options": ["Abdominals", "Quadriceps", "Erector spinae", "Hamstrings"],
    "correctAnswer": "Erector spinae",
    "difficulty": "hard"
  },
  {
    "question": "What is the correct term for the condition where the upper back becomes excessively rounded?",
    "options": ["Kyphosis", "Lordosis", "Scoliosis", "Anterior pelvic tilt"],
    "correctAnswer": "Kyphosis",
    "difficulty": "hard"
  },
 
  {
    "question": "What is the primary function of the erector spinae muscles in relation to posture?",
    "options": ["To round the shoulders forward", "To extend and straighten the spine", "To flex the spine forward", "To bend the spine sideways"],
    "correctAnswer": "To extend and straighten the spine",
    "difficulty": "hard"
  },
  {
    "question": "Which posture issue is characterized by an exaggerated forward curvature of the upper back?",
    "options": ["Lordosis", "Scoliosis", "Kyphosis", "Anterior pelvic tilt"],
    "correctAnswer": "Kyphosis",
    "difficulty": "hard"
  },
  
  {
    "question": "What is the main purpose of performing hip flexor stretches in improving posture?",
    "options": ["To strengthen the lower back muscles", "To release tension in the hip flexors", "To increase flexibility in the hamstrings", "To improve balance and coordination"],
    "correctAnswer": "To release tension in the hip flexors",
    "difficulty": "hard"
  },
  {
    "question": "Which of the following is NOT a recommended corrective exercise for kyphosis?",
    "options": ["Chin tucks", "Wall angels", "Prone cobra", "Bench presses"],
    "correctAnswer": "Bench presses",
    "difficulty": "hard"
  },
  
  {
    "question": "What is the term for the condition where the pelvis rotates forward, causing an increased curvature of the lower back?",
    "options": ["Swayback posture", "Anterior pelvic tilt", "Lordosis", "Kyphosis"],
    "correctAnswer": "Anterior pelvic tilt",
    "difficulty": "hard"
  },
  
];


const Quiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [levelDifficultySelected, setLevelDifficultySelected] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [shuffledQuestions, setShuffledQuestions] = useState(questions); // No shuffling initially

  const handleStartQuiz = (maxQuestions) => {
    setQuizStarted(true);
    let filteredQuestions;
    switch (maxQuestions) {
      case 5:
        filteredQuestions = questions.filter(question => question.difficulty === 'easy');
        break;
      case 10:
        filteredQuestions = questions.filter(question => question.difficulty === 'medium');
        break;
      case 20:
        filteredQuestions = questions.filter(question => question.difficulty === 'hard');
        break;
      default:
        filteredQuestions = [];
        break;
    }
    
    // Shuffle the filtered questions
    const shuffled = shuffleArray(filteredQuestions);
    
    setShuffledQuestions(shuffled.slice(0, maxQuestions));
  };

  const handleStartLevelDifficultyScreen = () => {
    setLevelDifficultySelected(true);
  };

  const handleCompleteQuiz = (userScore, selectedOptions) => {
    setScore(userScore);
    setQuizCompleted(true);
    setSelectedOptions(selectedOptions);
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setLevelDifficultySelected(false);
    setQuizCompleted(false);
    setScore(0);
    setSelectedOptions([]);
  };

  return (
    <View style={{ flex: 1 }}>
      {!quizStarted && !levelDifficultySelected && !quizCompleted && (
        <StarterScreen onStartQuiz={handleStartLevelDifficultyScreen} />
      )}
      {levelDifficultySelected && !quizStarted && !quizCompleted && (
        <LevelDifficultyScreen onStartQuiz={handleStartQuiz} />
      )}
      {quizStarted && !quizCompleted && (
        <QuizScreen
          questions={shuffledQuestions}
          onCompleteQuiz={handleCompleteQuiz}
        />
      )}
      {quizCompleted && (
        <ResultScreen
          score={score}
          onRestartQuiz={handleRestartQuiz}
          selectedOptions={selectedOptions}
          questions={shuffledQuestions}
        />
      )}
    </View>
  );
};

export default Quiz;