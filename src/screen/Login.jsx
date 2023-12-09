import React, {useState, useEffect} from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth, firestore} from '../firebase/firebase';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {collection, getDocs, query, where} from 'firebase/firestore';

import {useNavigation} from '@react-navigation/native';
import colours from '../components/colors';
import Loader from '../components/Loader';
import LoginAni from '../components/LoginAni';
import Toast from 'react-native-toast-message';

function Login() {
  const navigation = useNavigation();
  const [waiting, setWaiting] = useState(false);

  ///////////////////////////Handle SignIn for Formate/////////////////

  const handleAlert = (email, password) => {
    const isEmailValid = email.includes('@') && email.includes('.');
    const isPasswordValid = password.length >= 6;

    if (!isEmailValid) {
      showToast();
    } else if (!isPasswordValid) {
      showToast();
    }
  };

  ///////////////////////////Hooks/////////////////

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [eye, setEye] = useState(true);

  // ///////////////////////////Fetching user Data From firestore and saving in ASYNC Storage/////////////////

  const fetchData = async () => {
    const userDataCollection = collection(firestore, 'userdata');

    try {
      const querySnapshot = await getDocs(
        query(userDataCollection, where('emailId', '==', email)),
      );

      const UserEmail = querySnapshot.docs.map(doc => doc.data().emailId);
      const Username = querySnapshot.docs.map(doc => doc.data().name);
      const Userpassword = querySnapshot.docs.map(doc => doc.data().passwordS);
      const Profile = querySnapshot.docs.map(doc => doc.data().profileImage);
      const docId = querySnapshot.docs[0].id;

      const existingUserEmail = await AsyncStorage.getItem(
        `userEmail_${email}`,
      );
      const existingUserName = await AsyncStorage.getItem(`userName_${email}`);
      const existingUserImage = await AsyncStorage.getItem(
        `userProfile_${email}`,
      );
      const existingUserPassword = await AsyncStorage.getItem(
        `userPassword_${email}`,
      );
      const existingUserDocId = await AsyncStorage.getItem(`userDoc_${email}`);

      if (existingUserEmail === null) {
        await AsyncStorage.setItem(
          `userEmail_${email}`,
          JSON.stringify(UserEmail),
        );
        console.log('Setting userEmail:', UserEmail);
      }

      if (existingUserName === null) {
        await AsyncStorage.setItem(
          `userName_${email}`,
          JSON.stringify(Username),
        );
        console.log('Setting userName:', Username);
      }

      if (existingUserPassword === null) {
        await AsyncStorage.setItem(
          `userPassword_${email}`,
          JSON.stringify(Userpassword),
        );
        console.log('Setting userPassword:', Userpassword);
      }

      if (existingUserImage === null) {
        await AsyncStorage.setItem(
          `userProfile_${email}`,
          JSON.stringify(Profile),
        );
      }

      if (existingUserDocId === null) {
        await AsyncStorage.setItem(`userDoc_${email}`, JSON.stringify(docId));
      }
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  };

  // ///////////////////////////eye icon handle/////////////////

  const handleEye = () => {
    setEye(!eye);
  };

  ///////////////////////////Handle Login/////////////////

  const handleSignIn = async () => {
    if (!email.trim()) {
      showToast();
    }
    if (!password.trim()) {
      showToast();
    }

    if (password) {
      console.log('in sign in');
      setWaiting(true);
      try {
        await signInWithEmailAndPassword(auth, email, password)
          .then(userCredential => {
            const user = userCredential.user;
            //  if (user.emailVerified) {
            fetchData();
            AsyncStorage.setItem('userToken', 'user_authenticated');
            AsyncStorage.removeItem('emailS');
            AsyncStorage.setItem('emailS', email);
            setTimeout(async () => {
              setWaiting(false);
              navigation.navigate('Userdashboard');
            }, 1000);
            // } else {
            //   Alert.alert(
            //     'Email Not Verified',
            //     'Please verify your email to sign in.',
            //   );
            // }
          })
          .catch(error => {
            setWaiting(false);
            if (error.code === 'auth/invalid-login-credentials') {
              Alert.alert(
                'Incorrect Credentials',
                'Please enter correct email and password',
              );
            }

            if (error.code === 'auth/invalid-email') {
              InvalidMail();
            }
            if (error.code === 'auth/too-many-requests') {
              Tomanyrequest();
            }
            if (error.code === 'auth/network-request-failed') {
              Internet();
            }

            console.error(error);
          });
      } catch (error) {
        console.error('Error signing in:', error);
        setWaiting(false);
      }
    }
  };

  ///////////////////////////Toast/////////////////

  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Authentication Failed',
      text2:
        'Invalid Email or Password. Please enter a valid email address and password.',
    });
  };
  const InvalidMail = () => {
    Toast.show({
      type: 'error',
      text1: 'Authentication Failed',
      text2: 'Invalid Email. Please enter a valid email address.',
    });
  };
  const Tomanyrequest = () => {
    Toast.show({
      type: 'info',
      text1: 'To Many Requests',
      text2: 'Too many requests Try again later.',
    });
  };
  const Internet = () => {
    Toast.show({
      type: 'info',
      text1: 'No Internet Connection',
      text2: 'Connect to internet.',
    });
  };

  return (
    <>
      {waiting && <Loader />}
      {!waiting && (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.screen}>
            <LoginAni />
            <Text style={styles.title}>Guess who's back? You are!</Text>
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
              color={colours.primary}
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
              <Icon
                name={eye ? 'eye' : 'eye-slash'}
                size={20}
                color={colours.primary}
              />
            </TouchableOpacity>
            <Text
              style={styles.forgotPassword}
              onPress={() => {
                setWaiting(true);
                setTimeout(() => {
                  setWaiting(false);
                  navigation.navigate('ChangePassword');
                }, 1000);
              }}>
              Forgot Your Password?
            </Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={async () => {
                handleAlert(email, password);
                await handleSignIn();
                
              }}>
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>
            <Text style={styles.noAccount}>
              Don't Have an Account?{' '}
              <Text
                style={styles.signupLink}
                onPress={() => {
                  setWaiting(true);
                  setTimeout(() => {
                    navigation.navigate('Signup');
                  }, 30);
                }}>
                Sign Up
              </Text>
            </Text>
          </View>
        </ScrollView>
      )}
      <Toast />
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
  
  title: {
    fontSize: 25,
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
