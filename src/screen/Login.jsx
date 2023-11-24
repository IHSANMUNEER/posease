import React, {useState, useEffect} from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase/firebase';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import profileScreen from './ProfileScreen';
import colours from '../components/colors';
import Loader from '../components/Loader';
import ChangePassword from './ChangePassword';

function Login() {
  const navigation = useNavigation();

  const handleAlert = (email, password) => {
    const isEmailValid = email.includes('@') && email.includes('.');
    const isPasswordValid = password.length >= 6;

    if (!isEmailValid) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.', [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
          style: 'default',
        },
      ]);
    } else if (!isPasswordValid) {
      Alert.alert(
        'Invalid Password',
        'Password must be at least 6 characters long.',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
            style: 'default',
          },
        ],
      );
    }
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [eye, setEye] = useState(true);

  const handleEye = () => {
    setEye(!eye);
  };
  const handleSignIn = async () => {
    if (!email.trim()) {
      Alert.alert('Invalid Email', 'Please enter a valid Email.');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Invalid Password', 'Please enter a valid Password.');
      return;
    }

    if (password) {
      await signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const user = userCredential.user;
          AsyncStorage.setItem('userToken', 'user_authenticated');
          navigation.navigate('profileScreen');
        })
        .catch(error => {
          if (error.code === 'auth/invalid-login-credentials') {
            Alert.alert(
              'Incorrect Credentials',
              'Please enter correct email and password',
            );
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert(
              'That email address is invalid!',
              'Please enter correct email and password',
            );
          }
          if (error.code === 'auth/too-many-requests') {
            Alert.alert('Too many requests', 'Try again later.');
          }

          console.error(error);
        });
    } else {
      Alert.alert(
        'Password Mismatch',
        'Password And Confirm Password Sholud be Same.',
      );
    }
  };

  return (
    <>
      {waiting && <Loader />}
      {!waiting && (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.screen}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <Text style={styles.title}>POSEASE</Text>
          </View>
          <View style={styles.form}>
            <TextInput
              value={email}
              placeholder="Email"
              placeholderTextColor="gray"
              style={styles.input}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <Icon
              name="envelope"
              size={20}
              color="black"
              style={styles.email}
            />
            <TextInput
              value={password}
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="gray"
              secureTextEntry={eye}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.eye2} onPress={handleEye}>
              <Icon name={eye ? 'eye' : 'eye-slash'} size={20} color="black" />
            </TouchableOpacity>
            <Text
              style={styles.forgotPassword}
              // onPress={navigation.navigate('ChangePassword')}
              >
              Forgot Your Password?
            </Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                handleAlert(email, password);
                handleSignIn();
              }}>
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>
            <Text style={styles.noAccount}>
              Don't Have an Account?{' '}
              <Text
                style={styles.signupLink}
                onPress={() => navigation.navigate('Signup')}>
                Sign Up
              </Text>
            </Text>
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    // marginBottom: 20,
    resizeMode: 'contain',
    marginTop: -90,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: colours.primary,
    marginBottom: 10,
    fontFamily: 'sans-serif-condensed',
  },
  form: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    marginVertical: 6,
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colours.primary,
    borderWidth: 1.5,
    fontFamily: 'sans-serif-condensed',
    backgroundColor: '#fff',
    color: 'black',
  },
  forgotPassword: {
    width: '100%',
    fontSize: 14,
    marginTop: 3,
    textAlign: 'right',
    color: colours.primary,
    fontFamily: 'sans-serif-condensed',
  },
  loginButton: {
    width: '100%',
    height: 50,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colours.primary,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'sans-serif-condensed',
  },
  noAccount: {
    fontSize: 16,
    fontFamily: 'sans-serif-condensed',
    color: colours.text,
  },
  signupLink: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colours.primary,
  },
  email: {
    position: 'absolute',
    right: 5,
    bottom: 190,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
  },
  eye2: {
    position: 'absolute',
    right: 10,
    bottom: 128,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
  },
});

export default Login;
