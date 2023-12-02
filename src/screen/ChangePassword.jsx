import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  alert,
  Alert,
} from 'react-native';

import Gif from 'react-native-gif';
import color from '../components/colors';
import Loader from '../components/Loader';
import {auth} from '../firebase/firebase';
import {getAuth, sendPasswordResetEmail} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import ForgotAni from '../components/ForgotAni';

const ChangePassword = () => {
 
  const navigation = useNavigation();


  const [email, setEmail] = useState('');
  const [waiting ,setWaiting] = useState(false)

  const changePasswordLink = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('success');
        setTimeout(()=>{
          navigation.navigate('profileScreen')
        },1000)
        setWaiting(true)
        
        Alert.alert('SUCCESS', 'Password Reset link has been sent');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
    {waiting && <Loader />}
      {!waiting && (
    <ScrollView style={styles.container}>
      <View>
       
         <ForgotAni/>
        
        <Text style={styles.mainHeading}>Mail Address Here</Text>
        <Text style={styles.secondHeading}>
          Enter the email address associated with your account
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          secureTextEntry={false}
          placeholderTextColor="gray"
          onChangeText={setEmail}
        />

        <TouchableOpacity
          style={styles.getCode}
          onPress={() => changePasswordLink()}>
          <Text style={styles.loginButtonText}>Recovery Link</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
      )}
    </>
  );
  
};

// Define the styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary,
  },
  mainHeading: {
    color: color.primary,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginHorizontal: 105,
    marginVertical: 50,
  },
  secondHeading: {
    marginHorizontal: 70,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: 'gray',
  },
  input: {
    width: '80%',
    height: 50,
    marginVertical: 15,
    marginHorizontal: 40,
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: color.primary,
    borderWidth: 1.5,
    fontFamily: 'sans-serif-condensed',
    backgroundColor: '#fff',
    color: 'black',
  },
  getCode: {
    width: '80%',
    height: 50,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primary,
    marginHorizontal: 40,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'sans-serif-condensed',
  },
});

export default ChangePassword;
