import React, {useState, useEffect} from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth, firestore} from '../firebase/firebase';
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
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from 'firebase/firestore';

import {useNavigation} from '@react-navigation/native';
import colours from '../components/colors';
import Loader from '../components/Loader';
import colors from '../components/colors';

function Login() {
  const navigation = useNavigation();
  const [waiting, setWaiting] = useState(false);
  ///////////////////////////Handle SignIn for Formate/////////////////

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

  ///////////////////////////Hooks/////////////////

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [eye, setEye] = useState(true);

  // ///////////////////////////Fetching user Data From firestore and saving in ASYNC Storage/////////////////

  const fetchData = async () => {
    const userDataCollection = collection(firestore, 'userdata');

    try {
      const querySnapshot = await getDocs(
        query(userDataCollection, where('id', '==', auth.currentUser.uid)),
      );

      const UserEmail = querySnapshot.docs.map(doc => doc.data().emailId);
      const Username = querySnapshot.docs.map(doc => doc.data().name);
      const Userpassword = querySnapshot.docs.map(doc => doc.data().passwordS);

      const existingUserEmail = await AsyncStorage.getItem(
        `userEmail_${auth.currentUser.uid}`,
      );
      const existingUserName = await AsyncStorage.getItem(
        `userName_${auth.currentUser.uid}`,
      );
      const existingUserPassword = await AsyncStorage.getItem(
        `userPassword_${auth.currentUser.uid}`,
      );

      if (existingUserEmail === null) {
        await AsyncStorage.setItem(
          `userEmail_${auth.currentUser.uid}`,
          JSON.stringify(UserEmail),
        );
        console.log('Setting userEmail:', UserEmail);
      }

      if (existingUserName === null) {
        await AsyncStorage.setItem(
          `userName_${auth.currentUser.uid}`,
          JSON.stringify(Username),
        );
        console.log('Setting userName:', Username);
      }

      if (existingUserPassword === null) {
        await AsyncStorage.setItem(
          `userPassword_${auth.currentUser.uid}`,
          JSON.stringify(Userpassword),
        );
        console.log('Setting userPassword:', Userpassword);
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
      Alert.alert('Invalid Email', 'Please enter a valid Email.');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Invalid Password', 'Please enter a valid Password.');
      return;
    }

    if (password) {
      console.log('in sign in');
      setWaiting(true); // Set waiting to true before the signInWithEmailAndPassword call
      try {
        await signInWithEmailAndPassword(auth, email, password)
          .then(userCredential => {
            const user = userCredential.user;
            fetchData();
            AsyncStorage.setItem('userToken', 'user_authenticated');
            setTimeout(async()=>{
              setWaiting(false)
              navigation.navigate('profileScreen');
            },4000)
            
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
              Alert.alert(
                'That email address is invalid!',
                'Please enter correct email and password',
              );
            }
            if (error.code === 'auth/too-many-requests') {
              Alert.alert('Too many requests', 'Try again later.');
            }
            if (error.code === 'auth/network-request-failed') {
              Alert.alert('No Internet Connection', 'connect to internet.');
            }

            console.error(error);
          });
      } catch (error) {
        console.error('Error signing in:', error);
        setWaiting(false); 
      }
    } else {
      Alert.alert(
        'Password Mismatch',
        'Password And Confirm Password Should be Same.',
      );
    }
  };

  ///////////////////////////UI/////////////////

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
                setWaiting(true);
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
