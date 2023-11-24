import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {auth,app ,firestore} from '../firebase/firebase';
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

import colours from '../components/colors';
import Loader from '../components/Loader';

function Signup() {
  const navigation = useNavigation();

  const [eye, setEye] = useState(true);

  const handleEye = () => {
    setEye(!eye);
  };

  const onPressHandler = () => {
    navigation.navigate('profileScreen');
  };

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [waiting, setWaiting] = useState(false);

  const handleSignUp = async () => {
    if (!username.trim()) {
      Alert.alert('Invalid Username', 'Please enter a valid username.');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Invalid Email', 'Please enter a valid Email.');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Invalid Password', 'Please enter a valid Password.');
      return;
    }
    if (!confirmpassword.trim()) {
      Alert.alert('Invalid Password', 'Please enter a valid Password.');
      return;
    }
    if (password == confirmpassword) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const user = userCredential.user;
          Alert.alert('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
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

  const saveUserData = async () => {
    try {
     
      const userDataCollection = collection(firestore, 'userdata');
  
      await addDoc(userDataCollection, {
        name: username,
        emailId: email,
      });
  
      console.log('User data added to Firestore successfully!');
    } catch (error) {
      console.error('Error adding user data to Firestore: ', error);
    }
  };
  
  return (
    <>
      {waiting && <Loader />}
      {!waiting && (
        <ScrollView style={styles.container}>
          <View style={styles.screen}>
            <View style={styles.header}>
              <Image
                style={styles.logo}
                source={require('../assets/logo.png')}
              />
              <Text style={styles.title}>Create Account</Text>
            </View>
            <View style={styles.form}>
              <TextInput
                value={username}
                placeholder="Name"
                placeholderTextColor="gray"
                style={styles.input}
                onChangeText={setUsername}
              />
              <Icon name="user" size={20} color="black" style={styles.user} />
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
              <TouchableOpacity style={styles.lock} onPress={handleEye}>
                <Icon
                  name={eye ? 'eye' : 'eye-slash'}
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
              <TextInput
                value={confirmpassword}
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="gray"
                secureTextEntry={eye}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity style={styles.eye2} onPress={handleEye}>
                <Icon
                  name={eye ? 'eye' : 'eye-slash'}
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={async() => {
                  await handleSignUp();
                  saveUserData();
                }}>
                <Text style={styles.buttonText}>SIGN UP</Text>
              </TouchableOpacity>
              <Text style={styles.text}>
                Already have an account?{' '}
                <Text style={styles.textLink} onPress={onPressHandler}>
                  Login
                </Text>
              </Text>
            </View>
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
  },
  screen: {
    flex: 1,
    backgroundColor: colours.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 2,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginVertical: -40,
    marginBottom: 2,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: colours.primary,
    marginBottom: 10,
    fontFamily: 'sans-serif-condensed',
  },
  form: {
    flex: 4,
    width: '80%',
    marginBottom: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    padding: 15,
    marginVertical: 6,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colours.primary,
    borderWidth: 1.5,
    backgroundColor: '#fff',
    color: 'black',
  },
  button: {
    height: 50,
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colours.primary,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'sans-serif-condensed',
  },
  text: {
    fontSize: 16,
    fontFamily: 'sans-serif-condensed',
    color: colours.text,
  },
  textLink: {
    fontSize: 16,
    color: colours.primary,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-condensed',
  },
  user: {
    position: 'absolute',
    right: 5,
    bottom: 312,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
  },
  email: {
    position: 'absolute',
    right: 5,
    bottom: 248,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
  },
  lock: {
    position: 'absolute',
    right: 10,
    bottom: 189,
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

export default Signup;
