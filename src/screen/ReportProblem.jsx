import * as React from 'react';
import { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TextInput, DefaultTheme } from 'react-native-paper';
import colors from '../components/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReportAni from '../components/ReportAni';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {  useNavigation } from '@react-navigation/native';
import { GlobalContext } from '../components/GlobalContext';
const Report = () => {
  const [text, setText] = React.useState("");
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary, 
    },
  };

  const navigation = useNavigation();

  const feedback = () => {
    if (text.trim() === '') {
      
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a description.',
        position: 'top',
      });
    } else {
     
      Toast.show({
        type: 'success',
        text1: 'Thank You',
        text2: 'Your feedback is submitted.',
        position: 'top',
      });

      sendFeedbackToBackend(text);
    }
    // setTimeout(() => {
    //   navigation.navigate('Tabs', { screen: 'Home' })
    //   console.log('Delayed code execution after 1 second');
    // }, 500);
  };


  const sendFeedbackToBackend = async (feedbackText) => {
    try {
      const response = await fetch(`${globalVariable}/posease/reports`,{
     // const response = await fetch('https://api-v20-production.up.railway.app/posease/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: feedbackText })
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Feedback submitted successfully.',
        position: 'center',
        
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to submit feedback. Please try again later.',
        position: 'top',
      });
    }
  };


  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Report Problem</Text>
          <View style={styles.content}>
            <TextInput
              label="Describe the Problem"
              value={text}
              onChangeText={text => setText(text)}
              style={styles.input}
              multiline
              theme={theme}
            />
            <ReportAni />
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.continue} onPress={feedback}>
          <Text style={styles.buttontext}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    margin: 20,
    marginHorizontal: 30
  },
  input: {
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    color: colors.primary,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 10,
    borderColor: colors.primary,
    borderWidth: 0,
    marginHorizontal: 80,
    borderRadius: 20,
    borderStyle: 'dotted',
  },
  continue: {
    width: '90%',
    height: 60,
    marginVertical: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    fontWeight: '900'
  },
  buttontext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'sans-serif-condensed',
  }
});

export default Report;
