import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import colors from '../components/colors';
import { Rating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { GlobalContext } from '../components/GlobalContext';
import VideoPlayer from '../components/Video'; // Assuming VideoPlayer is defined in './VideoPlayer'

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

const isVideoUrl = (url) => {
  const videoExtensions = ['.mp4', '.mov', '.wmv', '.flv', '.avi', '.mkv'];
  return videoExtensions.some((ext) => url.endsWith(ext));
};

const Results = () => {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('Awaiting feedback...');
  const [mediaUrl, setMediaUrl] = useState('https://res.cloudinary.com/dm1z4qabv/video/upload/v1716293567/p42nipajcx8wehjhj0na.mp4');
  const [userUID, setUserUID] = useState('');
  const [angles, setAngles] = useState({}); 
  const [pangles, setPangles] = useState({}); 
  const { globalVariable } = useContext(GlobalContext);
  const navigation = useNavigation();
  const route = useRoute();
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(true); // State to manage video playback

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
      setMediaUrl(imageUrl);
      setAngles(angles);
      setPangles(perfect);
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
          mediaUrl,
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
        <View style={styles.mediaContainer}>
          {isVideoUrl(mediaUrl) ? (
            <View style={styles.videoContainer}>
              <VideoPlayer videoUrl={mediaUrl} paused={paused} />
              
            </View>
          ) : (
            <Image source={{ uri: mediaUrl }} style={styles.image} />
          )}
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
      <Toast />
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
  mediaContainer: {
    width: '100%',
    height: 350,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Ensure button is positioned relative to the container
  },
  videoContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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
    textAlign: 'center',
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
    marginBottom: 1,
  },
});

export default Results;
