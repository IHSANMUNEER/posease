import React, { useState, useEffect,useContext } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import colors from '../components/colors';
import { Rating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { GlobalContext } from '../components/GlobalContext';

const Angles = ({ angles }) => {
  return (
    <View>
      {Object.entries(angles).map(([key, value], index) => (
        <View key={key}>
          <Text style={styles.angles}>
            {value}
          </Text>
          {index !== Object.keys(angles).length - 1 && <View style={styles.line} />}
        </View>
      ))}
    </View>
  );
};
const Body = ({ angles }) => {
  return (
    <View>
      {Object.entries(angles).map(([key, value], index) => (
        <View key={key}>
          <Text style={styles.angles}>
            {key}
          </Text>
          {index !== Object.keys(angles).length - 1 && <View style={styles.line} />}
        </View>
      ))}
    </View>
  );
};


const Results = () => {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('Awaiting feedback...');
  const [imageUrl, setImageUrl] = useState('https://res.cloudinary.com/dm1z4qabv/image/upload/v1702322279/ytuseh25gvjqkohyucal.jpg');
  const [userUID, setUserUID] = useState('6w7df76wd7wwdra');
  const [angles, setAngles] = useState({}); 
  const [pangles, setPangles] = useState({}); 
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    async function fetchUserUID() {
      try {
        const uid = await AsyncStorage.getItem('userUID');
        if (uid !== null) {
          setUserUID(uid);
        }
      } catch (error) {
        console.error('Error fetching user UID:', error);
      }
    }
    fetchUserUID();
  }, []);

  useEffect(() => {
    const { feedbackText, imageUrl, angles, perfect } = route.params || {};

    if (feedbackText && imageUrl && angles && perfect) {
      setFeedbackText(feedbackText);
      setImageUrl(imageUrl);
      setAngles(angles);
      setPangles(perfect)
    }
  }, [route.params]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSaveFeedback = async () => {
    try {
      
      const response = await fetch(`${globalVariable}/posease/addfeedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: userUID,
          feedbackText,
          imageUrl,
          rating,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to save feedback');
      }
      console.log('Feedback saved successfully');
      showToast('success', 'Success', 'Feedback saved successfully');
    } catch (error) {
      console.error('Error saving feedback:', error.message);
      showToast('error', 'Error', 'Failed to save feedback');
    }
  };

  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  };

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Text style={styles.title}>Feedback</Text>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
        <Text style={styles.feedback}>{feedbackText}</Text>

        <View style={styles.anglesContainer}>

          <View style={styles.anglesColumn}>
            <Text style={styles.columnTitle}>Body Part</Text>
            <Body angles={pangles} />
          </View>
          
          <View style={styles.anglesColumn}>
            <Text style={styles.columnTitle}>Angles</Text>
            <Angles angles={angles} />
          </View>
          <View style={styles.anglesColumn}>
            <Text style={styles.columnTitle}>Perfect</Text>
            <Angles angles={pangles} />
          </View>
        </View>

        <Rating
          style={{ marginVertical: 10 }}
          startingValue={rating}
          onFinishRating={handleRatingChange}
        />
        <TouchableOpacity style={styles.continue} onPress={handleSaveFeedback}>
          <Text style={styles.buttontext}>Save Feedback</Text>
        </TouchableOpacity>
      </View>
      <Toast/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: colors.secondary,
  },
  title: {
    color: colors.primary,
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 30,
    marginVertical: 10,
  },
  feedback: {
    color: colors.primary,
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 5,
  },
  anglesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  anglesColumn: {
    flex: 1,
  },
  columnTitle: {
    color: colors.primary,
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 10,
    // marginHorizontal: 20
  },
  angles: {
    color: 'black',
    fontWeight: '500',
    textAlign: 'left',
    fontSize: 13,
    marginVertical: 7,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign:'center'
  },
  imageContainer: {
    width: 380,
    height: 350,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  continue: {
    width: '90%',
    height: 60,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    fontWeight: '900',
  },
  buttontext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'sans-serif-condensed',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 1, // Adjust the margin bottom as needed
  },
});

export default Results;
